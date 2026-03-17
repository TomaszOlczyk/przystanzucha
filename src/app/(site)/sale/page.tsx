import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getClassroomsPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Nasza Sala — Przystanzucha",
  description: "Jedna przestrzeń, wiele możliwości. Nowoczesna sala i najlepsze materiały edukacyjne.",
};

export default async function SalePage() {
  const classroomsData = await getClassroomsPage();
  const useColors = ["#ec4899", "#a855f7", "#6366f1", "#3b82f6", "#ec4899", "#a855f7"];

  return (
    <>
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-5">
              <span className="gradient-text">Nasza sala</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {classroomsData.title}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {classroomsData.subtitle}
            </p>
          </div>

          {/* Main room showcase */}
          <div className="glass-strong rounded-3xl p-6 md:p-10 mb-16">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              {classroomsData.room.image?.asset ? (
                <div className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl relative shrink-0 overflow-hidden">
                  <Image
                    src={urlFor(classroomsData.room.image).width(600).height(400).url()}
                    alt={classroomsData.room.name}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-full md:w-1/2 h-64 md:h-80 rounded-2xl flex items-center justify-center text-8xl shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #ec489915, #a855f720, #6366f115)",
                  }}
                >
                  🏠
                </div>
              )}
              <div className="w-full md:w-1/2">
                <h2 className="text-2xl md:text-3xl font-bold mb-3 gradient-text">
                  {classroomsData.room.name}
                </h2>
                <p className="text-[var(--color-text-secondary)] leading-relaxed mb-6 text-sm">
                  {classroomsData.room.description}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {classroomsData.room.features.map((f) => (
                    <div key={f} className="flex items-center gap-2 text-sm">
                      <span className="w-5 h-5 rounded-full btn-gradient flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                        ✓
                      </span>
                      {f}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Uses */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-center mb-3">
              Jedna sala — <span className="gradient-text">wiele możliwości</span>
            </h2>
            <p className="text-center text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              Nasza sala codziennie zmienia się w zależności od planu zajęć
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {classroomsData.uses.map((use, i) => {
                const color = useColors[i % useColors.length];
                return (
                  <div
                    key={use.name}
                    className="glass-strong rounded-2xl p-6 card-hover"
                  >
                    <div className="text-3xl mb-3">{use.icon}</div>
                    <h3 className="text-lg font-bold mb-2" style={{ color }}>
                      {use.name}
                    </h3>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {use.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Materials */}
          <div className="mb-16">
            <h2 className="text-3xl font-extrabold text-center mb-4">
              Materiały i narzędzia
            </h2>
            <p className="text-center text-[var(--color-text-secondary)] mb-10 max-w-2xl mx-auto">
              Pracujemy z najlepszymi materiałami edukacyjnymi wspierającymi rozwój
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              {classroomsData.materials.map((cat, i) => {
                const matColors = ["#ec4899", "#a855f7", "#6366f1", "#3b82f6"];
                const color = matColors[i % matColors.length];
                return (
                  <div key={cat.category} className="glass-strong rounded-2xl p-6 card-hover">
                    <div className="text-3xl mb-3">{cat.icon}</div>
                    <h3 className="font-bold mb-3" style={{ color }}>{cat.category}</h3>
                    <ul className="space-y-1.5">
                      {cat.items.map((item) => (
                        <li key={item} className="text-sm text-[var(--color-text-secondary)] flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <div className="glass-strong rounded-2xl p-8 md:p-10 inline-block max-w-xl">
              <h2 className="text-2xl font-bold mb-3">Chcesz zobaczyć naszą salę?</h2>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Zapraszamy na spacer po przedszkolu — przekonaj się sam!
              </p>
              <Link href="/#kontakt" className="inline-block px-8 py-3.5 rounded-full btn-gradient font-bold">
                Umów wizytę
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
