import { draftMode } from "next/headers";
import { VisualEditing } from "next-sanity/visual-editing";
import { stegaClean } from "next-sanity";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Motion from "@/components/Motion";
import AttributionCapture from "@/components/AttributionCapture";
import GoogleTagManager from "@/components/GoogleTagManager";
import ClickTracking from "@/components/ClickTracking";
import CookieConsent from "@/components/CookieConsent";
import WylaczPodglad from "@/components/WylaczPodglad";
import { GTM_ID } from "@/lib/analytics";
import { getSiteSettings } from "@/sanity/fetchers";
import { SanityLive } from "@/sanity/live";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [siteData, { isEnabled: podglad }] = await Promise.all([getSiteSettings(), draftMode()]);

  return (
    <>
      <GoogleTagManager />
      <AttributionCapture />
      {GTM_ID && <ClickTracking />}
      <Motion podglad={podglad} />
      <Navbar siteData={siteData} />
      <main className="pt-16 md:pt-[4.5rem]">{children}</main>
      <Footer siteData={siteData} />
      <StickyCta phone={stegaClean(siteData.phone)} callText={siteData.mobileBar.callText} ctaText={siteData.mobileBar.ctaText} />
      {GTM_ID && <CookieConsent />}
      {/* Odświeżanie treści po publikacji w Studio (bez czekania na cache) + podgląd na żywo w Studio. */}
      <SanityLive />
      {podglad && (
        <>
          <VisualEditing />
          <WylaczPodglad />
        </>
      )}
    </>
  );
}
