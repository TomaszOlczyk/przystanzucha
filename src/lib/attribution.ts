/**
 * Atrybucja leadów: UTM, gclid, fbclid.
 * Zapamiętujemy "pierwszy kontakt" (first-touch) w sessionStorage, żeby parametry z adresu
 * wejściowego nie zginęły, gdy rodzic przejdzie na inną podstronę przed wysłaniem formularza.
 * sessionStorage może rzucić wyjątek (tryb prywatny, zablokowane dane) — wtedy działamy tylko na URL.
 */
export type Attribution = {
  utm?: { source?: string; medium?: string; campaign?: string };
  gclid?: string;
  fbclid?: string;
  /** Zgoda na cookies marketingowe w chwili zgłoszenia — warunek wysłania konwersji z CRM do Google Ads. */
  consentMarketing?: boolean;
};

import { parseConsent, readConsentRaw } from "./analytics";

const STORAGE_KEY = "pz_atrybucja";
const MAX_LEN = 200;

function clean(value: string | null): string | undefined {
  const v = value?.trim();
  return v ? v.slice(0, MAX_LEN) : undefined;
}

function fromUrl(): Attribution | null {
  if (typeof window === "undefined") return null;
  const p = new URLSearchParams(window.location.search);
  const utm = {
    source: clean(p.get("utm_source")),
    medium: clean(p.get("utm_medium")),
    campaign: clean(p.get("utm_campaign")),
  };
  const gclid = clean(p.get("gclid"));
  const fbclid = clean(p.get("fbclid"));
  const hasUtm = Boolean(utm.source || utm.medium || utm.campaign);
  if (!hasUtm && !gclid && !fbclid) return null;
  return { ...(hasUtm ? { utm } : {}), gclid, fbclid };
}

function readStored(): Attribution | null {
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Attribution) : null;
  } catch {
    return null;
  }
}

/** Zapisuje parametry z bieżącego URL, jeśli w sesji nie ma jeszcze pierwszego kontaktu. */
export function captureAttribution(): void {
  if (typeof window === "undefined") return;
  const current = fromUrl();
  if (!current || readStored()) return;
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(current));
  } catch {
    // brak dostępu do sessionStorage — trudno, zostaje odczyt z URL przy wysyłce
  }
}

/** Zwraca atrybucję do wysłania z formularzem: first-touch z sesji, w razie braku — bieżący URL. */
export function getAttribution(): Attribution {
  if (typeof window === "undefined") return {};
  captureAttribution();
  const consentMarketing = parseConsent(readConsentRaw())?.marketing === true;
  return { ...(readStored() ?? fromUrl() ?? {}), consentMarketing };
}
