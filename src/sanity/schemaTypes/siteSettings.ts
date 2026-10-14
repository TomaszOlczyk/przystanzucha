import { defineArrayMember, defineField, defineType } from "sanity";
import { CogIcon } from "@sanity/icons";
import { obraz, OPIS_AKCENTU, tekst, wGrupie } from "./pola";

/** Ustawienia całego serwisu: dane kontaktowe, menu, stopka, pasek na telefonie, SEO domyślne. */
export const siteSettings = defineType({
  name: "siteSettings",
  title: "Ustawienia strony",
  type: "document",
  icon: CogIcon,
  groups: [
    { name: "kontakt", title: "Kontakt i adres", default: true },
    { name: "menu", title: "Menu i przyciski" },
    { name: "stopka", title: "Stopka" },
    { name: "seo", title: "SEO domyślne" },
  ],
  fields: [
    ...wGrupie("kontakt", [
    tekst("name", "Nazwa przedszkola", { max: 40, wymagane: true, opis: "Logo, tytuły, dane strukturalne Google." }),
    tekst("legalName", "Nazwa spółki (stopka ©)", { max: 60 }),
    tekst("phone", "Telefon", { max: 20, wymagane: true, opis: "Format: +48 510 131 146 — z niego budujemy linki „Zadzwoń”." }),
    defineField({
      name: "email",
      title: "E-mail",
      type: "string",
      validation: (rule) => rule.required().email().error("Podaj poprawny adres e-mail."),
    }),
    tekst("hours", "Godziny otwarcia", { max: 50, opis: "Np. „Poniedziałek – Piątek: 7:00 – 17:00”." }),
    defineField({
      name: "address",
      title: "Adres",
      description: "Z adresu liczymy mapę i link „Nawiguj” (Google Maps).",
      type: "object",
      options: { columns: 2 },
      fields: [
        tekst("street", "Ulica i numer", { max: 40, wymagane: true, opis: "Np. „ul. Maratońska 49C/U3”." }),
        tekst("zip", "Kod pocztowy", { max: 6, wymagane: true }),
        tekst("city", "Miasto", { max: 30, wymagane: true }),
        tekst("district", "Osiedle", { max: 30, opis: "Np. „Retkinia”." }),
      ],
    }),
    defineField({
      name: "social",
      title: "Media społecznościowe",
      type: "object",
      fields: [
        defineField({ name: "facebook", title: "Facebook (adres URL)", type: "url" }),
        defineField({ name: "instagram", title: "Instagram (adres URL)", type: "url" }),
      ],
    }),
    tekst("recruitmentYear", "Rok rekrutacji", { max: 9, opis: "Np. „2026/2027” — zapisujemy go przy zgłoszeniu z formularza." }),
    defineField({
      name: "documents",
      title: "Dokumenty do pobrania (stopka)",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "dokument",
          title: "Dokument",
          fields: [
            tekst("title", "Nazwa dokumentu", { max: 40, wymagane: true, opis: "Np. „Statut przedszkola”." }),
            defineField({ name: "file", title: "Plik", type: "file", validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: "title" } },
        }),
      ],
    }),
    ]),

    defineField({
      name: "navigation",
      title: "Menu",
      description: "Pozycje menu (góra strony i „Na skróty” w stopce). Link do sekcji strony głównej: /#grupy, podstrona: /kadra/.",
      type: "array",
      group: "menu",
      validation: (rule) => rule.max(8).warning("Więcej niż 8 pozycji nie zmieści się w menu."),
      of: [
        defineArrayMember({
          type: "object",
          name: "pozycjaMenu",
          title: "Pozycja menu",
          fields: [
            tekst("label", "Tekst", { max: 16, wymagane: true }),
            defineField({
              name: "href",
              title: "Link",
              type: "string",
              description: "Np. /#adaptacja albo /zajecia/ (z ukośnikiem na końcu).",
              validation: (rule) =>
                rule.required().custom((v) => (!v || v.startsWith("/") || v.startsWith("https://") ? true : "Link zaczyna się od / albo https://")),
            }),
          ],
          preview: { select: { title: "label", subtitle: "href" } },
        }),
      ],
    }),
    defineField({
      name: "header",
      title: "Nagłówek strony",
      type: "object",
      group: "menu",
      fields: [tekst("ctaText", "Przycisk w nagłówku", { max: 20, twardyLimit: true })],
    }),
    defineField({
      name: "mobileBar",
      title: "Dolny pasek na telefonie",
      type: "object",
      group: "menu",
      fields: [
        tekst("callText", "Przycisk „Zadzwoń”", { max: 12, twardyLimit: true }),
        tekst("ctaText", "Przycisk wizyty", { max: 24, twardyLimit: true }),
      ],
    }),
    { ...tekst("visitCtaButton", "Przycisk w pasie „Umów wizytę” na podstronach", { max: 30, twardyLimit: true }), group: "menu" },

    defineField({
      name: "footer",
      title: "Stopka",
      type: "object",
      group: "stopka",
      fields: [
        tekst("heading", "Duży napis", { max: 40, opis: `${OPIS_AKCENTU} Wyróżnienie jest żółte.` }),
        tekst("ctaText", "Przycisk", { max: 30 }),
        tekst("description", "Opis pod logo", { max: 140, wiersze: 2 }),
        tekst("addressLabel", "Nagłówek kolumny: adres", { max: 20 }),
        tekst("navigateText", "Link nawigacji", { max: 30 }),
        tekst("contactLabel", "Nagłówek kolumny: kontakt", { max: 20 }),
        tekst("linksLabel", "Nagłówek kolumny: linki", { max: 20 }),
        tekst("privacyLinkText", "Link do polityki prywatności", { max: 30 }),
      ],
    }),

    defineField({
      name: "seo",
      title: "SEO domyślne",
      description: "Używane, gdy podstrona nie ma własnego tytułu/opisu, oraz jako obrazek przy udostępnianiu linku (Facebook, Messenger).",
      type: "object",
      group: "seo",
      fields: [
        tekst("title", "Domyślny tytuł", { max: 70 }),
        tekst("description", "Domyślny opis", { max: 160, wiersze: 3 }),
        obraz("ogImage", "Obrazek do udostępniania (og:image)", "Poziomy, najlepiej 1200×630 px."),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Ustawienia strony" }) },
});
