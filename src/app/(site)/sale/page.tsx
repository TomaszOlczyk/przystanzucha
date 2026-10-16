import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getClassroomsPage, getSiteSettings } from "@/sanity/fetchers";
import { maZdjecie, pozycjaHotspotu, urlFor } from "@/sanity/image";
import PageIntro, { VisitCta } from "@/components/PageIntro";
import Chapter from "@/components/Chapter";
import PhotoSlot from "@/components/PhotoSlot";
import { Akcent } from "@/lib/akcent";
import { metadaneStrony } from "@/lib/metadane";
import { polaDokumentu } from "@/sanity/edycja";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getClassroomsPage({ stega: false });
  return metadaneStrony(seo, "/sale/");
}

export default async function SalePage() {
  const [data, siteData, pole] = await Promise.all([getClassroomsPage(), getSiteSettings(), polaDokumentu("classroomsPage")]);
  const { intro, seaRoom, forestRoom, features, zones, learningMaterials: materials, visitCta } = data;
  const zdjeciaMorskiej = (seaRoom.images ?? []).filter(maZdjecie).slice(0, 2);
  const wyposazenie = (features.items ?? []).filter(Boolean);
  const strefy = (zones.items ?? []).filter((z) => z?.name);
  const pomoce = (materials.items ?? []).filter((m) => m?.category);

  return (
    <>
      <PageIntro eyebrow={intro.eyebrow} title={<Akcent tekst={intro.title} />} lead={intro.lead} />

      {seaRoom.show && (
        <Chapter label={seaRoom.label} className="!border-t-0">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:items-center">
            <div>
              <h2 data-split className="t-display">
                {seaRoom.heading}
              </h2>
              <p className="mt-5 t-lead max-w-[40ch]">{seaRoom.lead}</p>
            </div>
            <div className="grid gap-12 sm:grid-cols-[1.3fr_0.7fr] sm:items-end" data-sanity={pole(["seaRoom", "images"])}>
              {zdjeciaMorskiej.map((img, i) => (
                <figure key={img.asset._ref} data-photo className={`print relative ${i ? "sm:mb-10 rotate-[3deg]" : "rotate-[-1.5deg]"}`}>
                  <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-sea-light)]">
                    <Image
                      src={urlFor(img).width(1400).fit("max").auto("format").url()}
                      alt={img.alt || seaRoom.heading}
                      fill
                      sizes="(min-width: 1024px) 34vw, 100vw"
                      className="object-cover"
                      style={{ objectPosition: pozycjaHotspotu(img) }}
                      priority={i === 0}
                    />
                  </div>
                </figure>
              ))}
            </div>
          </div>
        </Chapter>
      )}

      {forestRoom.show && (
        <Chapter label={forestRoom.label}>
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-center">
            <div className="grid gap-6 grid-cols-[1.3fr_0.7fr] items-end order-2 lg:order-1">
              <PhotoSlot
                image={forestRoom.image}
                pole={pole(["forestRoom", "image"])}
                alt={forestRoom.image?.alt || "Sala Leśna"}
                motif="forest"
                ratio="aspect-[4/3]"
                sizes="(min-width: 1024px) 34vw, 60vw"
              />
              <PhotoSlot
                image={forestRoom.image2}
                pole={pole(["forestRoom", "image2"])}
                alt={forestRoom.image2?.alt || "Sala Leśna, kącik zabaw"}
                motif="blocks"
                ratio="aspect-[3/4]"
                className="mb-8"
                sizes="(min-width: 1024px) 18vw, 30vw"
              />
            </div>
            <div className="order-1 lg:order-2">
              <h2 data-split className="t-display">
                {forestRoom.heading}
              </h2>
              <p className="mt-5 t-lead max-w-[44ch]">{forestRoom.lead}</p>
              {forestRoom.linkText && (
                <Link href="/#kontakt" data-cta="grupa_2" data-loc="sale" className="mt-8 inline-block link-u">
                  {forestRoom.linkText}
                </Link>
              )}
            </div>
          </div>
        </Chapter>
      )}

      {features.show && wyposazenie.length > 0 && (
        <Chapter label={features.label}>
          <h2 data-split className="t-display max-w-[14ch]">
            <Akcent tekst={features.heading} />
          </h2>
          <ol data-stagger className="mt-12 grid md:grid-cols-2 border-t-[1.5px] border-[var(--color-ink)]">
            {wyposazenie.map((f, i) => (
              <li
                key={i}
                className={`flex gap-5 items-baseline py-5 border-b border-[var(--color-line)] ${i % 2 ? "md:pl-10 md:border-l" : "md:pr-10"}`}
              >
                <span className="t-label !text-[var(--color-coral-dark)] w-8 shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="t-body !text-[var(--color-ink)] !text-[1.05rem]">{f}</span>
              </li>
            ))}
          </ol>
        </Chapter>
      )}

      {zones.show && strefy.length > 0 && (
        <Chapter label={zones.label}>
          <h2 data-split className="t-display max-w-[15ch]">
            <Akcent tekst={zones.heading} />
          </h2>
          <div data-stagger className="mt-12 grid gap-x-12 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {strefy.map((use, i) => (
              <div key={use._key ?? i} className="border-t border-[var(--color-ink)] pt-5">
                <h3 className="t-title">{use.name}</h3>
                <p className="mt-3 t-body">{use.description}</p>
              </div>
            ))}
          </div>
        </Chapter>
      )}

      {materials.show && pomoce.length > 0 && (
        <Chapter label={materials.label}>
          <h2 data-split className="t-display max-w-[15ch]">
            <Akcent tekst={materials.heading} />
          </h2>
          <div data-stagger className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {pomoce.map((cat, i) => (
              <div key={cat._key ?? i}>
                <h3 className="t-title pb-4 border-b border-[var(--color-ink)]">{cat.category}</h3>
                <ul className="mt-4 space-y-2 t-body">
                  {(cat.items ?? []).filter(Boolean).map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Chapter>
      )}

      <VisitCta heading={visitCta.heading} text={visitCta.text} buttonText={siteData.visitCtaButton} />
    </>
  );
}
