import Link from "next/link";
import ContactForm from "@/components/ContactForm";
import siteData from "@/content/site.json";
import activitiesData from "@/content/activities.json";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[var(--color-accent-yellow)]/30 via-[var(--color-bg)] to-[var(--color-secondary)]/20 py-20 md:py-32">
        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[var(--color-accent-pink)]/20 rounded-full blur-xl animate-float" />
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-[var(--color-accent-yellow)]/30 rounded-full blur-xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[var(--color-secondary)]/20 rounded-full blur-lg animate-float-delayed" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center gap-3 mb-6">
              <span className="text-5xl animate-float">🌈</span>
              <span className="text-5xl animate-float-delayed">🎨</span>
              <span className="text-5xl animate-float">⭐</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 leading-tight">
              Witaj w{" "}
              <span className="gradient-text">{siteData.name}</span>
              <span className="text-4xl md:text-6xl">!</span>
            </h1>

            <p className="text-lg md:text-xl text-[var(--color-text-light)] mb-8 max-w-2xl mx-auto leading-relaxed">
              {siteData.description}
            </p>

            {siteData.recruitmentOpen && (
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[var(--color-accent-pink)]/15 text-[var(--color-accent-pink)] font-semibold text-sm mb-8">
                <span className="w-2 h-2 bg-[var(--color-accent-pink)] rounded-full animate-pulse" />
                Rekrutacja {siteData.recruitmentYear} otwarta!
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="#rekrutacja"
                className="px-8 py-4 rounded-full bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[var(--color-primary-light)] transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
              >
                Zapisz dziecko ✨
              </Link>
              <Link
                href="/sale"
                className="px-8 py-4 rounded-full bg-white text-[var(--color-text)] font-bold text-lg hover:bg-gray-50 transition-all shadow-md border border-gray-100"
              >
                Poznaj nasze sale 🏫
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Dlaczego <span className="gradient-text">{siteData.name}</span>?
          </h2>
          <p className="text-center text-[var(--color-text-light)] mb-12 max-w-2xl mx-auto">
            Tworzymy miejsce, w którym każde dziecko czuje się bezpiecznie, rozwija się i odkrywa świat
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🎯",
                title: "Indywidualne podejście",
                desc: "Małe grupy pozwalają nam poświęcić uwagę każdemu dziecku",
                color: "var(--color-primary)",
              },
              {
                icon: "👩‍🏫",
                title: "Wykwalifikowana kadra",
                desc: "Doświadczeni pedagodzy z pasją do pracy z dziećmi",
                color: "var(--color-secondary)",
              },
              {
                icon: "🏠",
                title: "Nowoczesne sale",
                desc: "Kolorowe, bezpieczne przestrzenie wyposażone w najlepsze materiały",
                color: "var(--color-accent-pink)",
              },
              {
                icon: "📚",
                title: "Bogaty program",
                desc: "Zajęcia dodatkowe wliczone w czesne — bez ukrytych kosztów",
                color: "var(--color-accent-purple)",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-50"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-4"
                  style={{ backgroundColor: `${feature.color}15` }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--color-text-light)] leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Activities Preview */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Co oferujemy? 🌟
            </h2>
            <p className="text-[var(--color-text-light)]">
              {activitiesData.activities.length} zajęć dodatkowych w cenie czesnego
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {activitiesData.activities.slice(0, 6).map((activity) => (
              <span
                key={activity.name}
                className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-full shadow-sm text-sm font-medium"
              >
                <span className="text-xl">{activity.icon}</span>
                {activity.name}
              </span>
            ))}
          </div>
          <div className="text-center">
            <Link
              href="/zajecia"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--color-secondary)] text-white font-semibold hover:bg-[var(--color-secondary-light)] transition-colors"
            >
              Zobacz wszystkie zajęcia
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <ContactForm />

      {/* Map / Location info */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg border border-gray-50">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4">Odwiedź nas 📍</h2>
                <div className="space-y-4 text-[var(--color-text-light)]">
                  <p className="flex items-start gap-3">
                    <span className="text-2xl">🏠</span>
                    <span>
                      <strong className="text-[var(--color-text)]">Adres</strong>
                      <br />
                      {siteData.address.street}, {siteData.address.zip}{" "}
                      {siteData.address.city}
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-2xl">🕐</span>
                    <span>
                      <strong className="text-[var(--color-text)]">
                        Godziny otwarcia
                      </strong>
                      <br />
                      {siteData.hours}
                    </span>
                  </p>
                  <p className="flex items-start gap-3">
                    <span className="text-2xl">📞</span>
                    <span>
                      <strong className="text-[var(--color-text)]">Telefon</strong>
                      <br />
                      <a
                        href={`tel:${siteData.phone.replace(/\s/g, "")}`}
                        className="text-[var(--color-primary)] font-medium"
                      >
                        {siteData.phone}
                      </a>
                    </span>
                  </p>
                </div>
              </div>
              <div className="bg-[var(--color-bg-alt)] rounded-2xl h-64 md:h-80 flex items-center justify-center text-6xl">
                🗺️
                {/* Replace with actual Google Maps embed */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
