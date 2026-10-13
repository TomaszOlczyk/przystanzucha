import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";
import "./globals.css";
import { SITE_URL } from "@/content/home";

const nunito = Nunito({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-display-face",
  subsets: ["latin", "latin-ext"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

export const revalidate = 60;

const OG_IMAGE =
  "https://cdn.sanity.io/images/hzxqcvp2/production/9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072.jpg?w=1200&h=630&fit=crop&auto=format";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Przystań Zucha — kameralne przedszkole Montessori w Łodzi (Retkinia)",
    template: "%s | Przystań Zucha",
  },
  description:
    "Kameralne przedszkole z elementami Montessori na Retkini w Łodzi. Dwie małe grupy, adaptacja z rodzicem, 10 zajęć w czesnym.",
  openGraph: {
    siteName: "Przystań Zucha",
    locale: "pl_PL",
    type: "website",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Sala przedszkola Przystań Zucha w morskim klimacie" }],
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#fbf6ee",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pl" className={`${nunito.variable} ${fraunces.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
