import { defineArrayMember, defineField, defineType } from "sanity";
import { CalendarIcon } from "@sanity/icons";
import { GRUPY_PODSTRONY, OPIS_AKCENTU, pasWizyty, seo, tekst } from "./pola";

/** Podstrona /zajecia/ — lista zajęć w czesnym (także pas z nazwami zajęć na stronie głównej). */
export const activitiesPage = defineType({
  name: "activitiesPage",
  title: "Zajęcia",
  type: "document",
  icon: CalendarIcon,
  groups: GRUPY_PODSTRONY,
  fields: [
    seo(),
    defineField({
      name: "intro",
      title: "Nagłówek strony",
      type: "object",
      group: "tresc",
      fields: [
        tekst("eyebrow", "Nazwa w okruszku", { max: 30 }),
        tekst("title", "Tytuł", { max: 60, opis: `${OPIS_AKCENTU} {liczba} zamieniamy na liczbę zajęć z listy.` }),
        tekst("lead", "Wstęp", { max: 260, wiersze: 3 }),
      ],
    }),
    defineField({
      name: "tableHeaders",
      title: "Nagłówki tabeli (komputer)",
      type: "object",
      group: "tresc",
      options: { collapsible: true, collapsed: true, columns: 2 },
      fields: [
        tekst("no", "Kolumna: numer", { max: 10 }),
        tekst("name", "Kolumna: zajęcia", { max: 20 }),
        tekst("description", "Kolumna: opis", { max: 30 }),
        tekst("frequency", "Kolumna: jak często", { max: 16 }),
        tekst("duration", "Kolumna: ile trwają", { max: 14 }),
      ],
    }),
    defineField({
      name: "activities",
      title: "Zajęcia",
      description: "Przeciągnij, żeby zmienić kolejność. Liczba zajęć pojawia się automatycznie w tytule i na stronie głównej.",
      type: "array",
      group: "tresc",
      of: [
        defineArrayMember({
          type: "object",
          name: "zajecie",
          title: "Zajęcia",
          fields: [
            tekst("name", "Nazwa", { max: 40, wymagane: true }),
            tekst("description", "Na czym polegają", { max: 220, wiersze: 3 }),
            tekst("frequency", "Jak często", { max: 22, opis: "Np. „2x w tygodniu”." }),
            tekst("duration", "Ile trwają", { max: 16, opis: "Np. „30 min”." }),
          ],
          preview: { select: { title: "name", subtitle: "frequency" } },
        }),
      ],
    }),
    { ...tekst("note", "Tekst pod listą", { max: 260, wiersze: 3 }), group: "tresc" },
    pasWizyty(),
  ],
  preview: { prepare: () => ({ title: "Zajęcia" }) },
});
