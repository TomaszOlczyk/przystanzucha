/**
 * Wspólne klocki schematów strony WWW: zdjęcie z opisem (alt), przełącznik sekcji, SEO, nagłówek podstrony,
 * pas „Umów wizytę”. Wszystkie opisy pól po polsku — Studio obsługuje Tomek i przedszkole.
 */
import { defineField, type FieldDefinition } from "sanity";

export const OPIS_AKCENTU = "Fragment w *gwiazdkach* zostanie wyróżniony kolorem (np. „Ludzie, którym *powierzasz* dziecko.”).";

/** Zdjęcie z punktem centralnym (hotspot) i wymaganym opisem alternatywnym. */
export function obraz(name: string, title: string, description?: string) {
  return defineField({
    name,
    title,
    description,
    type: "image",
    options: { hotspot: true },
    fields: [
      defineField({
        name: "alt",
        title: "Opis zdjęcia (alt)",
        description: "Co widać na zdjęciu — czytają to niewidomi i Google. Np. „Sala Morska z muralem wieloryba”.",
        type: "string",
        validation: (rule) =>
          rule.custom((alt, ctx) => {
            const rodzic = ctx.parent as { asset?: unknown } | undefined;
            return rodzic?.asset && !alt?.trim() ? "Dodaj opis zdjęcia (alt) — jest wymagany." : true;
          }),
      }),
    ],
  });
}

/** Przełącznik widoczności sekcji. */
export function pokazSekcje() {
  return defineField({
    name: "show",
    title: "Pokaż sekcję",
    description: "Wyłącz, żeby ukryć całą sekcję na stronie (treść zostaje zapisana).",
    type: "boolean",
    initialValue: true,
  });
}

/** Pole tekstowe z limitem długości (ostrzeżenie — zbyt długi tekst psuje układ). */
export function tekst(
  name: string,
  title: string,
  opcje: { max?: number; opis?: string; wiersze?: number; wymagane?: boolean; twardyLimit?: boolean } = {}
) {
  const { max, opis, wiersze, wymagane, twardyLimit } = opcje;
  return defineField({
    name,
    title,
    description: [opis, max ? `Maks. ${max} znaków.` : undefined].filter(Boolean).join(" ") || undefined,
    type: wiersze ? "text" : "string",
    ...(wiersze ? { rows: wiersze } : {}),
    validation: (rule) => {
      let r = rule;
      if (wymagane) r = r.required().error("To pole jest wymagane.");
      if (max) r = twardyLimit ? r.max(max).error(`Maksymalnie ${max} znaków — dłuższy tekst psuje układ.`) : r.max(max).warning(`Zalecane maks. ${max} znaków — dłuższy tekst może rozjechać układ.`);
      return r;
    },
  });
}

/** Ilustracja kreską pokazywana, gdy nie ma zdjęcia. */
export function motyw(name = "motif") {
  return defineField({
    name,
    title: "Ilustracja zastępcza",
    description: "Rysunek pokazywany, dopóki nie dodasz zdjęcia.",
    type: "string",
    options: {
      list: [
        { title: "Fale", value: "wave" },
        { title: "Las", value: "forest" },
        { title: "Słońce", value: "sun" },
        { title: "Łódka", value: "boat" },
        { title: "Klocki", value: "blocks" },
        { title: "Książka", value: "book" },
      ],
      layout: "radio",
      direction: "horizontal",
    },
    initialValue: "sun",
  });
}

/** SEO strony: tytuł w karcie przeglądarki i Google + opis w wynikach wyszukiwania. */
export function seo(opisTytulu = "Tytuł w Google i w karcie przeglądarki. Na podstronach dopisujemy automatycznie „| Przystań Zucha”.") {
  return defineField({
    name: "seo",
    title: "SEO (Google)",
    type: "object",
    group: "seo",
    options: { collapsible: true, collapsed: false },
    fields: [
      tekst("title", "Tytuł strony", { max: 70, opis: opisTytulu }),
      tekst("description", "Opis w Google", { max: 160, wiersze: 3, opis: "1–2 zdania zachęcające do wejścia (widoczne pod tytułem w wynikach Google)." }),
    ],
  });
}

/** Nagłówek podstrony (okruszek, wielki tytuł, lead). */
export function wstepPodstrony() {
  return defineField({
    name: "intro",
    title: "Nagłówek strony",
    type: "object",
    group: "tresc",
    options: { collapsible: true, collapsed: false },
    fields: [
      tekst("eyebrow", "Nazwa w okruszku", { max: 30, opis: "Np. „Kadra” — widoczne nad tytułem: „Przystań Zucha / Kadra”." }),
      tekst("title", "Tytuł", { max: 60, opis: OPIS_AKCENTU }),
      tekst("lead", "Wstęp", { max: 260, wiersze: 3 }),
    ] as FieldDefinition[],
  });
}

/** Pas „Umów wizytę” na dole podstrony. */
export function pasWizyty() {
  return defineField({
    name: "visitCta",
    title: "Pas „Umów wizytę” (dół strony)",
    type: "object",
    group: "tresc",
    options: { collapsible: true, collapsed: true },
    fields: [
      tekst("heading", "Nagłówek", { max: 50, opis: OPIS_AKCENTU }),
      tekst("text", "Tekst", { max: 200, wiersze: 2 }),
    ],
  });
}

export const GRUPY_PODSTRONY = [
  { name: "tresc", title: "Treść", default: true },
  { name: "seo", title: "SEO" },
];

/** Przypisuje pola do zakładki (grupy) dokumentu. */
export function wGrupie<T extends object>(group: string, pola: T[]): (T & { group: string })[] {
  return pola.map((pole) => ({ ...pole, group }));
}
