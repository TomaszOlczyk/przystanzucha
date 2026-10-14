import { Fragment, type ReactNode } from "react";

/**
 * Tekst z wyróżnieniem: fragment w *gwiazdkach* renderujemy funkcją `akcent` (np. kolorem morskim),
 * resztę jako zwykły tekst. Tak redaktor w Studio sam decyduje, które słowo nagłówka jest wyróżnione.
 * Znaki stega (niewidoczne, tylko w podglądzie) zostają w ostatnim kawałku tekstu — klik w podglądzie działa.
 */
export function zAkcentem(tekst: string | undefined, akcent: (fragment: string, i: number) => ReactNode): ReactNode {
  if (!tekst) return null;
  const czesci = tekst.split(/\*([^*]+)\*/);
  return czesci.map((czesc, i) =>
    i % 2 ? <Fragment key={i}>{akcent(czesc, i)}</Fragment> : czesc ? <Fragment key={i}>{czesc}</Fragment> : null
  );
}

/** Wyróżnienie jak w nagłówkach podstron: kursywa w kolorze morskim. */
export function Akcent({ tekst }: { tekst?: string }) {
  return <>{zAkcentem(tekst, (f) => <em className="text-[var(--color-sea)]">{f}</em>)}</>;
}

/** Tekst bez gwiazdek (do <title>, aria-label itp.). */
export function bezAkcentu(tekst: string | undefined): string {
  return (tekst ?? "").replace(/\*([^*]+)\*/g, "$1");
}

/** Fragmenty w `odwrotnych apostrofach` jako <code> (np. nazwy plików cookies). */
export function zKodem(tekst: string | undefined): ReactNode {
  if (!tekst) return null;
  return tekst.split(/`([^`]+)`/).map((czesc, i) => (i % 2 ? <code key={i}>{czesc}</code> : czesc ? <Fragment key={i}>{czesc}</Fragment> : null));
}

/** Podstawia {liczba} (np. liczbę zajęć) w tekście z CMS. */
export function zLiczba(tekst: string | undefined, liczba: number): string {
  return (tekst ?? "").replace(/\{liczba\}/g, String(liczba));
}
