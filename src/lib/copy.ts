/**
 * Porządkowanie tekstów z Sanity przed wyświetleniem: podwójne spacje, spacje przed interpunkcją,
 * wielka litera na początku. Nigdy nie ucinamy fragmentów zdań (np. powitania) — zdanie musi zostać całe.
 */
export function tidy(text: string): string {
  const t = text
    .replace(/\s+/g, " ")
    .replace(/\s+([,.!?;:])/g, "$1")
    .trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Akapity z tekstu wieloliniowego, każdy uporządkowany. */
export function paragraphs(text: string): string[] {
  return text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
    .map(tidy);
}

/** Pełne zdania (z interpunkcją końcową). */
export function sentences(text: string): string[] {
  return (tidy(text).match(/[^.!?]+[.!?]+/g) ?? [text]).map((s) => tidy(s));
}

/** Najbardziej „ludzkie” całe zdanie z bio (rodzicielstwo, doświadczenie, pasja), do ~200 znaków; bez zdań-powitań. */
export function bioHighlight(text: string): string {
  const keys = ["mamą", "doświadczeni", "spektrum", "pasj"];
  const candidates = sentences(text).filter((s) => s.length > 30 && s.length <= 200 && !/^(Cześć|Hej|Dzień dobry)\b/i.test(s));
  return candidates.find((s) => keys.some((k) => s.includes(k))) ?? candidates[0] ?? tidy(text).slice(0, 180);
}
