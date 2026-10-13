import type { Metadata } from "next";
import { getStaffPage } from "@/sanity/fetchers";
import PageIntro, { VisitCta } from "@/components/PageIntro";
import PhotoSlot from "@/components/PhotoSlot";
import { paragraphs as toParagraphs, tidy } from "@/lib/copy";

export const metadata: Metadata = {
  title: "Kadra przedszkola — pedagodzy specjalni, logopeda",
  description:
    "Poznaj nauczycielki Przystani Zucha: pedagodzy specjalni, logopeda, terapeutka TUS. Doświadczenie w pracy z dziećmi w spektrum autyzmu. Łódź, Retkinia.",
  alternates: { canonical: "/kadra/" },
};

export default async function KadraPage() {
  const staffData = await getStaffPage();

  return (
    <>
      <PageIntro
        eyebrow="Kadra"
        title={
          <>
            Ludzie, którym{" "}
            <em className="text-[var(--color-sea)]">powierzasz</em> dziecko.
          </>
        }
        lead="Pedagożki specjalne, logopedka i terapeutka TUS. Dwie z nas są też mamami, więc wiemy, jak to jest zostawić dziecko w przedszkolu po raz pierwszy."
      />

      <section className="max-w-[1200px] mx-auto px-5 lg:px-10 pb-20">
        {staffData.members.map((member, i) => {
          const quals = (member.qualifications ?? []).filter((q) => q.trim());
          const paragraphs = toParagraphs(member.description);
          const [first, ...rest] = paragraphs;
          return (
            <article
              key={member.name}
              className="grid gap-8 md:grid-cols-[220px_minmax(0,1fr)] lg:grid-cols-[260px_minmax(0,1fr)] md:gap-12 lg:gap-16 py-14 lg:py-20 border-t border-[var(--color-line)]"
            >
              <div className="lg:sticky lg:top-28 lg:self-start max-w-[260px]">
                <PhotoSlot
                  image={member.image}
                  alt={`${member.name}, ${tidy(member.role).toLowerCase()}`}
                  shape="arch"
                  ratio="aspect-[4/5]"
                  initials={
                    member.image?.asset
                      ? undefined
                      : member.name
                          .split(" ")
                          .map((p) => p[0])
                          .join("")
                          .slice(0, 2)
                  }
                  motif={(["sun", "wave", "forest"] as const)[i % 3]}
                  sizes="260px"
                />
              </div>
              <div className="min-w-0">
                <h2 data-split className="t-display">
                  {member.name}
                </h2>
                <p className="mt-3 t-small max-w-[60ch]">{tidy(member.role)}</p>
                {first && (
                  <p className="mt-8 t-lead !text-[var(--color-ink)] max-w-[52ch]">
                    {first}
                  </p>
                )}
                <div className="mt-6 space-y-4 t-body max-w-[62ch] lg:columns-2 lg:gap-12 lg:max-w-none">
                  {rest.map((p) => (
                    <p key={p.slice(0, 24)} className="break-inside-avoid">
                      {p}
                    </p>
                  ))}
                </div>
                {quals.length > 0 && (
                  <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--color-ink-soft)]">
                    {quals.map((q) => (
                      <li key={q}>
                        <span
                          className="text-[var(--color-coral)] mr-2"
                          aria-hidden="true"
                        >
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

      <VisitCta
        heading={
          <>
            Poznaj nas <em className="text-[var(--color-sea)]">osobiście</em>.
          </>
        }
        text="Przyjdź z dzieckiem na spokojną wizytę. Porozmawiasz z nauczycielkami i zobaczysz, jak wygląda nasz dzień."
      />
    </>
  );
}
