import type { Metadata } from "next";
import type { Seo } from "@/sanity/types";

/**
 * Metadane podstrony z pola SEO w Sanity (pobranego z `stega: false`).
 * Na podstronach Next dopisuje „| Przystań Zucha” (szablon z layoutu), strona główna ma pełny tytuł.
 */
export function metadaneStrony(seo: Seo, sciezka: string, { tytulPelny = false } = {}): Metadata {
  return {
    ...(seo.title ? { title: tytulPelny ? { absolute: seo.title } : seo.title } : {}),
    ...(seo.description ? { description: seo.description } : {}),
    alternates: { canonical: sciezka },
  };
}
