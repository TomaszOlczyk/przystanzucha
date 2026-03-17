import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingToys from "@/components/FloatingToys";
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
      <FloatingToys />
      <Navbar siteData={siteData} />
      <main className="pt-16 md:pt-20">{children}</main>
      <Footer siteData={siteData} />
    </>
  );
}
