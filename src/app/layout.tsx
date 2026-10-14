import type { Metadata, Viewport } from "next";
import { Figtree, Fraunces } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/lib/site";
import { getSiteSettings } from "@/sanity/fetchers";
import { maZdjecie, urlFor } from "@/sanity/image";

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext"],
  axes: ["SOFT", "opsz"],
  style: ["normal", "italic"],
  display: "swap",
});

// Klasa .m przed pierwszym malowaniem: elementy hero startują ukryte i odsłania je anime.js (Motion.tsx).
const MOTION_FLAG = `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('m')`;

export const revalidate = 60;

/** Obrazek do udostępniania, gdy w Ustawieniach strony nie ma og:image (zdjęcie Sali Morskiej). */
const OG_IMAGE =
  "https://cdn.sanity.io/images/hzxqcvp2/production/9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072.jpg?w=1200&h=630&fit=crop&auto=format";

/** Domyślne metadane z Sanity (Ustawienia strony → SEO domyślne). */
export async function generateMetadata(): Promise<Metadata> {
  const { name, seo } = await getSiteSettings({ stega: false });
  const og = maZdjecie(seo.ogImage) ? urlFor(seo.ogImage).width(1200).height(630).fit("crop").auto("format").url() : OG_IMAGE;
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: seo.title ?? name,
      template: `%s | ${name}`,
    },
    description: seo.description,
    openGraph: {
      siteName: name,
      locale: "pl_PL",
      type: "website",
      images: [{ url: og, width: 1200, height: 630, alt: seo.ogImage?.alt || "Sala przedszkola Przystań Zucha w morskim klimacie" }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#f6f0e6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${figtree.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: MOTION_FLAG }} />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
