import type { Metadata } from "next";
import ConsultationForm from "@/components/ConsultationForm";
import { getSiteSettings } from "@/sanity/fetchers";

export const metadata: Metadata = {
  title: "Umów konsultację",
  description: "Umów spotkanie w przedszkolu Przystań Zucha: opowiemy o grupach i adaptacji, pokażemy sale i odpowiemy na pytania.",
  alternates: { canonical: "/konsultacja/" },
};

export default async function ConsultationPage() {
  const siteData = await getSiteSettings();

  return (
    <section className="pt-8 md:pt-16 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
        <div>
          <p className="eyebrow">Konsultacja</p>
          <h1 className="mt-2 text-[2.35rem] leading-[1.1] md:text-5xl font-semibold">
            Porozmawiajmy o <span className="italic text-[var(--color-sea)]">Twoim dziecku</span>
          </h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--color-ink-soft)]">
            Spotkanie trwa tyle, ile potrzebujesz. Opowiemy o grupach i adaptacji, pokażemy sale i odpowiemy na wszystkie pytania — także te, które trudno zadać przez telefon.
          </p>
          <p className="mt-6 text-[var(--color-ink-soft)]">
            Wolisz od razu zadzwonić?{" "}
            <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} data-loc="konsultacja" className="font-extrabold text-[var(--color-sea-dark)] underline underline-offset-4">
              {siteData.phone}
            </a>
          </p>
        </div>
        <ConsultationForm email={siteData.email} phone={siteData.phone} />
      </div>
    </section>
  );
}
