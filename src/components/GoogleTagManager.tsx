import Script from "next/script";
import { GTM_ID, gtmInitScript } from "@/lib/analytics";

/**
 * Google Tag Manager z Consent Mode v2 — tylko część publiczna (layout `(site)`), nie /studio.
 * Bez poprawnego NEXT_PUBLIC_GTM_ID nic nie jest renderowane ani ładowane.
 */
export default function GoogleTagManager() {
  if (!GTM_ID) return null;
  return (
    <>
      <Script id="gtm-init" strategy="afterInteractive">
        {gtmInitScript(GTM_ID)}
      </Script>
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
          title="Google Tag Manager"
        />
      </noscript>
    </>
  );
}
