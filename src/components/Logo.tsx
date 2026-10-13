/** Sygnet: żaglówka na fali w kole (przystań) + nazwa. */
export function LogoMark({ className = "w-10 h-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <circle cx="24" cy="24" r="24" fill="var(--color-sea)" />
      <path d="M24 9 L24 30 L13 30 Z" fill="#fff" />
      <path d="M26 13 L26 30 L35 30 Q33 20 26 13 Z" fill="var(--color-sun)" />
      <path d="M11 32 h26 l-3 4 H14 Z" fill="var(--color-coral)" />
      <path d="M6 39 q4.5 -3 9 0 t9 0 t9 0 t9 0" stroke="#fff" strokeWidth="2.2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ name, light = false }: { name: string; light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <LogoMark />
      <span className={`font-display text-xl md:text-[1.4rem] font-semibold leading-none ${light ? "text-white" : "text-[var(--color-ink)]"}`}>
        {name}
      </span>
    </span>
  );
}
