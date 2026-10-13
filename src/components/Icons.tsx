/** Proste ikony liniowe (zamiast emoji) — spójne z sygnetem. */
const base = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function Icon({ name, className = "w-7 h-7" }: { name: string; className?: string }) {
  switch (name) {
    case "harbor":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
          <circle cx="12" cy="5" r="2" />
          <path d="M12 7v13M8 11h8M5 14a7 7 0 0 0 14 0" />
        </svg>
      );
    case "hands":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
          <path d="M12 21s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.6-7 10-7 10z" />
        </svg>
      );
    case "leaf":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
          <path d="M5 19c0-8 5-14 15-14 0 10-6 15-14 15" />
          <path d="M5 19c3-4 6-6 10-8" />
        </svg>
      );
    case "check":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.4} aria-hidden="true">
          <path d="M5 12.5l4.5 4.5L19 7.5" />
        </svg>
      );
    case "pin":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
          <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
          <circle cx="12" cy="9.5" r="2.5" />
        </svg>
      );
    case "clock":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "arrow":
      return (
        <svg viewBox="0 0 24 24" className={className} {...base} strokeWidth={2.2} aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    default:
      return null;
  }
}
