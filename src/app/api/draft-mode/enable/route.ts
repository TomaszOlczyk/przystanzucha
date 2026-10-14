import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { client, previewToken } from "@/sanity/client";

/**
 * Włączenie podglądu wersji roboczych z Presentation tool w Studio. Studio podaje jednorazowy sekret,
 * a ta trasa sprawdza go w Sanity (tokenem serwerowym) — bez ważnego sekretu draft mode się nie włączy.
 */
export const { GET } = defineEnableDraftMode({
  client: client.withConfig({ token: previewToken, useCdn: false }),
});
