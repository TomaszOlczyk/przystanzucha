"use client";

import { useEffect } from "react";
import { pushEvent } from "@/lib/analytics";
import { getAttribution } from "@/lib/attribution";

// Kliknięcie telefonu → zgłoszenie „do weryfikacji” w CRM (bez danych osobowych, bez cookies).
// Jedno zgłoszenie na 15 s, żeby podwójne kliknięcie nie tworzyło duplikatów.
let lastPhoneReport = 0;
function reportPhoneClick(link_location: string) {
  const now = Date.now();
  if (now - lastPhoneReport < 15_000) return;
  lastPhoneReport = now;
  const body = JSON.stringify({ link_location, path: window.location.pathname, ...getAttribution() });
  try {
    // sendBeacon przeżyje przejście do aplikacji telefonu; fetch keepalive jako zapas.
    if (navigator.sendBeacon?.("/api/klik-telefon/", new Blob([body], { type: "application/json" }))) return;
    void fetch("/api/klik-telefon/", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
  } catch {
    // brak raportu nie może blokować połączenia
  }
}

/** Gdzie na stronie kliknięto — bez danych osobowych (sam numer/adres nie trafia do dataLayer). */
function linkLocation(el: Element): string {
  if (el.closest("nav, header")) return "menu";
  if (el.closest("footer")) return "stopka";
  if (el.closest("form")) return "formularz";
  return "tresc";
}

function socialNetwork(href: string): "facebook" | "instagram" | null {
  try {
    const host = new URL(href, window.location.href).hostname.replace(/^www\./, "");
    if (host === "facebook.com" || host.endsWith(".facebook.com") || host === "fb.com" || host === "fb.me") return "facebook";
    if (host === "instagram.com" || host.endsWith(".instagram.com")) return "instagram";
  } catch {
    // niepoprawny URL — ignorujemy
  }
  return null;
}

/** Jeden globalny listener: click_to_call (tel:) + zgłoszenie do CRM, click_email (mailto:), click_social (FB/IG), cta_click (data-cta). */
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target;
      if (!(target instanceof Element)) return;
      const link = target.closest("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      // data-loc (np. hero, pasek_mobile) jest dokładniejsze niż położenie wyliczone z DOM.
      const link_location = link.getAttribute("data-loc") ?? linkLocation(link);
      const cta = link.getAttribute("data-cta");
      if (cta) pushEvent("cta_click", { cta, link_location });
      if (/^tel:/i.test(href)) {
        reportPhoneClick(link_location);
        return pushEvent("click_to_call", { link_location });
      }
      if (/^mailto:/i.test(href)) return pushEvent("click_email", { link_location });
      const network = socialNetwork(href);
      if (network) pushEvent("click_social", { social_network: network, link_location });
    };
    // capture: zdarzenie zostanie zapisane nawet gdy inny handler zatrzyma propagację
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
