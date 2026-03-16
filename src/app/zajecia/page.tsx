import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import activitiesData from "@/content/activities.json";

export const metadata: Metadata = {
  title: "Zajęcia dla Dzieci — Przystanzucha",
  description:
    "Dedykowane zajęcia w ramach czesnego. Angielski, rytmika, plastyka, robotyka i więcej!",
};

export default function ZajeciaPage() {
  const colors = [
    "#ec4899", "#6366f1", "#a855f7", "#3b82f6", "#ec4899",
    "#6366f1", "#a855f7", "#3b82f6", "#ec4899", "#6366f1",
  ];

  return (
    <>
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-5">
              <span className="gradient-text">Zajęcia dla dzieci</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {activitiesData.title}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto mb-6">
              {activitiesData.subtitle}
            </p>
            <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full btn-gradient font-bold text-sm">
              {activitiesData.badge}
            </span>
          </div>

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
                    {"image" in activity && activity.image ? (
                      <div className="h-32 -mx-6 -mt-6 mb-4 relative overflow-hidden rounded-t-2xl">
                        <Image
                          src={activity.image as string}
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
