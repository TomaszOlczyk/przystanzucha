/**
 * Pobieranie treści z Sanity z odświeżaniem na żywo (next-sanity `defineLive`):
 * - zwykły odwiedzający: opublikowane treści z CDN, cache Next.js odświeżany tagami (SanityLive) + co 60 s,
 * - podgląd w Studio (draft mode): wersje robocze + stega (klik w tekst → pole w Studio).
 */
import { defineLive } from "next-sanity/live";
import { client, previewToken } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: previewToken || false,
  // Bez tokena w przeglądarce: podgląd wersji roboczych działa w Presentation tool (Studio podaje dostęp sam).
  browserToken: false,
  fetchOptions: { revalidate: 60 },
});
