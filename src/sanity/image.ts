import { createImageUrlBuilder } from "@sanity/image-url";
import { client } from "./client";
import type { SanityImage } from "./types";

const builder = createImageUrlBuilder(client);

export function urlFor(source: unknown) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return builder.image(source as any);
}

/** Czy obraz z Sanity ma wgrany plik. */
export const maZdjecie = (img?: SanityImage | null): img is SanityImage & { asset: { _ref: string } } => !!img?.asset?._ref;

/**
 * `object-position` z punktu centralnego (hotspot) ustawionego w Studio — dzięki temu `object-cover`
 * przycina zdjęcie wokół wybranego miejsca. Uwzględnia ręczne kadrowanie (crop).
 */
export function pozycjaHotspotu(img?: SanityImage | null): string | undefined {
  if (!img?.hotspot) return undefined;
  const c = img.crop ?? { top: 0, bottom: 0, left: 0, right: 0 };
  const x = (img.hotspot.x - c.left) / Math.max(1 - c.left - c.right, 0.0001);
  const y = (img.hotspot.y - c.top) / Math.max(1 - c.top - c.bottom, 0.0001);
  const proc = (v: number) => `${Math.round(Math.min(Math.max(v, 0), 1) * 100)}%`;
  return `${proc(x)} ${proc(y)}`;
}
