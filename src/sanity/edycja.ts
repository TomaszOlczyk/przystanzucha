/**
 * Klikalne pola w podglądzie Studio (Visual Editing) dla elementów bez tekstu — zdjęć i rysunków zastępczych.
 * Teksty mają niewidoczne znaczniki stega, ale obrazek ich nie ma, więc wskazujemy pole atrybutem `data-sanity`.
 * Poza podglądem (zwykły odwiedzający) atrybutu nie ma.
 */
import { draftMode } from "next/headers";
import { createDataAttribute } from "next-sanity";
import { client } from "./client";

type Sciezka = string | (string | number | { _key: string })[];
export type PoleSanity = (path: Sciezka) => string | undefined;

/** Np. `const pole = await polaDokumentu("homePage")` → `data-sanity={pole(["groups", "items", { _key }, "image"])}`. */
export async function polaDokumentu(id: string, type: string = id): Promise<PoleSanity> {
  const { isEnabled } = await draftMode();
  if (!isEnabled) return () => undefined;
  const { projectId, dataset } = client.config();
  const atrybut = createDataAttribute({ projectId, dataset, baseUrl: "/studio", id, type });
  return (path) => atrybut(path);
}

/** Element tablicy po `_key` (stabilny przy przestawianiu), awaryjnie po indeksie. */
export const element = (item: { _key?: string } | undefined, i: number) => (item?._key ? { _key: item._key } : i);
