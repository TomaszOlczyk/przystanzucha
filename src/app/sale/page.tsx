import type { Metadata } from "next";
import classroomsData from "@/content/classrooms.json";

export const metadata: Metadata = {
  title: "Sale i Materiały — Przystanzucha",
  description:
    "Nowoczesne sale dydaktyczne i najlepsze materiały edukacyjne dla Twojego dziecka.",
};

export default function SalePage() {
  const roomColors = [
    "var(--color-primary)",
    "var(--color-accent-blue)",
    "var(--color-accent-purple)",
    "var(--color-secondary)",
  ];

  const roomEmojis = ["🌈", "🖐️", "🎵", "🌳"];

  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-[var(--color-accent-blue)]/15 via-[var(--color-bg)] to-[var(--color-accent-yellow)]/15 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-5xl mb-4 block">🏫</span>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            {classroomsData.title}
          </h1>
          <p className="text-lg text-[var(--color-text-light)] max-w-2xl mx-auto">
            {classroomsData.subtitle}
          </p>
        </div>
      </section>

      {/* Rooms */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Nasze sale 🎨
          </h2>

          <div className="space-y-12">
            {classroomsData.rooms.map((room, index) => {
              const color = roomColors[index % roomColors.length];
              const emoji = roomEmojis[index % roomEmojis.length];
              const isReversed = index % 2 === 1;

              return (
                <div
                  key={room.name}
                  className={`flex flex-col ${
                    isReversed ? "md:flex-row-reverse" : "md:flex-row"
                  } gap-8 items-center bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-50 card-hover`}
                >
                  {/* Image placeholder */}
                  <div
                    className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl flex items-center justify-center text-8xl shrink-0"
                    style={{
                      background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                    }}
                  >
                    {emoji}
                  </div>

                  {/* Content */}
                  <div className="w-full md:w-1/2">
                    <h3 className="text-2xl font-bold mb-3" style={{ color }}>
                      {room.name}
                    </h3>
                    <p className="text-[var(--color-text-light)] leading-relaxed mb-5">
                      {room.description}
                    </p>
                    <ul className="space-y-2">
                      {room.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2 text-sm"
                        >
                          <span
                            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                            style={{ backgroundColor: color }}
                          >
                            ✓
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Materials */}
      <section className="py-16 md:py-24 bg-[var(--color-bg-alt)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4">
            Materiały i narzędzia 🧩
          </h2>
          <p className="text-center text-[var(--color-text-light)] mb-12 max-w-2xl mx-auto">
            Pracujemy z najlepszymi materiałami edukacyjnymi, które wspierają
            wszechstronny rozwój dzieci
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {classroomsData.materials.map((category, index) => {
              const materialColors = [
                "var(--color-primary)",
                "var(--color-accent-pink)",
                "var(--color-secondary)",
                "var(--color-accent-purple)",
              ];
              const color = materialColors[index % materialColors.length];

              return (
                <div
                  key={category.category}
                  className="bg-white rounded-2xl p-6 shadow-sm card-hover border border-gray-50"
                >
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="font-bold text-lg mb-4" style={{ color }}>
                    {category.category}
                  </h3>
                  <ul className="space-y-2">
                    {category.items.map((item) => (
                      <li
                        key={item}
                        className="text-sm text-[var(--color-text-light)] flex items-center gap-2"
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: color }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Chcesz zobaczyć nasze sale na żywo? 👀
          </h2>
          <p className="text-[var(--color-text-light)] mb-8">
            Zapraszamy na spacer po przedszkolu — przekonaj się, jak wygląda
            codzienność w Przystanzucha!
          </p>
          <a
            href="/#rekrutacja"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[var(--color-secondary)] text-white font-bold text-lg hover:bg-[var(--color-secondary-light)] transition-all shadow-lg"
          >
            Umów wizytę 🏫
          </a>
        </div>
      </section>
    </>
  );
}
