/**
 * Pomiar zdarzeń: GA4 / Google Ads (gtag) i piksel Meta (fbq).
 * Wywołania są bezpieczne, gdy tagi nie są załadowane (brak ID lub brak zgody) — wtedy nic się nie dzieje.
 */
type Params = Record<string, string | number | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const ADS_LEAD_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
const ADS_CALL_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CALL_LABEL;

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}

/** Wysłany formularz = konwersja główna (GA4 generate_lead, Ads, Meta Lead). */
export function trackLead(form: "rekrutacja" | "konsultacja", params: Params = {}) {
  track("generate_lead", { form, ...params });
  if (ADS_ID && ADS_LEAD_LABEL) window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_LEAD_LABEL}` });
  window.fbq?.("track", "Lead", { content_name: form });
}

/** Klik w telefon = konwersja pomocnicza. */
export function trackCall(location: string) {
  track("click_tel", { location });
  if (ADS_ID && ADS_CALL_LABEL) window.gtag?.("event", "conversion", { send_to: `${ADS_ID}/${ADS_CALL_LABEL}` });
  window.fbq?.("track", "Contact", { content_name: "telefon" });
}
