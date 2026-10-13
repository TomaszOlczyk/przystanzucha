import type { Metadata } from "next";
import Image from "next/image";
import { getStaffPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";
import PageIntro, { VisitCta } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Kadra przedszkola — pedagodzy specjalni, logopeda",
  description:
    "Poznaj nauczycielki Przystani Zucha: pedagodzy specjalni, logopeda, terapeutka TUS. Doświadczenie w pracy z dziećmi w spektrum autyzmu. Łódź, Retkinia.",
  alternates: { canonical: "/kadra/" },
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default async function KadraPage() {
  const staffData = await getStaffPage();

  return (
    <>
      <PageIntro
        eyebrow="Nasza kadra"
        title={
          <>
            Ludzie, którym <span className="italic text-[var(--color-sea)]">powierzasz dziecko</span>
          </>
        }
        lead={staffData.subtitle?.match(/[^.!?]+[.!?]+/g)?.slice(0, 2).join(" ").trim()}
      />

      <section className="pb-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5">
          {staffData.members.map((member) => {
            const quals = (member.qualifications ?? []).filter((q) => q.trim());
            const paragraphs = member.description.split(/\n+/).map((p) => p.trim()).filter(Boolean);
            return (
              <article key={member.name} className="card p-6 md:p-10 grid md:grid-cols-[220px_1fr] gap-6 md:gap-10">
                <div>
                  {member.image?.asset ? (
                    <div className="relative w-36 h-36 md:w-full md:h-auto md:aspect-square rounded-[1.5rem] overflow-hidden">
                      <Image src={urlFor(member.image).width(480).height(480).url()} alt={`${member.name} — ${member.role}`} fill className="object-cover" />
                    </div>
                  ) : (
                    <div className="w-28 h-28 md:w-40 md:h-40 rounded-full bg-[var(--color-sea)] text-white font-display text-4xl md:text-5xl flex items-center justify-center" aria-hidden="true">
                      {initials(member.name)}
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-semibold">{member.name}</h2>
                  <p className="mt-1 font-bold text-[var(--color-sea-dark)]">{member.role.trim()}</p>
                  <div className="mt-4 space-y-3 leading-relaxed text-[var(--color-ink-soft)] max-w-3xl">
                    {paragraphs.map((p) => (
                      <p key={p.slice(0, 24)}>{p}</p>
                    ))}
                  </div>
                  {quals.length > 0 && (
                    <ul className="mt-5 flex flex-wrap gap-2">
                      {quals.map((q) => (
                        <li key={q} className="rounded-full bg-[var(--color-foam)] px-3 py-1 text-sm font-semibold text-[var(--color-sea-dark)]">
                          {q}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <VisitCta heading="Poznaj nas osobiście" text="Przyjdź z dzieckiem na spokojną wizytę — porozmawiasz z nauczycielkami i zobaczysz, jak wygląda nasz dzień." />
    </>
  );
}
