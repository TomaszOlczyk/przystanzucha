import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import siteData from "@/content/site.json";

const nunito = Nunito({
  variable: "--font-geist-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl">
      <body className={`${nunito.variable} antialiased`}>
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
