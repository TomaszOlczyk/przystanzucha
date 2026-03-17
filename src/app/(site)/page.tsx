import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import { getSiteSettings } from "@/sanity/fetchers";

export default async function Home() {
  const siteData = await getSiteSettings();
  const benefits = [
    {
      icon: "👶",
      title: "Małe grupy",
      desc: "Maksymalnie 15 dzieci w grupie — każde dziecko dostaje pełną uwagę",
    },
    {
      icon: "🎓",
      title: "Wykwalifikowana kadra",
      desc: "Doświadczeni pedagodzy, psycholog i logopeda na miejscu",
    },
    {
      icon: "🌍",
      title: "Angielski codziennie",
      desc: "Codzienna nauka języka angielskiego przez zabawę i immersję",
    },
    {
      icon: "🎨",
      title: "10 dedykowanych zajęć",
      desc: "Robotyka, plastyka, muzyka, gimnastyka — w ramach czesnego",
    },
    {
      icon: "🏡",
      title: "Nowoczesna sala",
      desc: "Jedna przestrzeń, wiele możliwości — sensoryka, Montessori, multimedia",
    },
    {
      icon: "🥦",
      title: "Własna kuchnia",
      desc: "Świeże, zbilansowane posiłki przygotowywane codziennie na miejscu",
    },
  ];

  const stats = [
    { value: "150+", label: "Szczęśliwych dzieci" },
    { value: "15", label: "Lat doświadczenia" },
    { value: "10", label: "Zajęć w ramach czesnego" },
    { value: "98%", label: "Polecających rodziców" },
  ];

  return (
    <>
      {/* HERO — Lead magnet */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
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
                Najlepszy start
                <br />
                <span className="gradient-text">dla Twojego dziecka</span>
              </h1>

              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                Przedszkole prywatne w Łodzi, gdzie każde dziecko odkrywa swoje
                talenty w bezpiecznej, nowoczesnej przestrzeni.
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
                  Zapisz dziecko do przedszkola
                </h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  Zostaw kontakt — oddzwonimy w ciągu 24 godzin
                </p>
              </div>
              <ContactForm email={siteData.email} phone={siteData.phone} name={siteData.name} recruitmentYear={siteData.recruitmentYear} />
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
              Dlaczego rodzice wybierają{" "}
              <span className="gradient-text">{siteData.name}</span>?
            </h2>
            <p className="text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              Tworzymy miejsce, w którym każde dziecko czuje się bezpiecznie,
              rozwija się i odkrywa świat z radością
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

      {/* SOCIAL PROOF / TRUST */}
      <section className="py-16 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-strong rounded-3xl p-8 md:p-12 text-center">
            <div className="text-4xl mb-4">💬</div>
            <blockquote className="text-lg md:text-xl font-medium italic text-[var(--color-text)] leading-relaxed mb-6">
              &ldquo;Córka codziennie nie może się doczekać pójścia do
              przedszkola. Kadra jest wspaniała, a ilość dedykowanych zajęć w ramach czesnego
              to coś, czego nie znajdziecie nigdzie indziej w Łodzi.&rdquo;
            </blockquote>
            <div>
              <p className="font-bold">Katarzyna M.</p>
              <p className="text-sm text-[var(--color-text-secondary)]">
                Mama 4-letniej Zosi
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EXPLORE PAGES */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12">
            Poznaj nas bliżej
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/kadra",
                title: "Nasza kadra",
                desc: "Poznaj zespół doświadczonych pedagogów, psychologa i logopedę",
                gradient: "from-pink-400/20 to-purple-400/20",
                icon: "👩‍🏫",
              },
              {
                href: "/sale",
                title: "Nasza sala",
                desc: "Jedna przestrzeń z wieloma możliwościami — sensoryka, Montessori, multimedia",
                gradient: "from-purple-400/20 to-indigo-400/20",
                icon: "🏫",
              },
              {
                href: "/zajecia",
                title: "Zajęcia dla dzieci",
                desc: "10 dedykowanych zajęć w ramach czesnego — bez ukrytych opłat",
                gradient: "from-indigo-400/20 to-blue-400/20",
                icon: "🎯",
              },
            ].map((page) => (
              <Link
                key={page.href}
                href={page.href}
                className={`group glass-strong rounded-2xl p-8 card-hover text-center bg-gradient-to-br ${page.gradient}`}
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

      {/* BOTTOM CTA */}
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden" style={{ background: "var(--gradient-btn)" }}>
            <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                Daj swojemu dziecku najlepszy start
              </h2>
              <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                Zostaw kontakt — opowiemy Ci o naszym przedszkolu i zaprosimy
                na wizytę
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href="#kontakt"
                  className="px-8 py-4 rounded-full bg-white text-[var(--color-purple)] font-bold hover:bg-white/90 transition-all shadow-lg"
                >
                  Zapisz dziecko
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
