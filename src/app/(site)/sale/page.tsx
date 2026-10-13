import type { Metadata } from "next";
import Image from "next/image";
import { getClassroomsPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";
import PageIntro, { VisitCta } from "@/components/PageIntro";
import { Icon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Sale przedszkolne w morskim klimacie",
  description:
    "Dwie jasne sale w morskim klimacie: strefa sensoryczna, materiały Montessori, kącik czytelniczy i tablica interaktywna. Przedszkole Przystań Zucha, Łódź Retkinia.",
  alternates: { canonical: "/sale/" },
};

// Zdjęcia sal z biblioteki Sanity (druga sala: zdjęcie poglądowe w niskiej rozdzielczości — do podmiany).
const ROOM_PHOTOS = [
  {
    ref: "image-9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072-jpg",
    alt: "Sala z muralem podwodnego świata, wielorybem i dywanem w kształcie fali",
    caption: "Mural z wielorybem, dywan-fala, kącik zabaw i stoliki dopasowane do wzrostu dzieci.",
    width: 1400,
  },
  {
    ref: "image-5c84f0677c50117270285ce77db6b95b29463e8c-385x385-jpg",
    alt: "Jasna sala z dużymi przeszklonymi oknami, dywanem w morskie fale i stolikami",
    caption: "Duże okna, dużo światła i morskie dekoracje — „Ahoj!” na szybach wita dzieci każdego ranka.",
    width: 385,
  },
];

export default async function SalePage() {
  const data = await getClassroomsPage();

  return (
    <>
      <PageIntro
        eyebrow="Nasze sale"
        title={
          <>
            Dwie sale, <span className="italic text-[var(--color-sea)]">jeden spokojny klimat</span>
          </>
        }
        lead="Każda grupa ma własną salę. Obie urządziliśmy w spokojnym, morskim klimacie: stonowane kolory, dużo światła i przestrzeń, w której nikt nie ginie w tłumie."
      />

      <section className="pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-5">
          {ROOM_PHOTOS.map((room, i) => (
            <figure key={room.ref} className="card overflow-hidden">
              <div className="relative aspect-[4/3] bg-[var(--color-sea-light)]">
                <Image
                  src={urlFor({ asset: { _ref: room.ref } }).width(room.width).auto("format").url()}
                  alt={room.alt}
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
              <figcaption className="p-6">
                <p className="text-sm font-extrabold uppercase tracking-wider text-[var(--color-sea)]">Sala {i + 1}</p>
                <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">{room.caption}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {data?.room?.features?.length > 0 && (
        <section className="py-12 md:py-16 bg-[var(--color-foam)]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 items-start">
            <div>
              <p className="eyebrow">Wyposażenie</p>
              <h2 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight">Co znajdziesz w salach</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {data.room.features.map((f) => (
                <li key={f} className="card px-5 py-4 flex items-start gap-3">
                  <span className="mt-0.5 text-[var(--color-sea)]">
                    <Icon name="check" className="w-5 h-5" />
                  </span>
                  <span className="font-semibold">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {data?.uses?.length > 0 && (
        <section className="py-12 md:py-16">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Strefy</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight max-w-2xl">Sala zmienia się razem z planem dnia</h2>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
              {data.uses.map((use) => (
                <div key={use.name} className="card p-6">
                  <h3 className="text-xl font-semibold">{use.name}</h3>
                  <p className="mt-2 text-[var(--color-ink-soft)] leading-relaxed">{use.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {data?.materials?.length > 0 && (
        <section className="py-12 md:py-16 bg-[var(--color-sand-deep)]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="eyebrow">Materiały</p>
            <h2 className="mt-2 text-3xl md:text-4xl font-semibold leading-tight">Pomoce, z którymi pracujemy</h2>
            <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {data.materials.map((cat) => (
                <div key={cat.category} className="card p-6">
                  <h3 className="text-lg font-semibold">{cat.category}</h3>
                  <ul className="mt-3 space-y-1.5">
                    {cat.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-[var(--color-ink-soft)]">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-sea)] shrink-0" aria-hidden="true" />
                        {item.trim()}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <VisitCta heading="Zobacz sale na żywo" text="Najlepiej przyjść z dzieckiem — zobaczysz, jak reaguje na przestrzeń i nauczycielki." />
    </>
  );
}
