import { defineType, defineField } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ustawienia strony",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Nazwa", type: "string" }),
    defineField({ name: "tagline", title: "Slogan", type: "string" }),
    defineField({ name: "description", title: "Opis", type: "text" }),
    defineField({ name: "domain", title: "Domena", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "hours", title: "Godziny otwarcia", type: "string" }),
    defineField({
      name: "address",
      title: "Adres",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Ulica", type: "string" }),
        defineField({ name: "city", title: "Miasto", type: "string" }),
        defineField({ name: "zip", title: "Kod pocztowy", type: "string" }),
      ],
    }),
    defineField({
      name: "social",
      title: "Social media",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook URL", type: "string" }),
        defineField({ name: "instagram", title: "Instagram URL", type: "string" }),
      ],
    }),
    defineField({
      name: "navigation",
      title: "Nawigacja",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "label", title: "Tekst", type: "string" }),
            defineField({ name: "href", title: "Link", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "recruitmentOpen", title: "Rekrutacja otwarta", type: "boolean" }),
    defineField({ name: "recruitmentYear", title: "Rok rekrutacji", type: "string" }),
    defineField({ name: "heroHeading", title: "Hero — nagłówek", type: "string" }),
    defineField({ name: "heroSubheading", title: "Hero — podtytuł (kolorowy)", type: "string" }),
    defineField({ name: "heroDescription", title: "Hero — opis", type: "text" }),
    defineField({
      name: "stats",
      title: "Statystyki",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", title: "Wartość", type: "string" }),
          defineField({ name: "label", title: "Etykieta", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "benefits",
      title: "Zalety przedszkola",
      type: "array",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "icon", title: "Ikona (emoji)", type: "string" }),
          defineField({ name: "title", title: "Tytuł", type: "string" }),
          defineField({ name: "desc", title: "Opis", type: "string" }),
        ],
      }],
    }),
    defineField({
      name: "testimonial",
      title: "Opinia rodzica",
      type: "object",
      fields: [
        defineField({ name: "quote", title: "Cytat", type: "text" }),
        defineField({ name: "author", title: "Autor", type: "string" }),
        defineField({ name: "role", title: "Podpis", type: "string" }),
      ],
    }),
  ],
});
