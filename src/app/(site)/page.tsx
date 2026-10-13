import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import Wave from "@/components/Wave";
import { Icon } from "@/components/Icons";
import { PhoneIcon } from "@/components/Navbar";
import { getSiteSettings, getStaffPage, getActivitiesPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";
import { hero, groups, reasons, story, faq, contact, SITE_URL } from "@/content/home";

export const metadata: Metadata = {
  title: { absolute: "Przedszkole Montessori Łódź Retkinia — kameralne grupy | Przystań Zucha" },
  description:
    "Kameralne przedszkole z elementami Montessori na Retkini (ul. Maratońska 49C). Dwie małe grupy, adaptacja z rodzicem, 10 zajęć w czesnym. Umów wizytę.",
  alternates: { canonical: "/" },
};

const SALA_IMG = "image-9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072-jpg";

/** Najbardziej „ludzkie” zdanie z bio (rodzicielstwo, doświadczenie, pasja), max ~200 znaków. */
const KEY_PHRASES = ["mamą", "doświadczeni", "spektrum", "pasj"];
const bioHighlight = (text: string) => {
  const sentences = (text.replace(/\s+/g, " ").match(/[^.!?]+[.!?]+/g) ?? [text])
    .map((s) => s.trim().replace(/^Cześć[,!]?\s*/i, ""))
    .filter((s) => s.length > 30 && s.length <= 200);
  const pick = sentences.find((s) => KEY_PHRASES.some((k) => s.includes(k))) ?? sentences[0] ?? text.slice(0, 180);
  return pick.charAt(0).toUpperCase() + pick.slice(1);
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

export default async function Home() {
  const [siteData, staff, activities] = await Promise.all([getSiteSettings(), getStaffPage(), getActivitiesPage()]);
  const tel = siteData.phone.replace(/\s/g, "");
  const heroSrc = siteData.heroImage?.asset
    ? urlFor(siteData.heroImage).width(1000).height(1200).fit("crop").crop("top").auto("format").url()
    : "/images/hero-child.jpg";
  const salaSrc = urlFor({ asset: { _ref: SALA_IMG } }).width(1400).height(1050).auto("format").url();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Preschool",
      "@id": `${SITE_URL}/#przedszkole`,
      name: siteData.name,
      url: SITE_URL,
      telephone: siteData.phone,
      email: siteData.email,
      image: salaSrc,
      description: metadata.description,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteData.address.street,
        postalCode: siteData.address.zip,
        addressLocality: siteData.address.city,
        addressRegion: "łódzkie",
        addressCountry: "PL",
      },
      areaServed: "Łódź, Retkinia",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "07:00",
        closes: "17:00",
      },
      sameAs: [siteData.social.facebook, siteData.social.instagram].filter(Boolean),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* HERO */}
      <section className="relative pt-6 md:pt-14 pb-10 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center">
          <div>
            {siteData.recruitmentOpen && (
              <p className="inline-flex items-center gap-2 rounded-full bg-white border border-[var(--color-line)] px-3.5 py-1.5 text-sm font-bold text-[var(--color-sea-dark)] mb-5">
                <span className="w-2 h-2 rounded-full bg-[var(--color-coral)]" aria-hidden="true" />
                {hero.badge}
              </p>
            )}
            <h1 className="text-[2.35rem] leading-[1.08] sm:text-5xl lg:text-[3.6rem] font-semibold">
              {hero.heading} <span className="italic text-[var(--color-sea)]">{hero.headingAccent}</span>
            </h1>
            <p className="mt-5 text-lg md:text-xl leading-relaxed text-[var(--color-ink-soft)] max-w-xl">{hero.lead}</p>
            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <a href="#kontakt" data-cta="umow_wizyte" data-loc="hero" className="btn btn-primary text-lg">
                {hero.primaryCta}
              </a>
              <a href={`tel:${tel}`} data-loc="hero" className="btn btn-secondary text-lg">
                <PhoneIcon className="w-5 h-5" /> {siteData.phone}
              </a>
            </div>
            <ul className="mt-7 flex flex-wrap gap-2" aria-label="Najważniejsze informacje">
              {hero.chips.map((chip) => (
                <li key={chip} className="inline-flex items-center gap-1.5 rounded-full bg-[var(--color-foam)] px-3 py-1.5 text-sm font-semibold text-[var(--color-sea-dark)]">
                  <Icon name="check" className="w-4 h-4" /> {chip}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] lg:aspect-[5/6] rounded-[2rem] lg:rounded-[46%_54%_42%_58%/52%_44%_56%_48%] overflow-hidden bg-[var(--color-sea-light)] shadow-[0_30px_80px_-40px_rgba(20,50,74,0.6)]">
              <Image
                src={heroSrc}
                alt="Uśmiechnięta dziewczynka — przedszkolaczka Przystani Zucha"
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 92vw"
                className="object-cover object-[50%_20%]"
              />
            </div>
            <div className="absolute -bottom-5 left-4 lg:-left-6 card px-4 py-3 shadow-lg flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-[var(--color-coral-light)] text-[var(--color-coral-dark)] flex items-center justify-center">
                <Icon name="hands" className="w-5 h-5" />
              </span>
              <span className="text-sm leading-tight">
                <strong className="block">Grupa 2 — nowość</strong>
                <span className="text-[var(--color-muted)]">dla dzieci, które potrzebują więcej uwagi</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* GRUPY */}
      <Wave fill="var(--color-foam)" animate />
      <section id="grupy" className="bg-[var(--color-foam)] py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">{groups.eyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-[2.6rem] leading-tight font-semibold">{groups.heading}</h2>
            <p className="mt-4 text-lg text-[var(--color-ink-soft)]">{groups.lead}</p>
          </div>

          <div className="mt-10 grid md:grid-cols-2 gap-5">
            {groups.items.map((g) => (
              <article
                key={g.tag}
                className={`rounded-[1.75rem] p-7 md:p-9 flex flex-col ${
                  g.highlight ? "bg-[var(--color-sea-dark)] text-white" : "bg-white border border-[var(--color-line)]"
                }`}
              >
                <p className={`text-sm font-extrabold uppercase tracking-wider ${g.highlight ? "text-[var(--color-sun)]" : "text-[var(--color-sea)]"}`}>{g.tag}</p>
                <h3 className="mt-3 text-2xl md:text-[1.75rem] leading-snug font-semibold">{g.title}</h3>
                <p className={`mt-3 leading-relaxed ${g.highlight ? "text-white/85" : "text-[var(--color-ink-soft)]"}`}>{g.text}</p>
                <div className="mt-auto pt-6 flex flex-wrap items-center gap-3">
                  <span
                    className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-bold ${
                      g.highlight ? "bg-white/15 text-white" : "bg-[var(--color-foam)] text-[var(--color-sea-dark)]"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${g.highlight ? "bg-[var(--color-sun)]" : "bg-[var(--color-sea)]"}`} aria-hidden="true" />
                    {g.status}
                  </span>
                  {g.highlight && (
                    <a href="#kontakt" data-cta="grupa_2" data-loc="grupy" className="inline-flex items-center gap-1.5 font-bold text-white underline underline-offset-4">
                      Opowiedz nam o dziecku <Icon name="arrow" className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <p className="mt-6 text-[var(--color-ink-soft)] max-w-3xl">
            {groups.specialists}{" "}
            <Link href="/kadra/" className="font-bold text-[var(--color-sea-dark)] underline underline-offset-4">
              Poznaj zespół
            </Link>
          </p>
        </div>
      </section>
      <Wave fill="var(--color-sand)" className="bg-[var(--color-foam)]" />

      {/* POWODY */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="eyebrow">{reasons.eyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-[2.6rem] leading-tight font-semibold">{reasons.heading}</h2>
          </div>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {reasons.items.map((r) => (
              <div key={r.title} className="card p-7">
                <span className="w-12 h-12 rounded-2xl bg-[var(--color-sea-light)] text-[var(--color-sea-dark)] flex items-center justify-center">
                  <Icon name={r.icon} />
                </span>
                <h3 className="mt-5 text-xl font-semibold">{r.title}</h3>
                <p className="mt-2 leading-relaxed text-[var(--color-ink-soft)]">{r.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HISTORIA: PIERWSZY TYDZIEŃ */}
      <section className="pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center bg-white rounded-[2rem] border border-[var(--color-line)] p-5 md:p-8 lg:p-10">
            <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden">
              <Image src={salaSrc} alt="Sala Przystani Zucha w morskim klimacie: mural z wielorybem, dywan-fala i stoliki dla dzieci" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
            <div className="lg:pr-4">
              <p className="eyebrow">{story.eyebrow}</p>
              <h2 className="mt-2 text-3xl md:text-4xl leading-tight font-semibold">{story.heading}</h2>
              <div className="mt-5 space-y-4 text-lg leading-relaxed text-[var(--color-ink-soft)]">
                {story.paragraphs.map((p) => (
                  <p key={p.slice(0, 20)}>{p}</p>
                ))}
              </div>
              <p className="mt-5 font-display text-xl italic text-[var(--color-sea-dark)]">{story.closing}</p>
              <p className="mt-3 text-xs text-[var(--color-muted)]">{story.note}</p>
              <a href="#kontakt" data-cta="umow_wizyte" data-loc="historia" className="btn btn-primary mt-6">
                Umów wizytę i zobacz salę
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* KADRA */}
      {staff?.members?.length > 0 && (
        <section className="py-14 md:py-20 bg-[var(--color-sand-deep)]/60">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <div className="max-w-2xl">
                <p className="eyebrow">Kadra</p>
                <h2 className="mt-2 text-3xl md:text-[2.6rem] leading-tight font-semibold">Ludzie, którym powierzasz dziecko</h2>
              </div>
              <Link href="/kadra/" className="inline-flex items-center gap-1.5 font-bold text-[var(--color-sea-dark)] underline underline-offset-4">
                Poznaj cały zespół <Icon name="arrow" className="w-4 h-4" />
              </Link>
            </div>
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {staff.members.slice(0, 3).map((m) => (
                <article key={m.name} className="card p-7">
                  <div className="flex items-center gap-4">
                    {m.image?.asset ? (
                      <Image src={urlFor(m.image).width(160).height(160).url()} alt={m.name} width={64} height={64} className="w-16 h-16 shrink-0 rounded-full object-cover" />
                    ) : (
                      <span className="w-16 h-16 shrink-0 rounded-full bg-[var(--color-sea)] text-white font-display text-xl flex items-center justify-center" aria-hidden="true">
                        {initials(m.name)}
                      </span>
                    )}
                    <div>
                      <h3 className="text-xl font-semibold leading-tight">{m.name}</h3>
                      <p className="text-sm text-[var(--color-muted)] mt-0.5 line-clamp-2">{m.role}</p>
                    </div>
                  </div>
                  <p className="mt-5 leading-relaxed text-[var(--color-ink-soft)]">„{bioHighlight(m.description)}”</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ZAJĘCIA W CZESNYM */}
      {activities?.activities?.length > 0 && (
        <section className="py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-14 items-start">
            <div>
              <p className="eyebrow">W ramach czesnego</p>
              <h2 className="mt-2 text-3xl md:text-[2.6rem] leading-tight font-semibold">
                {activities.activities.length} zajęć bez dopłat
              </h2>
              <p className="mt-4 text-lg text-[var(--color-ink-soft)]">
                Nie musisz wozić dziecka na zajęcia po południu. Angielski, rytmika czy logopedia odbywają się w przedszkolu, w ramach czesnego.
              </p>
              <Link href="/zajecia/" className="mt-5 inline-flex items-center gap-1.5 font-bold text-[var(--color-sea-dark)] underline underline-offset-4">
                Plan zajęć <Icon name="arrow" className="w-4 h-4" />
              </Link>
            </div>
            <ul className="grid sm:grid-cols-2 gap-3">
              {activities.activities.map((a) => (
                <li key={a.name} className="card px-5 py-4 flex items-center justify-between gap-3">
                  <span className="font-bold">{a.name}</span>
                  <span className="text-sm text-[var(--color-muted)] text-right shrink-0">{a.frequency}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* OPINIA */}
      {siteData.testimonial && (
        <section className="pb-14 md:pb-20">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <figure className="relative rounded-[2rem] bg-[var(--color-ink)] text-white px-7 py-10 md:px-14 md:py-14">
              <span className="absolute -top-6 left-8 font-display text-8xl leading-none text-[var(--color-sun)]" aria-hidden="true">
                “
              </span>
              <blockquote className="font-display text-xl md:text-2xl leading-relaxed">{siteData.testimonial.quote.trim()}</blockquote>
              <figcaption className="mt-6 text-white/75">
                <strong className="text-white">{siteData.testimonial.author}</strong> · {siteData.testimonial.role}
              </figcaption>
            </figure>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section id="pytania" className="py-14 md:py-20 bg-[var(--color-foam)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="eyebrow">Pytania rodziców</p>
          <h2 className="mt-2 text-3xl md:text-[2.6rem] leading-tight font-semibold">Zanim zadzwonisz</h2>
          <div className="mt-8 space-y-3">
            {faq.map((f) => (
              <details key={f.q} className="group card px-6 py-1 open:pb-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="w-8 h-8 shrink-0 rounded-full bg-[var(--color-foam)] text-[var(--color-sea-dark)] flex items-center justify-center text-xl transition-transform group-open:rotate-45" aria-hidden="true">
                    +
                  </span>
                </summary>
                <p className="leading-relaxed text-[var(--color-ink-soft)]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-[1fr_1fr] gap-10 lg:gap-14 items-start">
          <div>
            <p className="eyebrow">{contact.eyebrow}</p>
            <h2 className="mt-2 text-3xl md:text-[2.6rem] leading-tight font-semibold">{contact.heading}</h2>
            <p className="mt-4 text-lg text-[var(--color-ink-soft)]">{contact.lead}</p>
            <ul className="mt-8 space-y-5">
              <li className="flex gap-4">
                <span className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-coral-light)] text-[var(--color-coral-dark)] flex items-center justify-center">
                  <PhoneIcon />
                </span>
                <span>
                  <span className="block text-sm text-[var(--color-muted)]">Wolisz porozmawiać od razu?</span>
                  <a href={`tel:${tel}`} data-loc="kontakt" className="text-2xl font-extrabold text-[var(--color-ink)] hover:text-[var(--color-sea-dark)]">
                    {siteData.phone}
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-sea-light)] text-[var(--color-sea-dark)] flex items-center justify-center">
                  <Icon name="pin" className="w-5 h-5" />
                </span>
                <span>
                  <span className="block font-bold">
                    {siteData.address.street}, {siteData.address.zip} {siteData.address.city}
                  </span>
                  <span className="block text-[var(--color-muted)]">Osiedle Retkinia</span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteData.name}, ${siteData.address.street}, ${siteData.address.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-[var(--color-sea-dark)] underline underline-offset-4"
                  >
                    Wyznacz trasę
                  </a>
                </span>
              </li>
              <li className="flex gap-4">
                <span className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-sea-light)] text-[var(--color-sea-dark)] flex items-center justify-center">
                  <Icon name="clock" className="w-5 h-5" />
                </span>
                <span className="self-center font-bold">{siteData.hours}</span>
              </li>
            </ul>
          </div>
          <ContactForm email={siteData.email} phone={siteData.phone} recruitmentYear={siteData.recruitmentYear} />
        </div>
      </section>
    </>
  );
}
