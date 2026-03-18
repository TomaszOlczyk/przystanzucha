import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getActivitiesPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Zajęcia dla Dzieci — Przystanzucha",
  description:
    "Dedykowane zajęcia w ramach czesnego. Angielski, rytmika, plastyka, robotyka i więcej!",
};

export default async function ZajeciaPage() {
  const activitiesData = await getActivitiesPage();
  const colors = [
    "#ec4899", "#6366f1", "#a855f7", "#3b82f6", "#ec4899",
    "#6366f1", "#a855f7", "#3b82f6", "#ec4899", "#6366f1",
  ];

  const heroImgSrc = activitiesData.heroImage?.asset
    ? urlFor(activitiesData.heroImage).width(1200).height(1600).url()
    : "/images/zajecia-hero.jpg";

  return (
    <>
      {/* Hero section — text left, photo right (like homepage) */}
      <section className="relative min-h-[60vh] lg:min-h-[70vh] flex items-center overflow-hidden">
        {/* Background photo — right side, desktop only */}
        <div className="absolute right-0 top-0 bottom-0 w-[45%] hidden lg:block pointer-events-none z-0">
          <Image
            src={heroImgSrc}
            alt="Zajęcia dla dzieci"
            fill
            className="object-cover object-center opacity-70"
            style={{
              maskImage: "linear-gradient(to right, transparent 0%, black 25%), linear-gradient(to top, transparent 0%, black 10%), linear-gradient(to bottom, transparent 0%, black 10%)",
              WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 25%), linear-gradient(to top, transparent 0%, black 10%), linear-gradient(to bottom, transparent 0%, black 10%)",
              maskComposite: "intersect",
              WebkitMaskComposite: "source-in",
            }}
            priority
          />
        </div>

        {/* Decorative glows */}
        <div className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-purple-300/20 blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-pink-400/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16 md:py-0 relative z-10">
          <div className="lg:max-w-[55%]">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-5">
                <span className="gradient-text">Zajęcia dla dzieci</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Dedykowane{" "}
                <span className="gradient-text">zajęcia</span>
              </h1>
              <p className="text-lg md:text-xl text-[var(--color-text-secondary)] leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                {activitiesData.subtitle}
              </p>
              <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full btn-gradient font-bold text-sm">
                {activitiesData.badge}
              </span>
            </div>
          </div>
        </div>

        {/* Mobile hero image */}
        <div className="lg:hidden w-full px-4 pb-8">
          <div className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
            <Image
              src={heroImgSrc}
              alt="Zajęcia dla dzieci"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Activities grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {activitiesData.activities.map((activity, i) => {
              const color = colors[i % colors.length];

              return (
                <div
                  key={activity.name}
                  className="glass-strong rounded-2xl p-6 card-hover relative overflow-hidden"
                >
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] opacity-10"
                    style={{ backgroundColor: color }}
                  />
                  <div className="relative">
                    {activity.image?.asset ? (
                      <div className="h-32 -mx-6 -mt-6 mb-4 relative overflow-hidden rounded-t-2xl">
                        <Image
                          src={urlFor(activity.image).width(400).height(128).url()}
                          alt={activity.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <div className="text-3xl mb-3">{activity.icon}</div>
                    )}
                    <h3
                      className="text-lg font-bold mb-2"
                      style={{ color }}
                    >
                      {activity.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      {activity.description}
                    </p>
                    <div className="flex items-center gap-4 pt-3 border-t border-gray-200/50 text-sm text-[var(--color-text-secondary)]">
                      <span>📅 {activity.frequency}</span>
                      <span>⏱️ {activity.duration}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary CTA */}
          <div className="mt-16">
            <div
              className="rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden"
              style={{ background: "var(--gradient-btn)" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent pointer-events-none" />
              <div className="relative">
                <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
                  {activitiesData.activities.length} dedykowanych zajęć w ramach czesnego!
                </h2>
                <p className="text-lg opacity-90 mb-8 max-w-xl mx-auto">
                  Nie musisz szukać dodatkowych zajęć po godzinach — Twoje
                  dziecko rozwija się wszechstronnie w przedszkolu
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                  {activitiesData.activities.map((a) => (
                    <span
                      key={a.name}
                      className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/15 backdrop-blur-sm rounded-full text-sm font-medium"
                    >
                      {a.icon} {a.name}
                    </span>
                  ))}
                </div>
                <Link
                  href="/#kontakt"
                  className="inline-block px-8 py-4 rounded-full bg-white text-[var(--color-purple)] font-bold text-lg hover:bg-white/90 transition-all shadow-lg"
                >
                  Zapisz dziecko
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
