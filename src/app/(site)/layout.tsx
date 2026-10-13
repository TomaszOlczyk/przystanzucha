import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingToys from "@/components/FloatingToys";
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
      <FloatingToys />
      <Navbar siteData={siteData} />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer siteData={siteData} />
      {GTM_ID && <CookieConsent />}
    </>
  );
}
