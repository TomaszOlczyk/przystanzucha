import type { Metadata } from "next";
import { stegaClean } from "next-sanity";
import { getSiteSettings, getStaffPage } from "@/sanity/fetchers";
import PageIntro, { VisitCta } from "@/components/PageIntro";
import PhotoSlot from "@/components/PhotoSlot";
import { Akcent } from "@/lib/akcent";
import { metadaneStrony } from "@/lib/metadane";
import { maZdjecie } from "@/sanity/image";
import { element, polaDokumentu } from "@/sanity/edycja";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = await getStaffPage({ stega: false });
  return metadaneStrony(seo, "/kadra/");
}

/** Akapity z pola „Opis” (każdy akapit w nowej linii). Nie przycinamy tekstu — w podglądzie są w nim znaczniki stega. */
const akapity = (tekst?: string) => (tekst ?? "").split(/\n+/).filter((p) => stegaClean(p).trim());

const inicjaly = (name: string) =>
  stegaClean(name)
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default async function KadraPage() {
  const [staffData, siteData, pole] = await Promise.all([getStaffPage(), getSiteSettings(), polaDokumentu("staffPage")]);
  const { intro, visitCta } = staffData;

  return (
    <>
      <PageIntro eyebrow={intro.eyebrow} title={<Akcent tekst={intro.title} />} lead={intro.lead} />

      <section className="max-w-[1200px] mx-auto px-5 lg:px-10 pb-20">
        {staffData.members
          .filter((m) => m?.name)
          .map((member, i) => {
            const quals = (member.qualifications ?? []).filter((q) => stegaClean(q)?.trim());
            const [first, ...rest] = akapity(member.description);
            const rola = stegaClean(member.role ?? "");
            return (
              <article
                key={member._key ?? i}
                className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] md:gap-12 lg:gap-16 py-14 lg:py-20 border-t border-[var(--color-line)]"
              >
                <div className="lg:sticky lg:top-28 lg:self-start max-w-[260px]">
                  <PhotoSlot
                    image={member.image}
                    pole={pole(["members", element(member, i), "image"])}
                    alt={member.image?.alt || `${stegaClean(member.name)}${rola ? `, ${rola.toLowerCase()}` : ""}`}
                    shape="arch"
                    ratio="aspect-[4/5]"
                    initials={maZdjecie(member.image) ? undefined : inicjaly(member.name)}
                    motif={(["sun", "wave", "forest"] as const)[i % 3]}
                    sizes="260px"
                  />
                </div>
                <div className="min-w-0">
                  <h2 data-split className="t-display">
                    {member.name}
                  </h2>
                  {member.role && <p className="mt-3 t-small max-w-[60ch]">{member.role}</p>}
                  {first && <p className="mt-8 t-lead !text-[var(--color-ink)] max-w-[52ch]">{first}</p>}
                  <div className="mt-6 space-y-4 t-body max-w-[62ch] lg:columns-2 lg:gap-12 lg:max-w-none">
                    {rest.map((p, j) => (
                      <p key={j} className="break-inside-avoid">
                        {p}
                      </p>
                    ))}
                  </div>
                  {quals.length > 0 && (
                    <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink-soft)]">
                      {quals.map((q, j) => (
                        <li key={j}>
                          <span className="text-[var(--color-coral)] mr-2" aria-hidden="true">
                            ✦
                          </span>
                          {q}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
      </section>

      <VisitCta heading={visitCta.heading} text={visitCta.text} buttonText={siteData.visitCtaButton} />
    </>
  );
}
