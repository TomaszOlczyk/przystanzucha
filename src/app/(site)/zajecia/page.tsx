import type { Metadata } from "next";
import { getActivitiesPage } from "@/sanity/fetchers";
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
        eyebrow="Zajęcia"
        title={
          <>
            {count} zajęć <em className="text-[var(--color-sea)]">w ramach czesnego</em>.
          </>
        }
        lead="Bez dopłat i bez popołudniowego wożenia dziecka na zajęcia. Program dopasowujemy do grupy tak, żeby wspierać dzieci, a nie je przemęczać."
      />

      <section className="max-w-[1200px] mx-auto px-5 lg:px-10 pb-24">
        <div className="hidden md:grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1.4fr)_160px_120px] gap-8 pb-3 eyebrow border-b-[1.5px] border-[var(--color-ink)]">
          <span>Nr</span>
          <span>Zajęcia</span>
          <span>Na czym polegają</span>
          <span>Jak często</span>
          <span>Ile trwają</span>
        </div>
        <ol data-stagger className="border-t-[1.5px] border-[var(--color-ink)] md:border-t-0">
          {data.activities.map((a, i) => (
            <li
              key={a.name}
              className="group grid gap-2 md:gap-8 py-7 border-b border-[var(--color-line)] md:grid-cols-[80px_minmax(0,1fr)_minmax(0,1.4fr)_160px_120px] md:items-baseline"
            >
              <span className="t-label !text-[var(--color-coral)]">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="t-title transition-colors group-hover:text-[var(--color-sea)]">{a.name}</h2>
              <p className="t-body">{a.description}</p>
              <p className="font-semibold">{a.frequency}</p>
              <p className="text-[var(--color-ink-soft)]">{a.duration}</p>
            </li>
          ))}
        </ol>
        <p className="mt-10 max-w-[62ch] t-lead">
          Nasze nauczycielki mają kwalifikacje z pedagogiki specjalnej, dlatego dostosowujemy zajęcia także do dzieci, które potrzebują dodatkowego wsparcia.
        </p>
      </section>

      <VisitCta
        heading={
          <>
            Zobacz zajęcia <em className="text-[var(--color-sea)]">od środka</em>.
          </>
        }
        text="Umów wizytę. Opowiemy o planie dnia i o tym, jak dobieramy zajęcia do dziecka."
      />
    </>
  );
}
