import { NextResponse } from "next/server";
import { randomUUID } from "crypto";
import { getWriteClient } from "@/sanity/client";
import { notifySubmission } from "@/lib/notify";

// ID z kropką = "ścieżka" w Sanity: dokument niewidoczny dla publicznego API
// (dataset jest publiczny, a zgłoszenia zawierają dane osobowe).
const privateId = () => `submission.${randomUUID()}`;

const MAX_LEN = 200;
const LANGUAGES = ["pl", "en", "uk", "inny"];

/** Przycięty string albo undefined (nie ufamy danym z przeglądarki). */
function str(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const v = value.trim();
  return v ? v.slice(0, MAX_LEN) : undefined;
}

/** Pola CRM wspólne dla obu formularzy: język i atrybucja (UTM, gclid, fbclid). */
function crmFields(body: Record<string, unknown>) {
  const rawUtm = (body.utm && typeof body.utm === "object" ? body.utm : {}) as Record<string, unknown>;
  const utm = {
    source: str(rawUtm.source),
    medium: str(rawUtm.medium),
    campaign: str(rawUtm.campaign),
  };
  const language = str(body.language);
  return {
    language: language && LANGUAGES.includes(language) ? language : "pl",
    ...(utm.source || utm.medium || utm.campaign ? { utm } : {}),
    ...(str(body.gclid) ? { gclid: str(body.gclid) } : {}),
    ...(str(body.fbclid) ? { fbclid: str(body.fbclid) } : {}),
  };
}

const GROUPS: Record<string, string> = { grupa_1: "Grupa 1", grupa_2: "Grupa 2 (więcej uwagi)" };

/** „2 lata”, „5 lat” — poprawna odmiana wieku dziecka. */
function ageLabel(age: string): string {
  const n = Number.parseInt(age, 10);
  if (Number.isNaN(n)) return age.slice(0, 20);
  return `${n} ${n >= 2 && n <= 4 ? "lata" : n === 1 ? "rok" : "lat"}`;
}

export async function POST(request: Request) {
  try {
    if (!process.env.SANITY_WRITE_TOKEN) {
      return NextResponse.json(
        { error: "Brak konfiguracji zapisu" },
        { status: 500 }
      );
    }

    const body = await request.json();
    const writeClient = getWriteClient();

    if (body.type === "consultation") {
      const { name, email, phone, preferredTime, message } = body;

      if (!str(name) || (!str(phone) && !str(email))) {
        return NextResponse.json(
          { error: "Brakuje wymaganych pól" },
          { status: 400 }
        );
      }

      const doc = {
        _id: privateId(),
        _type: "submission",
        type: "consultation",
        source: "www_konsultacja",
        parentName: name,
        email: email || "",
        phone: phone || "",
        preferredTime: preferredTime || "",
        message: message || "",
        status: "nowy",
        submittedAt: new Date().toISOString(),
      };
      await writeClient.create({ ...doc, ...crmFields(body) });
      await notifySubmission("consultation", doc);
    } else {
      const { parentName, childName, childAge, email, phone, recruitmentYear } = body;
      const group = GROUPS[str(body.group) ?? ""] ?? "grupa do doradzenia";

      // Telefon jest głównym kanałem kontaktu; e-mail i imię dziecka są opcjonalne (mniej tarcia w formularzu).
      if (!str(parentName) || !str(phone) || !str(childAge)) {
        return NextResponse.json(
          { error: "Brakuje wymaganych pól" },
          { status: 400 }
        );
      }

      const doc = {
        _id: privateId(),
        _type: "submission",
        type: "recruitment",
        source: "www_rekrutacja",
        parentName,
        childName: childName || "",
        childAge: ageLabel(String(childAge)),
        email: email || "",
        phone,
        message: `Rekrutacja ${recruitmentYear} · ${group}`,
        status: "nowy",
        submittedAt: new Date().toISOString(),
      };
      await writeClient.create({ ...doc, ...crmFields(body) });
      await notifySubmission("recruitment", doc);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { error: `Nie udało się zapisać zgłoszenia: ${message}` },
      { status: 500 }
    );
  }
}
