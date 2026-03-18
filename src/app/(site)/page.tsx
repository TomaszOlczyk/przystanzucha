import Link from "next/link";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import AnimatedWaves from "@/components/AnimatedWaves";
import { getSiteSettings } from "@/sanity/fetchers";

export default async function Home() {
  const siteData = await getSiteSettings();
  const benefits = siteData.benefits ?? [];
  const stats = siteData.stats ?? [];

  return (
    <>
      {/* HERO — Lead magnet */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background child photo — right side */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block pointer-events-none">
          <Image
            src="/images/hero-child.jpg"
            alt=""
            fill
            className="object-cover object-top"
            style={{ maskImage: "linear-gradient(to right, transparent 0%, black 25%)", WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%)" }}
            priority
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to right, var(--gradient-hero) 0%, rgba(252,231,243,0.3) 50%, rgba(237,233,254,0.2) 100%)" }} />
        </div>

        {/* Decorative glows */}
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-pink-300/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] rounded-full bg-purple-400/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 left-1/3 w-[500px] h-[500px] rounded-full bg-blue-400/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20 md:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="text-center lg:text-left">
              {siteData.recruitmentOpen && (
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-6">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="gradient-text">
                    Rekrutacja {siteData.recruitmentYear} trwa!
                  </span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                {siteData.heroHeading ?? "Najlepszy start"}
                <br />
                <span className="gradient-text">{siteData.heroSubheading ?? "dla Twojego dziecka"}</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {siteData.heroDescription ?? siteData.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <div className="text-2xl md:text-3xl font-extrabold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden lg:flex items-center gap-4">
                <Link
                  href="/sale"
                  className="px-6 py-3 rounded-full glass font-medium text-sm hover:bg-white/80 transition-all"
                >
                  Zobacz naszą salę
                </Link>
                <Link
                  href="/zajecia"
                  className="px-6 py-3 rounded-full glass font-medium text-sm hover:bg-white/80 transition-all"
                >
                  Dedykowane zajęcia
                </Link>
              </div>
            </div>

            {/* Right — Contact form */}
            <div id="kontakt">
              <div className="text-center mb-5">
                <h2 className="text-xl md:text-2xl font-bold mb-1">
                  {siteData.contactFormHeading ?? "Zapisz dziecko do przedszkola"}
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {siteData.contactFormSubheading ?? "Zostaw kontakt — oddzwonimy w ciągu 24 godzin"}
                </p>
              </div>
              <ContactForm email={siteData.email} phone={siteData.phone} name={siteData.name} recruitmentYear={siteData.recruitmentYear} />
            </div>
          </div>
        </div>
      </section>

      {/* Animated waves divider */}
      <AnimatedWaves />

      {/* BENEFITS */}
      {benefits.length > 0 && (
        <section className="py-20 md:py-28 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-14">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                {siteData.benefitsHeading ?? "Dlaczego rodzice wybierają"}{" "}
                <span className="gradient-text">{siteData.name}</span>?
              </h2>
              <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
                {siteData.benefitsSubheading ?? "Tworzymy miejsce, w którym każde dziecko czuje się bezpiecznie, rozwija się i odkrywa świat z radością"}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {benefits.map((b) => (
                <div
                  key={b.title}
                  className="glass-strong rounded-2xl p-6 card-hover"
                >
                  <div className="text-3xl mb-3">{b.icon}</div>
                  <h3 className="text-lg font-bold mb-1.5">{b.title}</h3>
                  <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {b.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SOCIAL PROOF / TRUST */}
      {siteData.testimonial && (
        <section className="py-16 relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
              <div className="text-4xl mb-4">💬</div>
              <blockquote className="text-lg md:text-xl font-medium italic text-[var(--color-text)] leading-relaxed mb-6">
                &ldquo;{siteData.testimonial.quote}&rdquo;
              </blockquote>
              <div>
                <p className="font-bold">{siteData.testimonial.author}</p>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {siteData.testimonial.role}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EXPLORE PAGES */}
      {(() => {
        const gradients = ["from-pink-400/20 to-purple-400/20", "from-purple-400/20 to-indigo-400/20", "from-indigo-400/20 to-blue-400/20"];
        const defaultCards = [
          { href: "/kadra", title: "Nasza kadra", desc: "Poznaj zespół doświadczonych pedagogów, psychologa i logopedę", icon: "👩‍🏫" },
          { href: "/sale", title: "Nasza sala", desc: "Jedna przestrzeń z wieloma możliwościami — sensoryka, Montessori, multimedia", icon: "🏫" },
          { href: "/zajecia", title: "Zajęcia dla dzieci", desc: "10 dedykowanych zajęć w ramach czesnego — bez ukrytych opłat", icon: "🎯" },
        ];
        const cards = siteData.exploreCards ?? defaultCards;
        return (
          <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
                {siteData.exploreHeading ?? "Poznaj nas bliżej"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {cards.map((page, i) => (
                  <Link
                    key={page.href}
                    href={page.href}
                    className={`group glass-strong rounded-2xl p-8 card-hover text-center bg-gradient-to-br ${gradients[i % gradients.length]}`}
                  >
                    <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                      {page.icon}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                    <p className="text-sm text-[var(--color-text-secondary)] mb-4">
                      {page.desc}
                    </p>
                    <span className="gradient-text font-semibold text-sm">
                      Dowiedz się więcej →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* BOTTOM CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden" style={{ background: "var(--gradient-btn)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                {siteData.ctaHeading ?? "Daj swojemu dziecku najlepszy start"}
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                {siteData.ctaDescription ?? "Zostaw kontakt — opowiemy Ci o naszym przedszkolu i zaprosimy na wizytę"}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#kontakt"
                  className="px-8 py-4 rounded-full bg-white text-[var(--color-purple)] font-bold hover:bg-white/90 transition-all shadow-lg"
                >
                  {siteData.ctaButtonText ?? "Zapisz dziecko"}
                </a>
                <a
                  href={`tel:${siteData.phone.replace(/\s/g, "")}`}
                  className="px-8 py-4 rounded-full border-2 border-white/40 text-white font-bold hover:bg-white/10 transition-all"
                >
                  Zadzwoń: {siteData.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
