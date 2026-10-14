import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
  useCdn: true,
  // Stega (niewidoczne znaczniki w tekstach) włączamy tylko w trybie podglądu — patrz `live.ts`.
  // Dzięki nim klik w tekst na podglądzie w Studio otwiera właściwe pole.
  stega: { studioUrl: "/studio" },
});

/** Write client — only use server-side (API routes) */
export function getWriteClient() {
  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION!,
    useCdn: false,
    token: process.env.SANITY_WRITE_TOKEN!,
  });
}

/**
 * Token do czytania wersji roboczych (podgląd w Studio). Tylko po stronie serwera — nigdy nie trafia do przeglądarki.
 * Docelowo osobny token „Viewer” w `SANITY_API_READ_TOKEN`; do czasu jego dodania w Vercel używamy
 * istniejącego `SANITY_WRITE_TOKEN` (też tylko serwer: draft mode i podgląd).
 */
export const previewToken = process.env.SANITY_API_READ_TOKEN || process.env.SANITY_WRITE_TOKEN || "";
