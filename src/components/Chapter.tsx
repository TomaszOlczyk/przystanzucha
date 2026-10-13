/** Sekcja treści: krótka etykieta (zdaniowo, kolor morski) i zawartość. Bez numeracji — każda sekcja ma własny układ. */
export default function Chapter({
  id,
  label,
  children,
  className = "",
  tone = "paper",
}: {
  id?: string;
  no?: string;
  label?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "paper" | "deep";
}) {
  return (
    <section id={id} className={`${tone === "deep" ? "bg-[var(--color-paper-deep)]/60" : ""} ${className}`}>
      <div className="max-w-[1200px] mx-auto px-5 lg:px-10 py-20 lg:py-28">
        {label && (
          <p className="t-label mb-4">
            <span className="inline-block w-6 h-[1.5px] bg-[var(--color-coral)]" aria-hidden="true" />
            {label}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
