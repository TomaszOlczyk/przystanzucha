import Image from "next/image";
import { pozycjaHotspotu, urlFor } from "@/sanity/image";
import type { SanityImage } from "@/sanity/types";

type Motif = "wave" | "forest" | "sun" | "boat" | "blocks" | "book";
type Shape = "arch" | "rect" | "round";

const TINTS: Record<Motif, string> = {
  wave: "#d7e9e6",
  forest: "#dfe6d3",
  sun: "#f6e7c4",
  boat: "#e3ebee",
  blocks: "#f3ddd3",
  book: "#ebe3d4",
};

/** Rysunki kreską na miejsce brakującego zdjęcia — wyglądają na ilustrację, nie na pustą ramkę. */
function Drawing({ motif }: { motif: Motif }) {
  const common = { fill: "none", stroke: "#16252e", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  switch (motif) {
    case "forest":
      return (
        <svg viewBox="0 0 120 90" className="w-[46%] h-auto" aria-hidden="true">
          <g {...common}>
            <path d="M34 70V52M34 18 18 48h32zM34 30 22 52h24" />
            <path d="M78 72V48M78 8 58 44h40zM78 22 63 48h30" fill="#9fb58c" fillOpacity=".35" />
            <path d="M8 74c16-4 30 3 46 0s34-4 58 0" />
            <circle cx="100" cy="20" r="6" />
          </g>
        </svg>
      );
    case "wave":
      return (
        <svg viewBox="0 0 120 90" className="w-[46%] h-auto" aria-hidden="true">
          <g {...common}>
            <path d="M8 50c8-6 16 6 24 0s16 6 24 0 16 6 24 0 16 6 24 0 8 3 8 3" />
            <path d="M8 64c8-6 16 6 24 0s16 6 24 0 16 6 24 0 16 6 24 0 8 3 8 3" />
            <path d="M60 22c10-4 20 2 22 10-8 2-16-1-22-10zM60 22c-6 6-8 12-6 18" fill="#9cc8c4" fillOpacity=".4" />
          </g>
        </svg>
      );
    case "sun":
      return (
        <svg viewBox="0 0 120 90" className="w-[42%] h-auto" aria-hidden="true">
          <g {...common}>
            <circle cx="60" cy="44" r="16" fill="#f3c35a" fillOpacity=".55" />
            <path d="M60 14v8M60 66v8M30 44h8M82 44h8M39 23l6 6M75 59l6 6M39 65l6-6M75 29l6-6" />
          </g>
        </svg>
      );
    case "boat":
      return (
        <svg viewBox="0 0 120 90" className="w-[42%] h-auto" aria-hidden="true">
          <g {...common}>
            <path d="M60 14v42M60 16 32 50h28M64 22v28h22C82 36 74 26 64 22M22 56h76l-10 13H32z" />
            <path d="M10 78c8-4 14 4 22 0s14 4 22 0 14 4 22 0 14 4 22 0 8 2 8 2" />
          </g>
        </svg>
      );
    case "blocks":
      return (
        <svg viewBox="0 0 120 90" className="w-[42%] h-auto" aria-hidden="true">
          <g {...common}>
            <rect x="30" y="50" width="24" height="24" rx="2" fill="#c24a2b" fillOpacity=".25" />
            <rect x="56" y="50" width="24" height="24" rx="2" />
            <rect x="43" y="26" width="24" height="24" rx="2" fill="#f3c35a" fillOpacity=".4" />
            <path d="M84 74l14-24 14 24z" />
          </g>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 120 90" className="w-[42%] h-auto" aria-hidden="true">
          <g {...common}>
            <path d="M60 24c-10-6-26-6-36-2v46c10-4 26-4 36 2 10-6 26-6 36-2V22c-10-4-26-4-36 2zM60 24v46" />
          </g>
        </svg>
      );
  }
}

/**
 * Miejsce na zdjęcie z Sanity. Gdy zdjęcia jeszcze nie ma, pokazuje ilustrację kreską na ciepłym tle
 * (opcjonalnie z inicjałami lub podpisem), więc strona wygląda na skończoną, a slot czeka na zdjęcie w Studio.
 */
export default function PhotoSlot({
  image,
  src,
  alt,
  motif = "sun",
  shape = "rect",
  initials,
  caption,
  sizes = "(min-width: 1024px) 30vw, 90vw",
  className = "",
  ratio = "aspect-[4/5]",
  priority = false,
}: {
  image?: SanityImage;
  src?: string;
  alt: string;
  motif?: Motif;
  shape?: Shape;
  initials?: string;
  caption?: string;
  sizes?: string;
  className?: string;
  ratio?: string;
  priority?: boolean;
}) {
  const radius = shape === "arch" ? "rounded-t-full rounded-b-[10px]" : shape === "round" ? "rounded-full" : "rounded-[10px]";
  const url = src ?? (image?.asset ? urlFor(image).width(1000).auto("format").url() : undefined);

  return (
    <figure className={`relative ${className}`}>
      <div className={`relative overflow-hidden ${ratio} ${radius}`} style={url ? undefined : { background: TINTS[motif] }}>
        {url ? (
          <Image src={url} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" style={src ? undefined : { objectPosition: pozycjaHotspotu(image) }} />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3" role="img" aria-label={alt}>
            {initials ? (
              <span className="font-display text-[clamp(2.6rem,5vw,3.6rem)] leading-none text-[var(--color-ink)]" style={{ fontVariationSettings: '"SOFT" 100' }}>
                {initials}
              </span>
            ) : (
              <Drawing motif={motif} />
            )}
          </div>
        )}
      </div>
      {caption && <figcaption className="mt-3 t-small">{caption}</figcaption>}
    </figure>
  );
}
