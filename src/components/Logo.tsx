/** Sygnet rysowany kreską: żaglówka na fali w kole (przystań). */
export function LogoMark({ className = "w-9 h-9", light = false }: { className?: string; light?: boolean }) {
  const ink = light ? "#f6f0e6" : "#16252e";
  return (
    <svg viewBox="0 0 40 40" className={className} fill="none" stroke={ink} strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
      <circle cx="20" cy="20" r="18.5" />
      <path d="M20 8v17H10.5z" fill={ink} />
      <path d="M22.5 12v13H30c-1.2-6-3.6-10-7.5-13z" fill="#f3c35a" />
      <path d="M10 27.5h20l-2.5 3.5h-15z" fill="#c24a2b" stroke="none" />
      <path d="M7 34c2.2-1.5 4.3 1.5 6.5 0s4.3 1.5 6.5 0 4.3 1.5 6.5 0 4.3 1.5 6.5 0" />
    </svg>
  );
}

export default function Logo({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark light={light} />
      <span className={`font-display text-[1.45rem] leading-none tracking-[-0.02em] ${light ? "text-[var(--color-paper)]" : "text-[var(--color-ink)]"}`}>
        {name}
      </span>
    </span>
  );
}
