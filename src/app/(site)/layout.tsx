import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StickyCta from "@/components/StickyCta";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import AttributionCapture from "@/components/AttributionCapture";
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
      <AttributionCapture />
      <Analytics />
      <Navbar siteData={siteData} />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer siteData={siteData} />
      <StickyCta phone={siteData.phone} />
      <ConsentBanner />
    </>
  );
}
