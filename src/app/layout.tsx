import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { getSiteSettings } from "@/sanity/fetchers";

const nunito = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export async function generateMetadata(): Promise<Metadata> {
  const siteData = await getSiteSettings();
  return {
    title: `${siteData.name} — ${siteData.tagline}`,
    description: siteData.description,
    keywords: "przedszkole, Łódź, przedszkole prywatne, rekrutacja, dzieci, edukacja",
    openGraph: {
      title: `${siteData.name} — ${siteData.tagline}`,
      description: siteData.description,
      url: `https://${siteData.domain}`,
      siteName: siteData.name,
      locale: "pl_PL",
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${nunito.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
