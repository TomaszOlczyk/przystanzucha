import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import PhotoSlot from "@/components/PhotoSlot";
import { getSiteSettings, getStaffPage, getActivitiesPage, getClassroomsPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";
import { bioHighlight, tidy } from "@/lib/copy";
import { hero, groups, reasons, story, faq, contact, gallery as galleryCopy, SITE_URL } from "@/content/home";

export const metadata: Metadata = {
  title: { absolute: "Przedszkole Montessori Łódź Retkinia — kameralne grupy | Przystań Zucha" },
  description:
    "Kameralne przedszkole z elementami Montessori na Retkini (ul. Maratońska 49C). Dwie małe grupy, adaptacja z rodzicem, 10 zajęć w czesnym. Umów wizytę.",
  alternates: { canonical: "/" },
};

const SALA_IMG = "image-9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072-jpg";
const WRAP = "max-w-[1200px] mx-auto px-5 lg:px-10";

const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .join("")
    .slice(0, 2);

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className="t-label mb-4">
      <span className="inline-block w-6 h-[1.5px] bg-[var(--color-coral)]" aria-hidden="true" />
      {children}
    </p>
  );
}

export default async function Home() {
  const [siteData, staff, activities, rooms] = await Promise.all([getSiteSettings(), getStaffPage(), getActivitiesPage(), getClassroomsPage()]);
  const tel = siteData.phone.replace(/\s/g, "");
  const heroSrc = siteData.heroImage?.asset
    ? urlFor(siteData.heroImage).width(900).height(1200).fit("crop").crop("top").auto("format").url()
    : "/images/hero-child.jpg";
  const salaSrc = urlFor({ asset: { _ref: SALA_IMG } }).width(1200).height(900).auto("format").url();
  const activityNames = (activities?.activities ?? []).map((a) => a.name.toLowerCase());
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${siteData.name}, ${siteData.address.street}, ${siteData.address.city}`)}`;
  const galleryImages = siteData.gallery ?? [];

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
      <section className={`${WRAP} pt-8 pb-16 lg:pt-14 lg:pb-24 grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 items-center`}>
        <div>
          {siteData.recruitmentOpen && (
            <p data-hero="fade" className="inline-flex items-center gap-2.5 rounded-full bg-white/70 border border-[var(--color-line)] px-4 py-2 text-[0.92rem] font-semibold">
              <span className="w-2 h-2 rounded-full bg-[var(--color-coral)] pulse-dot" aria-hidden="true" />
              {hero.badge}
            </p>
          )}
          <h1 data-hero="title" className="t-hero mt-6">
            Mała przystań dla{" "}
            <span className="relative inline-block z-0">
              <em className="not-italic text-[var(--color-sea)]">dużych</em>
              <svg viewBox="0 0 300 40" preserveAspectRatio="none" className="absolute -left-[3%] top-[62%] w-[106%] h-[34%] -z-10 overflow-visible" aria-hidden="true">
                <path data-draw="hero" d="M4 24 C 70 10, 140 34, 210 18 S 290 20, 296 24" stroke="#f3c35a" strokeWidth="22" fill="none" strokeLinecap="round" opacity=".75" />
              </svg>
            </span>{" "}
            uczuć.
          </h1>
          <p data-hero="fade" className="mt-6 t-lead max-w-[40ch]">
            {hero.lead}
          </p>
          <div data-hero="fade" className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <a href="#kontakt" data-cta="umow_wizyte" data-loc="hero" className="btn btn-primary">
              {hero.primaryCta} <span className="arr">→</span>
            </a>
            <a href={`tel:${tel}`} data-loc="hero" className="link-u">
              {siteData.phone}
            </a>
          </div>
          <p data-hero="fade" className="mt-8 t-small">
            {siteData.address.street}, Łódź Retkinia · pn–pt 7:00–17:00
          </p>
        </div>

        <div className="relative w-full max-w-[540px] justify-self-center aspect-[1/1.02]">
          <figure data-photo className="print absolute left-[3%] top-[3%] w-[60%] h-[74%] !p-2.5 rounded-t-full rounded-b-md">
            <div className="relative w-full h-full rounded-t-full rounded-b-sm overflow-hidden">
              <Image src={heroSrc} alt="Uśmiechnięta przedszkolaczka Przystani Zucha" fill priority sizes="(min-width: 1024px) 26vw, 56vw" className="object-cover object-[50%_18%]" />
            </div>
          </figure>
          <figure data-photo className="print absolute right-0 bottom-[6%] w-[50%] h-[40%] rotate-[4deg]">
            <div className="relative w-full h-full overflow-hidden">
              <Image src={salaSrc} alt="Sala Morska z muralem wieloryba i dywanem w morskie fale" fill sizes="(min-width: 1024px) 22vw, 46vw" className="object-cover" />
            </div>
          </figure>
          <a href="#grupy" data-hero="pop" aria-label="Grupa 2: trwa nabór" className="absolute right-[4%] top-[3%] w-[118px] h-[118px] sm:w-[132px] sm:h-[132px]">
            <svg data-spin viewBox="0 0 132 132" className="absolute inset-0 w-full h-full" aria-hidden="true">
              <defs>
                <path id="badge-circle" d="M66 66 m-54 0 a54 54 0 1 1 108 0 a54 54 0 1 1 -108 0" />
              </defs>
              <text fontFamily="var(--font-body)" fontWeight="700" fontSize="11.5" letterSpacing="2.6" fill="#16252e">
                <textPath href="#badge-circle">trwa nabór · grupa 2 · trwa nabór · grupa 2 ·</textPath>
              </text>
            </svg>
            <span className="absolute inset-[26px] rounded-full bg-[var(--color-coral)] text-white grid place-items-center font-display text-3xl">2</span>
          </a>
          <svg data-bob viewBox="0 0 110 80" className="absolute -left-[2%] bottom-[2%] w-[96px] sm:w-[110px]" fill="none" stroke="#16252e" strokeWidth="1.6" strokeLinecap="round" aria-hidden="true">
            <path data-draw="hero" d="M55 8v42M55 10 25 46h30M59 16v30h24C79 31 70 21 59 16M15 52h80l-10 13H26zM4 74c9-4 15 4 24 0s15 4 24 0 15 4 24 0 15 4 24 0" />
          </svg>
        </div>
      </section>

      {/* ZAJĘCIA W CZESNYM — pas */}
      {activityNames.length > 0 && (
        <div className="border-y border-[var(--color-line)] py-4 overflow-hidden whitespace-nowrap bg-white/40">
          <p className="sr-only">Zajęcia w ramach czesnego: {activityNames.join(", ")}.</p>
          <div className="marquee-track inline-flex gap-10 font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-none text-[var(--color-ink-soft)]" aria-hidden="true">
            {[...activityNames, ...activityNames].map((name, i) => (
              <span key={i} className="inline-flex items-center gap-10">
                <span>{name}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-coral)]" />
              </span>
            ))}
          </div>
        </div>
      )}

      {/* GRUPY */}
      <section id="grupy" className={`${WRAP} py-20 lg:py-28`}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <Label>Nasze grupy</Label>
            <h2 data-split className="t-display">Dwie sale, dwie małe grupy.</h2>
          </div>
          <p className="t-lead max-w-[46ch]">{groups.lead}</p>
        </div>
        <div data-stagger className="mt-14 grid gap-14 md:grid-cols-2 md:gap-10">
          {groups.items.map((g, i) => (
            <article key={g.tag}>
              <PhotoSlot
                src={i === 0 ? salaSrc : undefined}
                image={i === 1 ? rooms?.forestRoom?.image : undefined}
                alt={i === 0 ? "Sala Morska: mural z wielorybem i dywan w morskie fale" : "Sala Leśna"}
                motif={i === 0 ? "wave" : "forest"}
                ratio="aspect-[4/3]"
                sizes="(min-width: 768px) 45vw, 92vw"
              />
              <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="t-label">{g.tag}</span>
                <span
                  className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[0.85rem] font-semibold ${
                    g.highlight ? "bg-[var(--color-coral-light)] text-[var(--color-coral-dark)]" : "bg-white/70 text-[var(--color-ink-soft)] border border-[var(--color-line)]"
                  }`}
                >
                  {g.highlight && <span className="w-1.5 h-1.5 rounded-full bg-current pulse-dot" aria-hidden="true" />}
                  {g.status}
                </span>
              </div>
              <h3 className="mt-3 t-title max-w-[24ch]">{g.title}</h3>
              <p className="mt-3 t-body max-w-[52ch]">{g.text}</p>
              {g.highlight && (
                <a href="#kontakt" data-cta="grupa_2" data-loc="grupy" className="inline-block mt-5 link-u">
                  Opowiedz nam o dziecku →
                </a>
              )}
            </article>
          ))}
        </div>
        <p className="mt-14 t-body max-w-[70ch] border-t border-[var(--color-line)] pt-6">
          {groups.specialists}{" "}
          <Link href="/kadra/" className="link-u text-[var(--color-ink)]">
            Poznaj zespół
          </Link>
        </p>
      </section>

      {/* ADAPTACJA */}
      <section id="adaptacja" className="bg-[var(--color-paper-deep)]/60">
        <div className={`${WRAP} py-20 lg:py-28`}>
          <div className="max-w-[640px]">
            <Label>Adaptacja</Label>
            <h2 data-split className="t-display">
              {story.heading} {story.headingAccent}.
            </h2>
            <p className="mt-5 t-lead">{story.intro}</p>
          </div>
          <div data-draw-root className="relative mt-14">
            <svg viewBox="0 0 1000 30" preserveAspectRatio="none" className="hidden lg:block absolute left-0 right-0 top-[2px] w-full h-[30px] overflow-visible" aria-hidden="true">
              <path data-draw="scroll" d="M10 15 C 120 0, 180 30, 260 15 S 420 0, 500 15 S 660 30, 740 15 S 900 0, 990 15" stroke="#22676c" strokeWidth="2" fill="none" />
            </svg>
            <svg viewBox="0 0 30 1000" preserveAspectRatio="none" className="lg:hidden absolute left-[2px] top-[17px] w-[30px] h-[calc(100%-34px)] overflow-visible" aria-hidden="true">
              <path data-draw="scroll" d="M15 0 C 0 120, 30 200, 15 330 S 0 520, 15 660 S 30 860, 15 1000" stroke="#22676c" strokeWidth="2" fill="none" vectorEffect="non-scaling-stroke" />
            </svg>
            <ol data-stagger className="relative grid gap-9 lg:grid-cols-5 lg:gap-7">
              {story.days.map((d, i) => (
                <li key={d.day} className="relative pl-14 lg:pl-0">
                  <span
                    className={`absolute left-0 top-0 lg:relative w-[34px] h-[34px] rounded-full border-[1.5px] grid place-items-center text-[0.75rem] font-bold ${
                      i === story.days.length - 1 ? "bg-[var(--color-sea)] border-[var(--color-sea)] text-white" : "bg-[var(--color-paper)] border-[var(--color-ink)]"
                    }`}
                  >
                    {d.day}
                  </span>
                  <h3 className="mt-1 lg:mt-5 t-title">{d.title}</h3>
                  <p className="mt-2 t-body max-w-[28ch]">{d.text}</p>
                </li>
              ))}
            </ol>
          </div>
          <p className="mt-14 t-quote text-[var(--color-sea-dark)] max-w-[44ch]">{story.closing}</p>
          <p className="mt-2 t-small">{story.note}</p>
        </div>
      </section>

      {/* DZIEŃ W PRZYSTANI — galeria (miejsca na zdjęcia z Sanity) */}
      <section className={`${WRAP} py-20 lg:py-28`}>
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
          <div>
            <Label>Zwykły dzień</Label>
            <h2 data-split className="t-display">Dzień w Przystani.</h2>
          </div>
          <p className="t-lead max-w-[46ch]">{galleryCopy.lead}</p>
        </div>
        <div data-stagger className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-start">
          {galleryCopy.items.map((item, i) => {
            const img = galleryImages[i];
            return (
              <PhotoSlot
                key={item.caption}
                image={img}
                alt={img?.alt ?? item.caption}
                caption={img?.caption ?? item.caption}
                motif={item.motif}
                ratio={i % 2 ? "aspect-[4/5]" : "aspect-[3/4]"}
                className={i % 2 ? "lg:mt-14" : ""}
                sizes="(min-width: 1024px) 24vw, 45vw"
              />
            );
          })}
        </div>
      </section>

      {/* OPINIA */}
      {siteData.testimonial && (
        <section className="bg-[var(--color-ink)] text-[var(--color-paper)]">
          <figure className="max-w-[1000px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
            <span className="block font-display text-[5.5rem] leading-[0.5] text-[var(--color-sun)]" aria-hidden="true">
              “
            </span>
            <blockquote data-split className="mt-6 t-quote-lg max-w-[42ch]">
              {tidy(siteData.testimonial.quote)}
            </blockquote>
            <figcaption className="mt-8 text-[0.95rem] text-[var(--color-paper)]/70">
              {siteData.testimonial.author}, {siteData.testimonial.role.toLowerCase()}
            </figcaption>
          </figure>
        </section>
      )}

      {/* DLACZEGO */}
      <section className={`${WRAP} py-20 lg:py-28`}>
        <div className="max-w-[720px]">
          <Label>Dlaczego my</Label>
          <h2 data-split className="t-display">Tu dziecko nie musi być gotowe od pierwszego dnia.</h2>
        </div>
        <div data-stagger className="mt-14 grid gap-10 md:grid-cols-3 md:gap-12">
          {reasons.items.map((r) => (
            <div key={r.title} className="border-t-2 border-[var(--color-coral)] pt-6">
              <h3 className="t-title">{r.title}</h3>
              <p className="mt-3 t-body">{r.text}</p>
            </div>
          ))}
        </div>
        {activityNames.length > 0 && (
          <p className="mt-12 t-body">
            W ramach czesnego: {activityNames.length} zajęć bez dopłat.{" "}
            <Link href="/zajecia/" className="link-u text-[var(--color-ink)]">
              Zobacz plan zajęć
            </Link>
          </p>
        )}
      </section>

      {/* KADRA */}
      {staff?.members?.length > 0 && (
        <section className="bg-[var(--color-paper-deep)]/60">
          <div className={`${WRAP} py-20 lg:py-28`}>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-16 lg:items-end">
              <div>
                <Label>Kadra</Label>
                <h2 data-split className="t-display">Ludzie, którym powierzasz dziecko.</h2>
              </div>
              <p className="t-lead max-w-[46ch]">{groups.staffLead}</p>
            </div>
            <div data-stagger className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
              {staff.members.slice(0, 3).map((m) => (
                <article key={m.name}>
                  <PhotoSlot image={m.image} alt={m.name} shape="arch" ratio="aspect-[1/1]" initials={m.image?.asset ? undefined : initials(m.name)} motif="book" className="max-w-[300px]" sizes="(min-width: 768px) 300px, 90vw" />
                  <h3 className="mt-6 t-title">{m.name}</h3>
                  <p className="mt-1 t-small">{tidy(m.role)}</p>
                  <p className="mt-4 t-body">„{bioHighlight(m.description)}”</p>
                </article>
              ))}
            </div>
            <Link href="/kadra/" className="mt-12 inline-block link-u">
              Poznaj cały zespół →
            </Link>
          </div>
        </section>
      )}

      {/* PYTANIA */}
      <section id="pytania" className={`${WRAP} py-20 lg:py-28 grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Label>Pytania rodziców</Label>
          <h2 data-split className="t-display">Zanim zadzwonisz.</h2>
          <p className="mt-5 t-body max-w-[36ch]">
            Nie ma tu odpowiedzi na Twoje pytanie? Zadzwoń:{" "}
            <a href={`tel:${tel}`} data-loc="faq" className="link-u text-[var(--color-ink)]">
              {siteData.phone}
            </a>
          </p>
        </div>
        <div className="border-t border-[var(--color-ink)]">
          {faq.map((f) => (
            <details key={f.q} className="group border-b border-[var(--color-line)]">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="t-title">{f.q}</span>
                <span className="relative w-5 h-5 shrink-0" aria-hidden="true">
                  <span className="absolute left-0 right-0 top-1/2 h-[1.5px] bg-[var(--color-ink)]" />
                  <span className="absolute top-0 bottom-0 left-1/2 w-[1.5px] bg-[var(--color-ink)] transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <p className="pb-6 -mt-1 max-w-[60ch] t-body">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-[var(--color-paper-deep)]/60">
        <div className={`${WRAP} py-20 lg:py-28 grid gap-14 lg:grid-cols-2 lg:gap-16`}>
          <div>
            <Label>Wizyta</Label>
            <h2 data-split className="t-display max-w-[16ch]">Przyjdź z dzieckiem i zobacz, jak u nas jest.</h2>
            <p className="mt-6 t-lead max-w-[42ch]">{contact.lead}</p>
            <dl className="mt-10 grid gap-6">
              <div>
                <dt className="t-small">Telefon</dt>
                <dd className="mt-1">
                  <a href={`tel:${tel}`} data-loc="kontakt" className="t-title !text-[1.9rem]">
                    {siteData.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-small">Adres</dt>
                <dd className="mt-1 t-body !text-[var(--color-ink)]">
                  {siteData.address.street}, {siteData.address.zip} {siteData.address.city} (Retkinia).{" "}
                  <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="link-u">
                    Wyznacz trasę
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-small">Godziny</dt>
                <dd className="mt-1 t-body !text-[var(--color-ink)]">{siteData.hours}</dd>
              </div>
            </dl>
          </div>
          <ContactForm email={siteData.email} phone={siteData.phone} recruitmentYear={siteData.recruitmentYear} />
        </div>
      </section>
    </>
  );
}
