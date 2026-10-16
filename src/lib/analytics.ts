/**
 * Analityka: dataLayer (GTM) + Consent Mode v2.
 *
 * Kontrakt zdarzeń (konfiguracja tagów w GTM opiera się na tych nazwach i parametrach — opis w README):
 *   generate_lead   { form_type: 'rekrutacja' | 'konsultacja', lead_source: 'www', child_age? }
 *   form_start      { form_type }
 *   click_to_call   { link_location }  (data-loc z linku, np. hero / pasek_mobile / naglowek, inaczej menu|stopka|formularz|tresc)
 *   click_email     { link_location }
 *   click_social    { social_network: 'facebook' | 'instagram', link_location }
 *   cta_click       { cta: 'umow_wizyte' | 'grupa_2', link_location }  (przyciski z atrybutem data-cta)
 *   consent_update  { consent_analytics, consent_marketing }
 *
 * Zasada: do dataLayer NIE trafiają dane osobowe (imię, e-mail, telefon, treść wiadomości).
 * Wszystkie funkcje są bezpieczne przy SSR (bez `window` nic nie robią).
 */

/** ID kontenera GTM — gdy brak lub ma zły format, nic się nie ładuje. */
export const GTM_ID = (() => {
  const id = process.env.NEXT_PUBLIC_GTM_ID?.trim() ?? "";
  return /^GTM-[A-Z0-9]+$/.test(id) ? id : "";
})();

export const CONSENT_STORAGE_KEY = "pz_zgody_cookies";
/** Podbicie wersji wymusza ponowne pytanie o zgody (np. po zmianie listy narzędzi). */
export const CONSENT_VERSION = 1;
/** Po roku pytamy o zgodę ponownie. */
export const CONSENT_MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000;
/** Zdarzenie okna otwierające baner (link „Ustawienia cookies” w stopce). */
export const OPEN_CONSENT_EVENT = "pz:ustawienia-cookies";

export type ConsentChoice = { analytics: boolean; marketing: boolean };
type StoredConsent = ConsentChoice & { v: number; ts: number };

export type FormType = "rekrutacja" | "konsultacja";
type EventParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

function getGtag(): ((...args: unknown[]) => void) | null {
  if (typeof window === "undefined") return null;
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    // Consent Mode wymaga wpisu w postaci obiektu `arguments` (tak jak oficjalny snippet gtag).
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer!.push(arguments);
    };
  }
  return window.gtag;
}

/** Wrzuca zdarzenie do dataLayer. Pomija parametry `undefined`. */
export function pushEvent(event: string, params: EventParams = {}): void {
  if (typeof window === "undefined") return;
  const clean: Record<string, string | number | boolean> = {};
  for (const [k, v] of Object.entries(params)) if (v !== undefined && v !== "") clean[k] = v;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...clean });
}

export function trackLead(formType: FormType, extra: { child_age?: string; start_when?: string } = {}): void {
  pushEvent("generate_lead", { form_type: formType, lead_source: "www", child_age: extra.child_age, start_when: extra.start_when });
}

export function trackFormStart(formType: FormType): void {
  pushEvent("form_start", { form_type: formType });
}

/** Mapowanie wyboru na sygnały Consent Mode v2. */
export function consentSignals(c: ConsentChoice) {
  const ads = c.marketing ? "granted" : "denied";
  return {
    ad_storage: ads,
    ad_user_data: ads,
    ad_personalization: ads,
    analytics_storage: c.analytics ? "granted" : "denied",
  } as const;
}

// Pamięć zapasowa, gdy localStorage jest niedostępny (tryb prywatny, blokada danych).
let memoryConsent: string | null = null;

/** Surowy zapis zgody (string) — stabilny snapshot dla useSyncExternalStore. */
export function readConsentRaw(): string | null {
  if (typeof window === "undefined") return null;
  try {
    return window.localStorage.getItem(CONSENT_STORAGE_KEY) ?? memoryConsent;
  } catch {
    return memoryConsent;
  }
}

/** Zwraca zapisany wybór lub null (brak wyboru / stara wersja / wygasł) — wtedy obowiązuje denied. */
export function parseConsent(raw: string | null): ConsentChoice | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Partial<StoredConsent>;
    if (c.v !== CONSENT_VERSION || typeof c.ts !== "number") return null;
    if (Date.now() - c.ts > CONSENT_MAX_AGE_MS) return null;
    return { analytics: Boolean(c.analytics), marketing: Boolean(c.marketing) };
  } catch {
    return null;
  }
}

const CONSENT_CHANGE_EVENT = "pz:zgody-zmienione";

/** Zapisuje wybór, aktualizuje Consent Mode i wysyła `consent_update` do dataLayer. */
export function saveConsent(choice: ConsentChoice): void {
  if (typeof window === "undefined") return;
  const raw = JSON.stringify({ v: CONSENT_VERSION, ts: Date.now(), ...choice } satisfies StoredConsent);
  memoryConsent = raw;
  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, raw);
  } catch {
    // brak localStorage — wybór obowiązuje do przeładowania strony
  }
  getGtag()?.("consent", "update", consentSignals(choice));
  pushEvent("consent_update", {
    consent_analytics: choice.analytics ? "granted" : "denied",
    consent_marketing: choice.marketing ? "granted" : "denied",
  });
  window.dispatchEvent(new Event(CONSENT_CHANGE_EVENT));
}

/** Subskrypcja zmian zgody (ta karta + inne karty przez `storage`). */
export function subscribeConsent(cb: () => void): () => void {
  window.addEventListener(CONSENT_CHANGE_EVENT, cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener(CONSENT_CHANGE_EVENT, cb);
    window.removeEventListener("storage", cb);
  };
}

/**
 * Skrypt inline: Consent Mode default (denied) → przywrócenie zapisanego wyboru → gtm.js.
 * Jeden skrypt gwarantuje kolejność: consent default trafia do dataLayer PRZED zdarzeniem gtm.js.
 */
export function gtmInitScript(gtmId: string): string {
  return `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
window.gtag=window.gtag||gtag;
gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});
try{var c=JSON.parse(localStorage.getItem(${JSON.stringify(CONSENT_STORAGE_KEY)})||'null');
if(c&&c.v===${CONSENT_VERSION}&&typeof c.ts==='number'&&Date.now()-c.ts<=${CONSENT_MAX_AGE_MS}){var a=c.marketing?'granted':'denied';
gtag('consent','update',{ad_storage:a,ad_user_data:a,ad_personalization:a,analytics_storage:c.analytics?'granted':'denied'});}}catch(e){}
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer',${JSON.stringify(gtmId)});
`.trim();
}
