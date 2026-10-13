"use client";

import Script from "next/script";
import { useEffect } from "react";
import { track, trackCall } from "@/lib/track";

/**
 * Tagi Google (GA4 + Ads) z Consent Mode v2 i piksel Meta ładowany dopiero po zgodzie marketingowej.
 * ID w zmiennych środowiskowych (patrz .env.example) — bez ID dany tag się nie ładuje.
 * Zgody zapisuje ConsentBanner w localStorage pod kluczem CONSENT_KEY.
 */
export const CONSENT_KEY = "pz_zgody";
export type Consent = { analytics: boolean; marketing: boolean };

const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID;
const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID;
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const GTAG_ID = GA4_ID || ADS_ID;

export function readConsent(): Consent | null {
  try {
    const raw = window.localStorage.getItem(CONSENT_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function consentState(c: Consent) {
  const ad = c.marketing ? "granted" : "denied";
  return {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: ad,
    ad_user_data: ad,
    ad_personalization: ad,
  };
}

let pixelLoaded = false;
function loadMetaPixel() {
  if (!META_PIXEL_ID || pixelLoaded || typeof window === "undefined") return;
  pixelLoaded = true;
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function () {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    b.head.appendChild(t);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */
  window.fbq?.("init", META_PIXEL_ID);
  window.fbq?.("track", "PageView");
}

/** Wywoływane przez baner po decyzji użytkownika. */
export function applyConsent(c: Consent) {
  try {
    window.localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
  } catch {
    // brak localStorage — zgoda obowiązuje tylko w tej sesji
  }
  window.gtag?.("consent", "update", consentState(c));
  if (c.marketing) loadMetaPixel();
}

export default function Analytics() {
  useEffect(() => {
    const stored = readConsent();
    if (stored?.marketing) loadMetaPixel();

    // Delegowany pomiar kliknięć: telefon, e-mail, przyciski CTA, dokumenty.
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      const href = a.getAttribute("href") ?? "";
      const location = a.dataset.loc ?? "inne";
      if (href.startsWith("tel:")) trackCall(location);
      else if (href.startsWith("mailto:")) track("click_email", { location });
      else if (href.includes("cdn.sanity.io/files")) track("file_download", { file_name: a.textContent?.trim() });
      if (a.dataset.cta) track("cta_click", { cta: a.dataset.cta, location });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (!GTAG_ID) return null;

  const configs = [GA4_ID, ADS_ID].filter(Boolean).map((id) => `gtag('config','${id}');`).join("");

  return (
    <>
      <Script id="gtag-consent" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;
var c=null;try{c=JSON.parse(localStorage.getItem('${CONSENT_KEY}'));}catch(e){}
var ad=c&&c.marketing?'granted':'denied';
gtag('consent','default',{analytics_storage:c&&c.analytics?'granted':'denied',ad_storage:ad,ad_user_data:ad,ad_personalization:ad,wait_for_update:500});
gtag('set','url_passthrough',true);gtag('set','ads_data_redaction',ad==='denied');
gtag('js',new Date());${configs}`}
      </Script>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GTAG_ID}`} strategy="afterInteractive" />
    </>
  );
}
