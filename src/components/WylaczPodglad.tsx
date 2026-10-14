"use client";

import { useIsPresentationTool } from "next-sanity/hooks";

/**
 * Tryb podglądu otwarty poza Studio (np. link skopiowany z podglądu): pokazujemy przycisk wyjścia,
 * żeby nie oglądać wersji roboczych zamiast opublikowanej strony. W Studio (Presentation) się chowa.
 */
export default function WylaczPodglad() {
  const wStudio = useIsPresentationTool();
  if (wStudio !== false) return null;
  return (
    <a
      href="/api/draft-mode/disable"
      className="fixed left-4 bottom-24 lg:bottom-4 z-[70] rounded-full bg-[var(--color-ink)] text-[var(--color-paper)] px-4 py-2 text-sm font-semibold shadow-lg"
    >
      Podgląd wersji roboczych — wyłącz
    </a>
  );
}
