import type { Metadata } from "next";
import activitiesData from "@/content/activities.json";

export const metadata: Metadata = {
  title: "Zajęcia Dodatkowe — Przystanzucha",
  description:
    "Wszystkie zajęcia dodatkowe wchodzą w skład czesnego. Język angielski, rytmika, plastyka, robotyka i więcej!",
};

export default function ZajeciaPage() {
  const activityColors = [
    "var(--color-primary)",
    "var(--color-accent-blue)",
    "var(--color-accent-pink)",
    "var(--color-secondary)",
    "var(--color-accent-purple)",
    "var(--color-primary)",
    "var(--color-accent-blue)",
    "var(--color-accent-pink)",
    "var(--color-secondary)",
    "var(--color-accent-purple)",
  ];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--color-accent-yellow)]/20 via-[var(--color-bg)] to-[var(--color-accent-pink)]/15 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🌟</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {activitiesData.title}
          </h1>
          <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto mb-6">
            {activitiesData.subtitle}
          </p>
          <span className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--color-secondary)]/15 text-[var(--color-secondary)] font-bold text-lg">
            ✅ {activitiesData.badge}
          </span>
        </div>
      </section>

      {/* Activities Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activitiesData.activities.map((activity, index) => {
              const color = activityColors[index % activityColors.length];

              return (
                <div
                  key={activity.name}
                  className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-50 relative overflow-hidden"
                >
                  {/* Decorative corner */}
                  <div
                    className="absolute top-0 right-0 w-20 h-20 rounded-bl-[3rem] opacity-10"
                    style={{ backgroundColor: color }}
                  />

                  <div className="relative">
                    <div className="text-4xl mb-4">{activity.icon}</div>
                    <h3 className="text-xl font-bold mb-2" style={{ color }}>
                      {activity.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-light)] leading-relaxed mb-5">
                      {activity.description}
                    </p>

                    <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-base">📅</span>
                        <span className="text-[var(--color-text-light)]">
                          {activity.frequency}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <span className="text-base">⏱️</span>
                        <span className="text-[var(--color-text-light)]">
                          {activity.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Summary banner */}
      <section className="py-16 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent-pink)]">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {activitiesData.activities.length} zajęć w cenie czesnego! 🎉
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Nie musisz szukać dodatkowych zajęć po godzinach — Twoje dziecko
            rozwija się wszechstronnie w przedszkolu.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {activitiesData.activities.map((a) => (
              <span
                key={a.name}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
              >
                {a.icon} {a.name}
              </span>
            ))}
          </div>

          <a
            href="/#rekrutacja"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[var(--color-primary)] font-bold text-lg hover:bg-gray-50 transition-all shadow-lg"
          >
            Zapisz dziecko ✨
          </a>
        </div>
      </section>
    </>
  );
}
