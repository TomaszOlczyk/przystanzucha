import { defineType, defineField } from "sanity";

export const activitiesPage = defineType({
  name: "activitiesPage",
  title: "Zajęcia",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Tytuł sekcji", type: "string" }),
    defineField({ name: "subtitle", title: "Podtytuł", type: "text" }),
    defineField({ name: "badge", title: "Etykieta (badge)", type: "string" }),
    defineField({
      name: "activities",
      title: "Lista zajęć",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "name", title: "Nazwa", type: "string" }),
            defineField({ name: "icon", title: "Ikona (emoji)", type: "string" }),
            defineField({ name: "image", title: "Zdjęcie", type: "image", options: { hotspot: true } }),
            defineField({ name: "description", title: "Opis", type: "text" }),
            defineField({ name: "frequency", title: "Częstotliwość", type: "string" }),
            defineField({ name: "duration", title: "Czas trwania", type: "string" }),
          ],
        },
      ],
    }),
  ],
});
