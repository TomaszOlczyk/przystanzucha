import type { Metadata } from "next";
import Link from "next/link";
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
    <section className="max-w-[1200px] mx-auto px-5 lg:px-10 pb-24">
      <p className="pt-4 t-small">
        <Link href="/" className="hover:text-[var(--color-ink)]">
          Przystań Zucha
        </Link>
        <span className="mx-2 text-[var(--color-coral)]">/</span>
        Konsultacja
      </p>
      <div className="pt-10 lg:pt-16 grid gap-14 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <h1 data-hero="title" className="t-hero !text-[clamp(3rem,7vw,6.2rem)]">
            Porozmawiajmy o <em className="text-[var(--color-sea)]">Twoim dziecku</em>.
          </h1>
          <p data-hero="fade" className="mt-7 t-lead max-w-[44ch]">
            Spotkanie trwa tyle, ile potrzebujesz. Opowiemy o grupach i adaptacji, pokażemy sale i odpowiemy na wszystkie pytania, także te, które trudno zadać przez telefon.
          </p>
          <p data-hero="fade" className="mt-8">
            <span className="t-label block mb-1">Wolisz od razu zadzwonić?</span>
            <a href={`tel:${siteData.phone.replace(/\s/g, "")}`} data-loc="konsultacja" className="t-title !text-[2.2rem]">
              {siteData.phone}
            </a>
          </p>
        </div>
        <ConsultationForm email={siteData.email} phone={siteData.phone} />
      </div>
    </section>
  );
}
