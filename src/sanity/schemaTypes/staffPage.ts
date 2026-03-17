import { defineType, defineField } from "sanity";

export const staffPage = defineType({
  name: "staffPage",
  title: "Kadra",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tytuł sekcji", type: "string" }),
    defineField({ name: "subtitle", title: "Podtytuł", type: "string" }),
    defineField({
      name: "columns",
      title: "Liczba kolumn",
      type: "number",
      options: { list: [{ title: "2 kolumny", value: 2 }, { title: "3 kolumny", value: 3 }] },
      initialValue: 3,
    }),
    defineField({
      name: "members",
      title: "Członkowie kadry",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Imię i nazwisko", type: "string" }),
            defineField({ name: "role", title: "Stanowisko", type: "string" }),
            defineField({ name: "image", title: "Zdjęcie", type: "image", options: { hotspot: true } }),
            defineField({ name: "description", title: "Opis", type: "text" }),
            defineField({
              name: "qualifications",
              title: "Kwalifikacje",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
  ],
});
