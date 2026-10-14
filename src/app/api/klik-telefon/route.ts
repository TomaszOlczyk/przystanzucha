import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getWriteClient } from "@/sanity/client";
import { INITIAL_STATUS } from "@/sanity/crm";

/**
 * Kliknięcie numeru telefonu na stronie → zgłoszenie „do weryfikacji” w CRM (Sanity → lead-hub → dashboard).
 * Bez danych osobowych i bez cookies: zapisujemy tylko miejsce kliknięcia, podstronę i atrybucję z adresu
 * (UTM / gclid / fbclid). Dzięki temu telefon z reklamy jest widoczny w CRM niezależnie od zgody na cookies.
 * W Studio: jeśli rodzic faktycznie zadzwonił → „To lead” i uzupełnić dane; jeśli nie → „To spam”.
 */

const MAX_LEN = 200;
const ALLOWED_HOSTS = ["przystanzucha.pl", "www.przystanzucha.pl", "localhost"];
// Proste ograniczenie nadużyć w obrębie instancji: 1 zapis na IP na minutę.
const THROTTLE_MS = 60_000;
const lastByIp = new Map<string, number>();

function str(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  return v ? v.slice(0, MAX_LEN) : undefined;
}

function allowedOrigin(request: Request): boolean {
  const origin = request.headers.get("origin") ?? request.headers.get("referer");
  if (!origin) return false;
  try {
    const host = new URL(origin).hostname;
    return ALLOWED_HOSTS.includes(host) || host.endsWith(".vercel.app");
  } catch {
    return false;
  }
}

export async function POST(request: Request) {
  if (!process.env.SANITY_WRITE_TOKEN) return NextResponse.json({ error: "Brak konfiguracji zapisu" }, { status: 500 });
  if (!allowedOrigin(request)) return NextResponse.json({ error: "Niedozwolone źródło" }, { status: 403 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "?";
  const now = Date.now();
  if (now - (lastByIp.get(ip) ?? 0) < THROTTLE_MS) return NextResponse.json({ success: true, throttled: true });
  lastByIp.set(ip, now);
  if (lastByIp.size > 5000) lastByIp.clear();

  let body: Record<string, unknown> = {};
  try {
    body = JSON.parse((await request.text()).slice(0, 4000));
  } catch {
    // pusty / niepoprawny JSON — zapisujemy samo kliknięcie
  }
  const rawUtm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const utm = { source: str(rawUtm.source), medium: str(rawUtm.medium), campaign: str(rawUtm.campaign) };
  const gclid = str(body.gclid);
  const fbclid = str(body.fbclid);
  const where = str(body.link_location) ?? "nieznane";
  const page = str(body.path) ?? "/";
  const fromAd = gclid ? "reklama Google" : fbclid ? "reklama Meta" : utm.source ? `${utm.source}/${utm.medium ?? ""}` : "bez kampanii";

  try {
    await getWriteClient().create({
      _id: `submission.${randomUUID()}`,
      _type: "submission",
      type: "phone_click",
      source: "telefon",
      parentName: "Kliknięcie „Zadzwoń” na stronie",
      phone: "",
      email: "",
      message:
        `Ktoś kliknął numer telefonu na stronie (${where}, ${page}; ${fromAd}). ` +
        "Sprawdź historię połączeń z tej godziny: był telefon → „To lead” i uzupełnij dane, nie było → „To spam”.",
      status: INITIAL_STATUS,
      submittedAt: new Date().toISOString(),
      language: "pl",
      ...(utm.source || utm.medium || utm.campaign ? { utm } : {}),
      ...(gclid ? { gclid } : {}),
      ...(fbclid ? { fbclid } : {}),
      adConsent: body.consentMarketing === true ? "granted" : "denied",
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("klik-telefon:", error);
    return NextResponse.json({ error: "Nie udało się zapisać" }, { status: 500 });
  }
}
