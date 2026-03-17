import { defineType, defineField } from "sanity";

export const classroomsPage = defineType({
  name: "classroomsPage",
  title: "Sala i materiały",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tytuł sekcji", type: "string" }),
    defineField({ name: "subtitle", title: "Podtytuł", type: "text" }),
    defineField({
      name: "room",
      title: "Sala",
      type: "object",
      fields: [
        defineField({ name: "name", title: "Nazwa", type: "string" }),
        defineField({ name: "image", title: "Zdjęcie", type: "image", options: { hotspot: true } }),
        defineField({ name: "description", title: "Opis", type: "text" }),
        defineField({
          name: "features",
          title: "Wyposażenie",
          type: "array",
          of: [{ type: "string" }],
        }),
      ],
    }),
    defineField({
      name: "uses",
      title: "Zastosowania sali",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nazwa", type: "string" }),
            defineField({ name: "icon", title: "Ikona (emoji)", type: "string" }),
            defineField({ name: "description", title: "Opis", type: "text" }),
          ],
        },
      ],
    }),
    defineField({
      name: "materials",
      title: "Materiały edukacyjne",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "category", title: "Kategoria", type: "string" }),
            defineField({ name: "icon", title: "Ikona (emoji)", type: "string" }),
            defineField({
              name: "items",
              title: "Elementy",
              type: "array",
              of: [{ type: "string" }],
            }),
          ],
        },
      ],
    }),
  ],
});
