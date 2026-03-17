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
  ],
});
