import type { Metadata } from "next";
import { getActivitiesPage, getSiteSettings } from "@/sanity/fetchers";
import PageIntro, { VisitCta } from "@/components/PageIntro";
import { Akcent, zLiczba } from "@/lib/akcent";
import { metadaneStrony } from "@/lib/metadane";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getActivitiesPage({ stega: false });
  return metadaneStrony(seo, "/zajecia/");
}

export default async function ZajeciaPage() {
  const [data, siteData] = await Promise.all([getActivitiesPage(), getSiteSettings()]);
  const activities = data.activities.filter((a) => a?.name);
  const { intro, tableHeaders: th } = data;

  return (
    <>
      <PageIntro eyebrow={intro.eyebrow} title={<Akcent tekst={zLiczba(intro.title, activities.length)} />} lead={intro.lead} />

      <section className="max-w-[1200px] mx-auto px-5 lg:px-10 pb-24">
        <div className="hidden md:grid grid-cols-[80px_minmax(0,1fr)_minmax(0,1.4fr)_160px_120px] gap-8 pb-3 eyebrow border-b-[1.5px] border-[var(--color-ink)]">
          <span>{th.no}</span>
          <span>{th.name}</span>
          <span>{th.description}</span>
          <span>{th.frequency}</span>
          <span>{th.duration}</span>
        </div>
        <ol data-stagger className="border-t-[1.5px] border-[var(--color-ink)] md:border-t-0">
          {activities.map((a, i) => (
            <li
              key={a._key ?? i}
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
        <p className="mt-10 max-w-[62ch] t-lead">{data.note}</p>
      </section>

      <VisitCta heading={data.visitCta.heading} text={data.visitCta.text} buttonText={siteData.visitCtaButton} />
    </>
  );
}
