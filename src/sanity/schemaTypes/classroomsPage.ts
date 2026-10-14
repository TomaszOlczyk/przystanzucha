import { defineArrayMember, defineField, defineType } from "sanity";
import { BlockElementIcon } from "@sanity/icons";
import { GRUPY_PODSTRONY, obraz, OPIS_AKCENTU, pasWizyty, pokazSekcje, seo, tekst } from "./pola";

function sekcja(name: string, title: string, fields: ReturnType<typeof defineField>[]) {
  return defineField({ name, title, type: "object", group: "tresc", options: { collapsible: true, collapsed: false }, fields });
}

/** Podstrona /sale/ — stały układ: Sala Morska, Sala Leśna, wyposażenie, strefy, materiały. */
export const classroomsPage = defineType({
  name: "classroomsPage",
  title: "Sale",
  type: "document",
  icon: BlockElementIcon,
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
        tekst("title", "Tytuł", { max: 60, opis: OPIS_AKCENTU }),
        tekst("lead", "Wstęp", { max: 260, wiersze: 3 }),
      ],
    }),
    sekcja("seaRoom", "Sala Morska (Grupa 1)", [
      pokazSekcje(),
      tekst("label", "Etykieta", { max: 30 }),
      tekst("heading", "Nazwa sali", { max: 30 }),
      tekst("lead", "Opis", { max: 220, wiersze: 3 }),
      defineField({
        name: "images",
        title: "Zdjęcia (2)",
        description: "Pierwsze duże, drugie mniejsze, przekrzywione. Poziome zdjęcia (4:3).",
        type: "array",
        validation: (rule) => rule.max(2).error("Układ mieści 2 zdjęcia."),
        of: [defineArrayMember({ type: "image", title: "Zdjęcie", options: { hotspot: true }, fields: obraz("zdjecie", "Zdjęcie").fields })],
      }),
    ]),
    sekcja("forestRoom", "Sala Leśna (Grupa 2)", [
      pokazSekcje(),
      tekst("label", "Etykieta", { max: 30 }),
      tekst("heading", "Nazwa sali", { max: 30 }),
      tekst("lead", "Opis", { max: 220, wiersze: 3 }),
      tekst("linkText", "Link do formularza", { max: 50 }),
      obraz("image", "Zdjęcie główne", "Poziome (4:3). Bez zdjęcia pokazujemy ilustrację lasu."),
      obraz("image2", "Zdjęcie dodatkowe", "Pionowe (3:4)."),
    ]),
    sekcja("features", "Wyposażenie", [
      pokazSekcje(),
      tekst("label", "Etykieta", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 50, opis: OPIS_AKCENTU }),
      defineField({ name: "items", title: "Elementy wyposażenia", type: "array", of: [defineArrayMember({ type: "string" })] }),
    ]),
    sekcja("zones", "Strefy w ciągu dnia", [
      pokazSekcje(),
      tekst("label", "Etykieta", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 50, opis: OPIS_AKCENTU }),
      defineField({
        name: "items",
        title: "Strefy",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "strefa",
            title: "Strefa",
            fields: [tekst("name", "Nazwa", { max: 40 }), tekst("description", "Opis", { max: 200, wiersze: 3 })],
            preview: { select: { title: "name", subtitle: "description" } },
          }),
        ],
      }),
    ]),
    sekcja("learningMaterials", "Materiały i pomoce", [
      pokazSekcje(),
      tekst("label", "Etykieta", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 50, opis: OPIS_AKCENTU }),
      defineField({
        name: "items",
        title: "Kategorie",
        description: "Najlepiej 4 (jeden rząd na komputerze).",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "kategoria",
            title: "Kategoria",
            fields: [
              tekst("category", "Kategoria", { max: 30 }),
              defineField({ name: "items", title: "Pomoce", type: "array", of: [defineArrayMember({ type: "string" })] }),
            ],
            preview: { select: { title: "category" } },
          }),
        ],
      }),
    ]),
    pasWizyty(),
  ],
  preview: { prepare: () => ({ title: "Sale" }) },
});
