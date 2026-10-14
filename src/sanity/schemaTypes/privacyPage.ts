import { defineArrayMember, defineField, defineType } from "sanity";
import { LockIcon } from "@sanity/icons";
import { GRUPY_PODSTRONY, OPIS_AKCENTU, seo, tekst, wGrupie } from "./pola";

const POLA_ADMINISTRATORA = [
  { title: "Pełna nazwa spółki", value: "fullName" },
  { title: "Nazwa przedszkola", value: "preschool" },
  { title: "Ulica", value: "street" },
  { title: "Kod pocztowy", value: "zip" },
  { title: "Miasto", value: "city" },
  { title: "KRS", value: "krs" },
  { title: "NIP", value: "nip" },
  { title: "REGON", value: "regon" },
  { title: "E-mail (link)", value: "email" },
  { title: "Telefon (link)", value: "phone" },
  { title: "Data obowiązywania polityki", value: "effectiveDate" },
];

/**
 * Treść sekcji polityki: akapity, nagłówki H3, listy, pogrubienie, linki, a do tego wstawki
 * „Dane administratora” (podstawiane z pól niżej) i „Link: ustawienia cookies” oraz blok „Tabela cookies”.
 */
const trescPolityki = defineArrayMember({
  type: "block",
  styles: [
    { title: "Akapit", value: "normal" },
    { title: "Śródtytuł (H3)", value: "h3" },
  ],
  lists: [{ title: "Lista punktowana", value: "bullet" }],
  marks: {
    decorators: [
      { title: "Pogrubienie", value: "strong" },
      { title: "Kod (nazwa techniczna)", value: "code" },
    ],
    annotations: [
      defineArrayMember({
        name: "link",
        type: "object",
        title: "Link",
        fields: [
          defineField({
            name: "href",
            title: "Adres",
            description: "https://… (otworzy się w nowej karcie), #cookies (sekcja tej strony), mailto:… lub tel:…",
            type: "string",
            validation: (rule) =>
              rule.required().custom((v) => (!v || /^(https?:\/\/|#|\/|mailto:|tel:)/.test(v) ? true : "Adres musi zaczynać się od https://, #, /, mailto: lub tel:")),
          }),
        ],
      }),
    ],
  },
  of: [
    defineArrayMember({
      name: "adminData",
      type: "object",
      title: "Dane administratora",
      description: "Wstawia wartość z sekcji „Dane administratora” — zmiana tam zmienia ją w całej polityce.",
      fields: [
        defineField({
          name: "field",
          title: "Które pole",
          type: "string",
          options: { list: POLA_ADMINISTRATORA },
          validation: (rule) => rule.required(),
        }),
        defineField({ name: "bold", title: "Pogrubienie", type: "boolean", initialValue: false }),
      ],
      preview: {
        select: { field: "field" },
        prepare: ({ field }) => ({ title: `⟨${POLA_ADMINISTRATORA.find((p) => p.value === field)?.title ?? "pole"}⟩` }),
      },
    }),
    defineArrayMember({
      name: "cookieSettingsLink",
      type: "object",
      title: "Link: ustawienia cookies",
      description: "Wstawia „kliknij Ustawienia cookies (link jest też w stopce strony).” — przycisk otwierający baner zgód.",
      fields: [defineField({ name: "note", title: "Uwagi", type: "string", hidden: true })],
      preview: { prepare: () => ({ title: "⟨link: ustawienia cookies⟩" }) },
    }),
  ],
});

export const privacyPage = defineType({
  name: "privacyPage",
  title: "Polityka prywatności",
  type: "document",
  icon: LockIcon,
  groups: [...GRUPY_PODSTRONY, { name: "admin", title: "Dane administratora" }],
  fields: [
    seo(),
    ...wGrupie("tresc", [
      tekst("badge", "Plakietka nad tytułem", { max: 20 }),
      tekst("title", "Tytuł", { max: 40, opis: OPIS_AKCENTU }),
      tekst("lead", "Wstęp", { max: 200, wiersze: 2 }),
      tekst("effectiveLabel", "Tekst przed datą", { max: 30, opis: "Np. „Obowiązuje od”." }),
      tekst("tocTitle", "Nagłówek spisu treści", { max: 30 }),
    ]),
    defineField({
      name: "effectiveDate",
      title: "Data obowiązywania",
      description: "Zmień przy każdej istotnej zmianie polityki. Wyświetla się pod tytułem i w sekcji „Zmiany polityki”.",
      type: "date",
      group: "tresc",
      options: { dateFormat: "DD.MM.YYYY" },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "sections",
      title: "Sekcje polityki",
      description: "Numeracja i spis treści tworzą się automatycznie. Przeciągnij, żeby zmienić kolejność.",
      type: "array",
      group: "tresc",
      of: [
        defineArrayMember({
          type: "object",
          name: "sekcjaPolityki",
          title: "Sekcja",
          fields: [
            tekst("title", "Tytuł sekcji", { max: 60, wymagane: true }),
            defineField({
              name: "anchor",
              title: "Kotwica (adres sekcji)",
              description: "Małe litery bez polskich znaków, np. „cookies” → link /polityka-prywatnosci/#cookies. Nie zmieniaj istniejących — mogą być do nich linki.",
              type: "string",
              validation: (rule) => rule.required().regex(/^[a-z0-9-]+$/, { name: "kotwica" }).error("Tylko małe litery, cyfry i myślniki."),
            }),
            defineField({
              name: "body",
              title: "Treść",
              type: "array",
              of: [
                trescPolityki,
                defineArrayMember({
                  name: "cookieTable",
                  type: "object",
                  title: "Tabela cookies",
                  description: "Wstawia karty z listy „Pliki cookies (tabela)”.",
                  fields: [defineField({ name: "note", title: "Uwagi", type: "string", hidden: true })],
                  preview: { prepare: () => ({ title: "Tabela cookies (z pola „Pliki cookies (tabela)”)" }) },
                }),
              ],
            }),
          ],
          preview: { select: { title: "title", subtitle: "anchor" } },
        }),
      ],
    }),
    defineField({
      name: "cookieRows",
      title: "Pliki cookies (tabela)",
      description: "Karty wstawiane blokiem „Tabela cookies” w treści.",
      type: "array",
      group: "tresc",
      of: [
        defineArrayMember({
          type: "object",
          name: "kategoriaCookies",
          title: "Kategoria cookies",
          fields: [
            tekst("category", "Kategoria", { max: 60 }),
            tekst("names", "Nazwy", { wiersze: 2, opis: "Nazwy techniczne w `odwrotnych apostrofach` wyświetlą się czcionką kodu." }),
            tekst("purpose", "Cel i czas", { wiersze: 3 }),
          ],
          preview: { select: { title: "category", subtitle: "names" } },
        }),
      ],
    }),
    defineField({
      name: "administrator",
      title: "Dane administratora",
      description: "Podstawiane w treści wstawkami „Dane administratora”. Źródło: odpis KRS.",
      type: "object",
      group: "admin",
      fields: [
        tekst("name", "Nazwa skrócona", { max: 60 }),
        tekst("fullName", "Pełna nazwa spółki", { max: 100 }),
        tekst("preschool", "Nazwa przedszkola", { max: 100 }),
        tekst("street", "Ulica i lokal", { max: 60 }),
        tekst("zip", "Kod pocztowy", { max: 6 }),
        tekst("city", "Miasto", { max: 30 }),
        tekst("krs", "KRS", { max: 10 }),
        tekst("nip", "NIP", { max: 13 }),
        tekst("regon", "REGON", { max: 14 }),
        defineField({ name: "email", title: "E-mail w sprawach danych", type: "string", validation: (rule) => rule.email() }),
        tekst("phone", "Telefon w sprawach danych", { max: 20 }),
      ],
    }),
  ],
  preview: { prepare: () => ({ title: "Polityka prywatności" }) },
});
