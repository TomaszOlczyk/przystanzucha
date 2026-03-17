import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getStaffPage } from "@/sanity/fetchers";
import { urlFor } from "@/sanity/image";

export const metadata: Metadata = {
  title: "Nasza Kadra — Przystanzucha",
  description: "Poznaj nasz zespół wykwalifikowanych pedagogów i specjalistów.",
};

const fallbackIcons = ["👩‍💼", "👩‍🏫", "👩‍🏫", "🇬🇧", "🎵", "🧠"];

export default async function KadraPage() {
  const staffData = await getStaffPage();
  const colors = ["#ec4899", "#a855f7", "#6366f1", "#3b82f6", "#ec4899", "#a855f7"];

  return (
    <>
      <section className="pt-12 pb-16 md:pt-20 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-sm font-semibold mb-5">
              <span className="gradient-text">Nasza kadra</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              {staffData.title}
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] max-w-2xl mx-auto">
              {staffData.subtitle}
            </p>
          </div>

          <div className={`grid grid-cols-1 gap-6 ${staffData.columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`}>
            {staffData.members.map((member, i) => {
              const color = colors[i % colors.length];
              const icon = fallbackIcons[i % fallbackIcons.length];
              const hasImage = !!member.image?.asset;

              return (
                <div
                  key={member.name}
                  className="glass-strong rounded-2xl overflow-hidden card-hover"
                >
                  {hasImage ? (
                    <div className="h-52 relative">
                      <Image
                        src={urlFor(member.image).width(400).height(208).url()}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div
                      className="h-44 flex items-center justify-center text-6xl"
                      style={{
                        background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                      }}
                    >
                      {icon}
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold mb-3" style={{ color }}>
                      {member.role}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed mb-4">
                      {member.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {(member.qualifications ?? []).map((q) => (
                        <span
                          key={q}
                          className="text-xs px-2.5 py-1 rounded-full font-medium"
                          style={{
                            backgroundColor: `${color}12`,
                            color,
                          }}
                        >
                          {q}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-16 text-center">
            <div className="glass-strong rounded-2xl p-8 md:p-10 inline-block max-w-xl">
              <h2 className="text-2xl font-bold mb-3">Chcesz nas poznać?</h2>
              <p className="text-[var(--color-text-secondary)] mb-6">
                Zapraszamy na dzień otwarty — oprowdzimy po przedszkolu i
                odpowiemy na pytania
              </p>
              <Link
                href="/konsultacja"
                className="inline-block px-8 py-3.5 rounded-full btn-gradient font-bold"
              >
                Umów konsultację
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
