/** Sygnet: żaglówka na fali w kole (przystań). Źródło: przystanzucha-ops/docs/brand/logo. */
export function LogoMark({ className = "w-10 h-10", light = false }: { className?: string; light?: boolean }) {
  const ink = light ? "#f6f0e6" : "#16252e";
  return (
    <svg viewBox="0 0 512 512" className={className} aria-hidden="true">
      <circle cx="256" cy="256" r="236" fill="none" stroke={ink} strokeWidth="18" />
      <g transform="translate(0 -14)">
        <rect x="254" y="86" width="9" height="244" rx="2" fill={ink} />
        <path d="M248 96 L248 318 L142 318 Z" fill={ink} />
        <path d="M270 150 L270 318 L342 318 Z" fill="#f3c35a" />
        <path d="M116 332 H396 L382 360 H130 Z" fill="#c24a2b" />
        <path d="M130 360 H382 L356 394 H156 Z" fill={ink} />
        <path
          d="M126 424 q 21 -16 42 0 t 42 0 t 42 0 t 42 0 t 42 0 t 42 0 M168 456 q 22 -14 44 0 t 44 0 t 44 0 t 44 0"
          fill="none"
          stroke={ink}
          strokeWidth="13"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
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
