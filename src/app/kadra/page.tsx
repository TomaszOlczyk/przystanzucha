import type { Metadata } from "next";
import staffData from "@/content/staff.json";

export const metadata: Metadata = {
  title: "Kadra — Przystanzucha",
  description: "Poznaj nasz zespół wykwalifikowanych pedagogów i specjalistów.",
};

export default function KadraPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--color-accent-purple)]/15 via-[var(--color-bg)] to-[var(--color-secondary)]/10 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">👩‍🏫</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {staffData.title}
          </h1>
          <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
            {staffData.subtitle}
          </p>
        </div>
      </section>

      {/* Staff Grid */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {staffData.members.map((member, index) => {
              const colors = [
                "var(--color-primary)",
                "var(--color-secondary)",
                "var(--color-accent-pink)",
                "var(--color-accent-purple)",
                "var(--color-accent-blue)",
                "var(--color-accent-yellow)",
              ];
              const color = colors[index % colors.length];

              return (
                <div
                  key={member.name}
                  className="bg-white rounded-3xl overflow-hidden shadow-sm card-hover border border-gray-50"
                >
                  {/* Avatar placeholder */}
                  <div
                    className="h-48 flex items-center justify-center text-7xl"
                    style={{
                      background: `linear-gradient(135deg, ${color}20, ${color}40)`,
                    }}
                  >
                    {member.role.includes("Dyrektor")
                      ? "👩‍💼"
                      : member.role.includes("Psycholog")
                      ? "🧠"
                      : member.role.includes("muzyk")
                      ? "🎵"
                      : member.role.includes("angielski")
                      ? "🇬🇧"
                      : "👩‍🏫"}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p
                      className="text-sm font-semibold mb-3"
                      style={{ color }}
                    >
                      {member.role}
                    </p>
                    <p className="text-sm text-[var(--color-text-light)] leading-relaxed mb-4">
                      {member.description}
                    </p>

                    {/* Qualifications */}
                    <div className="flex flex-wrap gap-1.5">
                      {member.qualifications.map((qual) => (
                        <span
                          key={qual}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: `${color}15`,
                            color,
                          }}
                        >
                          {qual}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[var(--color-bg-alt)]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Chcesz poznać nas osobiście? 🤝
          </h2>
          <p className="text-[var(--color-text-light)] mb-8">
            Zapraszamy na dzień otwarty — oprowdzimy Cię po przedszkolu i
            odpowiemy na wszystkie pytania.
          </p>
          <a
            href="/#rekrutacja"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-primary)] text-white font-bold text-lg hover:bg-[var(--color-primary-light)] transition-all shadow-lg"
          >
            Umów wizytę ✨
          </a>
        </div>
      </section>
    </>
  );
}
