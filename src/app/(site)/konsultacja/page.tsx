import type { Metadata } from "next";
import Link from "next/link";
import { stegaClean } from "next-sanity";
import ConsultationForm from "@/components/ConsultationForm";
import { getConsultationPage, getSiteSettings } from "@/sanity/fetchers";
import { Akcent } from "@/lib/akcent";
import { metadaneStrony } from "@/lib/metadane";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getConsultationPage({ stega: false });
  return metadaneStrony(seo, "/konsultacja/");
}

export default async function ConsultationPage() {
  const [siteData, strona] = await Promise.all([getSiteSettings(), getConsultationPage()]);
  const phone = stegaClean(siteData.phone);

  return (
    <section className="max-w-[1200px] mx-auto px-5 lg:px-10 pb-24">
      <p className="pt-4 t-small">
        <Link href="/" className="hover:text-[var(--color-ink)]">
          Przystań Zucha
        </Link>
        <span className="mx-2 text-[var(--color-coral-dark)]">/</span>
        {strona.breadcrumb}
      </p>
      <div className="pt-10 lg:pt-16 grid gap-14 lg:grid-cols-2 lg:gap-16 items-start">
        <div>
          <h1 data-hero="title" className="t-hero !text-[clamp(3rem,7vw,6.2rem)]">
            <Akcent tekst={strona.title} />
          </h1>
          <p data-hero="fade" className="mt-7 t-lead max-w-[44ch]">
            {strona.lead}
          </p>
          <p data-hero="fade" className="mt-8">
            <span className="t-label block mb-1">{strona.phoneLabel}</span>
            <a href={`tel:${phone.replace(/\s/g, "")}`} data-loc="konsultacja" className="t-title !text-[2.2rem]">
              {siteData.phone}
            </a>
          </p>
        </div>
        <ConsultationForm email={stegaClean(siteData.email)} phone={phone} />
      </div>
    </section>
  );
}
