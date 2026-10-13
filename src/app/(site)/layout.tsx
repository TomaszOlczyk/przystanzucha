import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Motion from "@/components/Motion";
import AttributionCapture from "@/components/AttributionCapture";
import GoogleTagManager from "@/components/GoogleTagManager";
import ClickTracking from "@/components/ClickTracking";
import CookieConsent from "@/components/CookieConsent";
import { GTM_ID } from "@/lib/analytics";
import { getSiteSettings } from "@/sanity/fetchers";

export const revalidate = 60;

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const siteData = await getSiteSettings();

  return (
    <>
      <GoogleTagManager />
      <AttributionCapture />
      {GTM_ID && <ClickTracking />}
      <Motion />
      <Navbar siteData={siteData} />
      <main className="pt-16 md:pt-[4.5rem]">{children}</main>
      <Footer siteData={siteData} />
      <StickyCta phone={siteData.phone} />
      {GTM_ID && <CookieConsent />}
    </>
  );
}
