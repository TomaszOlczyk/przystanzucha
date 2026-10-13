import type { Metadata } from "next";
import Image from "next/image";
import { getActivitiesPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";
import PageIntro, { VisitCta } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Zajęcia w ramach czesnego — angielski, rytmika, logopedia",
  description:
    "10 zajęć w ramach czesnego, bez dopłat: angielski, rytmika, plastyka, gimnastyka korekcyjna, logopedia, sensoryka, terapia ręki, robotyka, przyroda, teatrzyk.",
  alternates: { canonical: "/zajecia/" },
};

export default async function ZajeciaPage() {
  const data = await getActivitiesPage();
  const count = data.activities.length;

  return (
    <>
      <PageIntro
        eyebrow="Zajęcia dla dzieci"
        title={
          <>
            {count} zajęć <span className="italic text-[var(--color-sea)]">w ramach czesnego</span>
          </>
        }
        lead="Bez dopłat i bez popołudniowego wożenia dziecka na zajęcia. Program dopasowujemy do grupy — tak, żeby wspierać, a nie przemęczać."
      />

      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {data.activities.map((a) => (
              <li key={a.name} className="card overflow-hidden flex flex-col">
                {a.image?.asset && (
                  <div className="relative h-40">
                    <Image src={urlFor(a.image).width(640).height(320).url()} alt={a.name} fill className="object-cover" />
                  </div>
                )}
                <div className="p-6 flex flex-col flex-1">
                  <h2 className="text-xl font-semibold">{a.name}</h2>
                  <p className="mt-2 leading-relaxed text-[var(--color-ink-soft)] flex-1">{a.description}</p>
                  <p className="mt-4 pt-4 border-t border-[var(--color-line)] text-sm font-bold text-[var(--color-sea-dark)] flex gap-4">
                    <span>{a.frequency}</span>
                    <span className="text-[var(--color-muted)] font-semibold">{a.duration}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {data.subtitle && (
            <p className="mt-10 max-w-3xl text-lg leading-relaxed text-[var(--color-ink-soft)]">
              Dzięki szerokim kwalifikacjom kadry pracujemy także z dziećmi, które potrzebują dodatkowego wsparcia — zajęcia dostosowujemy do ich możliwości.
            </p>
          )}
        </div>
      </section>

      <VisitCta heading="Zobacz zajęcia od środka" text="Umów wizytę — opowiemy o planie dnia i o tym, jak dobieramy zajęcia do dziecka." />
    </>
  );
}
