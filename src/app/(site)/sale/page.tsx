import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getClassroomsPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";
import PageIntro, { VisitCta } from "@/components/PageIntro";
import Chapter from "@/components/Chapter";
import PhotoSlot from "@/components/PhotoSlot";

export const metadata: Metadata = {
  title: "Sala Morska i Sala Leśna — nasze sale",
  description:
    "Dwie kameralne sale: Morska i Leśna. Strefa sensoryczna, materiały Montessori, kącik czytelniczy i tablica interaktywna. Przedszkole Przystań Zucha, Łódź Retkinia.",
  alternates: { canonical: "/sale/" },
};

// Zdjęcia Sali Morskiej z Sanity (drugie w niskiej rozdzielczości — do podmiany). Sala Leśna: brak zdjęć — dodać.
const ROOMS = [
  {
    ref: "image-9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072-jpg",
    alt: "Sala Morska: mural z wielorybem i dywan w kształcie fali",
    width: 1400,
  },
  {
    ref: "image-5c84f0677c50117270285ce77db6b95b29463e8c-385x385-jpg",
    alt: "Sala Morska: duże okna z napisem Ahoj, dywan w fale i stoliki",
    width: 385,
  },
];

export default async function SalePage() {
  const data = await getClassroomsPage();

  return (
    <>
      <PageIntro
        eyebrow="Sale"
        title={
          <>
            Sala Morska i{" "}
            <em className="text-[var(--color-sea)]">Sala Leśna</em>.
          </>
        }
        lead="Każda grupa ma własną salę. Grupa 1 bawi się i uczy w Sali Morskiej, a Grupa 2 w Sali Leśnej. Dzięki małym grupom nikt tu nie ginie w tłumie."
      />

      <Chapter no="01" label="Grupa 1" className="!border-t-0">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
          <div>
            <h2 data-split className="t-display">
              Sala Morska
            </h2>
            <p className="mt-5 t-lead max-w-[40ch]">
              Mural z wielorybem, dywan w morskie fale i duże, jasne okna. To
              sala Grupy 1.
            </p>
          </div>
          <div className="grid gap-12 sm:grid-cols-[1.3fr_0.7fr] sm:items-end">
            {ROOMS.map((room, i) => (
              <figure
                key={room.ref}
                data-photo
                className={`print relative ${i ? "sm:mb-10 rotate-[3deg]" : "rotate-[-1.5deg]"}`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sea-light)]">
                  <Image
                    src={urlFor({ asset: { _ref: room.ref } })
                      .width(room.width)
                      .auto("format")
                      .url()}
                    alt={room.alt}
                    fill
                    sizes="(min-width: 1024px) 34vw, 100vw"
                    className="object-cover"
                    priority={i === 0}
                  />
                </div>
              </figure>
            ))}
          </div>
        </div>
      </Chapter>

      <Chapter no="02" label="Grupa 2">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
          <div className="grid gap-6 grid-cols-[1.3fr_0.7fr] items-end order-2 lg:order-1">
            <PhotoSlot
              image={data?.forestRoom?.image}
              alt="Sala Leśna"
              motif="forest"
              ratio="aspect-[4/3]"
              sizes="(min-width: 1024px) 34vw, 60vw"
            />
            <PhotoSlot
              image={data?.forestRoom?.image2}
              alt="Sala Leśna, kącik zabaw"
              motif="blocks"
              ratio="aspect-[3/4]"
              className="mb-8"
              sizes="(min-width: 1024px) 18vw, 30vw"
            />
          </div>
          <div className="order-1 lg:order-2">
            <h2 data-split className="t-display">
              Sala Leśna
            </h2>
            <p className="mt-5 t-lead max-w-[44ch]">
              Nowa sala Grupy 2, czyli dzieci, którym w mniejszej grupie jest
              lepiej. Dzień płynie tu spokojniej, więc łatwiej się wyciszyć i
              skupić.
            </p>
            <Link
              href="/#kontakt"
              data-cta="grupa_2"
              data-loc="sale"
              className="mt-8 inline-block link-u"
            >
              Zapytaj o wolne miejsce w Grupie 2 →
            </Link>
          </div>
        </div>
      </Chapter>

      {data?.room?.features?.length > 0 && (
        <Chapter no="03" label="Wyposażenie">
          <h2 data-split className="t-display max-w-[14ch]">
            Co znajdziesz <em className="text-[var(--color-sea)]">w salach</em>.
          </h2>
          <ol
            data-stagger
            className="mt-12 grid md:grid-cols-2 border-t-[1.5px] border-[var(--color-ink)]"
          >
            {data.room.features.map((f, i) => (
              <li
                key={f}
                className={`flex gap-5 items-baseline py-5 border-b border-[var(--color-line)] ${i % 2 ? "md:pl-10 md:border-l" : "md:pr-10"}`}
              >
                <span className="t-label !text-[var(--color-coral)] w-8 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="t-body !text-[var(--color-ink)] !text-[1.05rem]">
                  {f}
                </span>
              </li>
            ))}
          </ol>
        </Chapter>
      )}

      {data?.uses?.length > 0 && (
        <Chapter no="04" label="Strefy">
          <h2 data-split className="t-display max-w-[15ch]">
            Sala zmienia się{" "}
            <em className="text-[var(--color-sea)]">w ciągu dnia</em>.
          </h2>
          <div
            data-stagger
            className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3"
          >
            {data.uses.map((use) => (
              <div
                key={use.name}
                className="border-t border-[var(--color-ink)] pt-5"
              >
                <h3 className="t-title">{use.name}</h3>
                <p className="mt-3 t-body">{use.description}</p>
              </div>
            ))}
          </div>
        </Chapter>
      )}

      {data?.materials?.length > 0 && (
        <Chapter no="05" label="Materiały">
          <h2 data-split className="t-display max-w-[15ch]">
            Pomoce, z którymi{" "}
            <em className="text-[var(--color-sea)]">pracujemy</em>.
          </h2>
          <div
            data-stagger
            className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {data.materials.map((cat) => (
              <div key={cat.category}>
                <h3 className="t-title pb-4 border-b border-[var(--color-ink)]">
                  {cat.category}
                </h3>
                <ul className="mt-4 space-y-2 t-body">
                  {cat.items.map((item) => (
                    <li key={item}>{item.trim()}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Chapter>
      )}

      <VisitCta
        heading={
          <>
            Zobacz sale <em className="text-[var(--color-sea)]">na żywo</em>.
          </>
        }
        text="Najlepiej przyjść z dzieckiem. Zobaczysz, jak reaguje na nowe miejsce i na nauczycielki."
      />
    </>
  );
}
