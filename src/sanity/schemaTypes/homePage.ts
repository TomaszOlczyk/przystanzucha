import { defineArrayMember, defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";
import { motyw, obraz, OPIS_AKCENTU, pokazSekcje, seo, tekst } from "./pola";

/**
 * Strona główna — STAŁY układ sekcji (kolejność jak na stronie). Każdą sekcję można ukryć przełącznikiem
 * „Pokaż sekcję”, a elementy w sekcjach (grupy, dni adaptacji, zdjęcia, opinie, powody, pytania) dodawać,
 * usuwać i przestawiać przeciąganiem.
 */
function sekcja(name: string, title: string, group: string, fields: ReturnType<typeof defineField>[], description?: string) {
  return defineField({
    name,
    title,
    description,
    type: "object",
    group,
    options: { collapsible: true, collapsed: false },
    fields,
  });
}

export const homePage = defineType({
  name: "homePage",
  title: "Strona główna",
  type: "document",
  icon: HomeIcon,
  groups: [
    { name: "hero", title: "1. Góra strony", default: true },
    { name: "grupy", title: "2. Grupy" },
    { name: "adaptacja", title: "3. Adaptacja" },
    { name: "galeria", title: "4. Dzień w Przystani" },
    { name: "opinie", title: "5. Opinie" },
    { name: "powody", title: "6. Dlaczego my" },
    { name: "kadra", title: "7. Kadra" },
    { name: "pytania", title: "8. Pytania" },
    { name: "dojazd", title: "9. Dojazd" },
    { name: "kontakt", title: "10. Wizyta" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    seo("Pełny tytuł strony głównej w Google i w karcie przeglądarki (bez automatycznego dopisku)."),

    sekcja("hero", "Góra strony (hero)", "hero", [
      defineField({
        name: "showBadge",
        title: "Pokaż plakietkę rekrutacji",
        description: "Pigułka z migającą kropką nad tytułem.",
        type: "boolean",
        initialValue: true,
      }),
      tekst("badge", "Plakietka rekrutacji", { max: 60, opis: "Np. „Rekrutacja 2026/2027: nabór do Grupy 2”." }),
      tekst("title", "Tytuł (H1)", { max: 50, wymagane: true, opis: `${OPIS_AKCENTU} Wyróżnione słowo dostaje żółte podkreślenie.` }),
      tekst("lead", "Wstęp", { max: 260, wiersze: 4 }),
      tekst("primaryCta", "Tekst przycisku", { max: 30, twardyLimit: true, opis: "Przycisk przewija do formularza wizyty." }),
      tekst("infoLine", "Linijka pod przyciskami", { max: 80, opis: "Adres i godziny w skrócie, np. „ul. Maratońska 49C/U3, Łódź Retkinia · pn–pt 7:00–17:00”." }),
      obraz("image", "Zdjęcie główne (łuk)", "Pionowe zdjęcie w łuku. Ustaw punkt centralny (hotspot) na twarzy/najważniejszym miejscu. Bez twarzy dzieci bez zgody rodziców."),
      obraz("secondImage", "Zdjęcie dodatkowe (polaroid)", "Mniejsze, przekrzywione zdjęcie w prawym dolnym rogu."),
      defineField({
        name: "stamp",
        title: "Obracająca się pieczątka",
        type: "object",
        options: { collapsible: true, collapsed: true },
        fields: [
          defineField({ name: "show", title: "Pokaż pieczątkę", type: "boolean", initialValue: true }),
          tekst("ringText", "Tekst na okręgu", { max: 48, twardyLimit: true, opis: "Powtórz frazę 2×, żeby wypełnić okrąg, np. „trwa nabór · grupa 2 · trwa nabór · grupa 2 ·”." }),
          tekst("number", "Znak w środku", { max: 2, twardyLimit: true, opis: "1–2 znaki, np. „2”." }),
          tekst("label", "Opis dla czytników ekranu", { max: 60, opis: "Np. „Grupa 2: trwa nabór”. Pieczątka przewija do sekcji Grupy." }),
        ],
      }),
    ]),

    sekcja("activitiesStrip", "Pas z nazwami zajęć (pod hero)", "hero", [
      pokazSekcje(),
      tekst("srLabel", "Wstęp dla czytników ekranu", { max: 60, opis: "Nazwy zajęć pobieramy automatycznie ze strony Zajęcia." }),
    ]),

    sekcja("groups", "Grupy", "grupy", [
      pokazSekcje(),
      tekst("label", "Etykieta sekcji", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 60 }),
      tekst("lead", "Wstęp", { max: 220, wiersze: 3 }),
      defineField({
        name: "items",
        title: "Karty grup",
        description: "Przeciągnij, żeby zmienić kolejność. Najlepiej wyglądają 2 karty obok siebie.",
        type: "array",
        validation: (rule) => rule.max(4).warning("Więcej niż 4 karty to długa sekcja."),
        of: [
          defineArrayMember({
            type: "object",
            name: "grupa",
            title: "Grupa",
            fields: [
              tekst("tag", "Nazwa grupy i sali", { max: 40, opis: "Np. „Grupa 1 · Sala Morska”." }),
              tekst("status", "Status naboru", { max: 30, opis: "Np. „Trwa nabór”, „Zapytaj o wolne miejsca”." }),
              defineField({
                name: "highlight",
                title: "Wyróżnij (koralowy status z migającą kropką)",
                type: "boolean",
                initialValue: false,
              }),
              tekst("title", "Tytuł", { max: 60 }),
              tekst("text", "Opis", { max: 320, wiersze: 4 }),
              tekst("ctaText", "Link pod opisem (opcjonalnie)", { max: 40, opis: "Np. „Opowiedz nam o dziecku →” — przewija do formularza. Puste = bez linku." }),
              obraz("image", "Zdjęcie sali"),
              motyw(),
            ],
            preview: { select: { title: "tag", subtitle: "status", media: "image" } },
          }),
        ],
      }),
      tekst("specialists", "Tekst o specjalistach (pod kartami)", { max: 260, wiersze: 3 }),
      tekst("specialistsLinkText", "Link do kadry", { max: 30 }),
    ]),

    sekcja("adaptation", "Adaptacja — „Pierwszy tydzień”", "adaptacja", [
      pokazSekcje(),
      tekst("label", "Etykieta sekcji", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 50 }),
      tekst("intro", "Wstęp", { max: 200, wiersze: 2 }),
      defineField({
        name: "days",
        title: "Dni (oś czasu)",
        description: "Na komputerze dni stoją w jednym rzędzie — najlepiej 5. Ostatni dzień ma wypełnione kółko.",
        type: "array",
        validation: (rule) => rule.max(6).warning("Więcej niż 6 dni nie zmieści się w rzędzie."),
        of: [
          defineArrayMember({
            type: "object",
            name: "dzien",
            title: "Dzień",
            fields: [
              tekst("day", "Skrót dnia", { max: 3, twardyLimit: true, opis: "Np. „Pn” — mieści się w kółku." }),
              tekst("title", "Tytuł", { max: 40 }),
              tekst("text", "Opis", { max: 140, wiersze: 2 }),
            ],
            preview: { select: { title: "title", subtitle: "day" } },
          }),
        ],
      }),
      tekst("closing", "Zdanie podsumowania", { max: 120 }),
      tekst("note", "Przypis (małym drukiem)", { max: 160 }),
    ]),

    sekcja("gallery", "Dzień w Przystani (galeria)", "galeria", [
      pokazSekcje(),
      tekst("label", "Etykieta sekcji", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 50 }),
      tekst("lead", "Wstęp", { max: 200, wiersze: 2 }),
      defineField({
        name: "items",
        title: "Zdjęcia",
        description: "Najlepiej 4 (jeden rząd na komputerze). Bez twarzy dzieci bez zgody rodziców. Bez zdjęcia pokazujemy ilustrację.",
        type: "array",
        validation: (rule) => rule.max(8).warning("Najlepiej 4 lub 8 zdjęć."),
        of: [
          defineArrayMember({
            type: "object",
            name: "zdjecieGalerii",
            title: "Zdjęcie",
            fields: [tekst("caption", "Podpis", { max: 40 }), obraz("image", "Zdjęcie"), motyw()],
            preview: { select: { title: "caption", media: "image" } },
          }),
        ],
      }),
    ]),

    sekcja("testimonials", "Opinie rodziców", "opinie", [
      pokazSekcje(),
      defineField({
        name: "items",
        title: "Opinie",
        description: "Wpisuj tylko prawdziwe opinie (np. z Google) — za zgodą autora, imię i inicjał nazwiska.",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "opinia",
            title: "Opinia",
            fields: [
              tekst("quote", "Cytat", { max: 360, wiersze: 4 }),
              tekst("author", "Autor", { max: 40, opis: "Np. „Paulina W.”." }),
              tekst("role", "Kim jest", { max: 40, opis: "Np. „mama” — wyświetla się po przecinku za autorem." }),
            ],
            preview: { select: { title: "author", subtitle: "quote" } },
          }),
        ],
      }),
    ]),

    sekcja("reasons", "Dlaczego my", "powody", [
      pokazSekcje(),
      tekst("label", "Etykieta sekcji", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 70 }),
      defineField({
        name: "items",
        title: "Powody",
        description: "Najlepiej 3 (jeden rząd na komputerze).",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "powod",
            title: "Powód",
            fields: [tekst("title", "Tytuł", { max: 40 }), tekst("text", "Opis", { max: 220, wiersze: 3 })],
            preview: { select: { title: "title", subtitle: "text" } },
          }),
        ],
      }),
      tekst("feesText", "Zdanie o zajęciach w czesnym", {
        max: 80,
        opis: "{liczba} zamieniamy na liczbę zajęć ze strony Zajęcia. Np. „W ramach czesnego: {liczba} zajęć bez dopłat.”.",
      }),
      tekst("feesLinkText", "Link do zajęć", { max: 30 }),
    ]),

    sekcja(
      "staff",
      "Kadra (zapowiedź)",
      "kadra",
      [
        pokazSekcje(),
        tekst("label", "Etykieta sekcji", { max: 30 }),
        tekst("heading", "Nagłówek", { max: 60 }),
        tekst("lead", "Wstęp", { max: 220, wiersze: 3 }),
        defineField({
          name: "count",
          title: "Ile osób pokazać",
          description: "Pierwsze osoby z listy na stronie Kadra (kolejność ustawiasz tam).",
          type: "number",
          initialValue: 3,
          validation: (rule) => rule.min(1).max(6).integer(),
        }),
        tekst("linkText", "Link do strony Kadra", { max: 30 }),
      ],
      "Osoby, zdjęcia i cytaty edytujesz w dokumencie „Kadra” (pole „Cytat na stronę główną”)."
    ),

    sekcja("faq", "Pytania rodziców (FAQ)", "pytania", [
      pokazSekcje(),
      tekst("label", "Etykieta sekcji", { max: 30 }),
      tekst("heading", "Nagłówek", { max: 40 }),
      tekst("helpText", "Tekst przed numerem telefonu", { max: 80 }),
      defineField({
        name: "items",
        title: "Pytania i odpowiedzi",
        description: "Trafiają też do Google (dane strukturalne FAQ).",
        type: "array",
        of: [
          defineArrayMember({
            type: "object",
            name: "pytanie",
            title: "Pytanie",
            fields: [
              tekst("question", "Pytanie", { max: 90, wymagane: true }),
              tekst("answer", "Odpowiedź", { max: 500, wiersze: 4, wymagane: true }),
            ],
            preview: { select: { title: "question", subtitle: "answer" } },
          }),
        ],
      }),
    ]),

    sekcja(
      "location",
      "Dojazd",
      "dojazd",
      [
        pokazSekcje(),
        tekst("label", "Etykieta sekcji", { max: 30 }),
        tekst("heading", "Nagłówek", { max: 40 }),
        tekst("lead", "Wstęp", { max: 220, wiersze: 3 }),
        tekst("addressTitle", "Adres — pierwsza linia", { max: 50, opis: "Np. „ul. Maratońska 49C, lokal U3”." }),
        tekst("addressSubtitle", "Adres — druga linia", { max: 60, opis: "Np. „94-102 Łódź, osiedle Retkinia”." }),
        tekst("navigateText", "Przycisk nawigacji", { max: 30 }),
        tekst("callText", "Link „Zadzwoń”", { max: 40 }),
        tekst("hint", "Podpowiedź (małym drukiem)", { max: 160 }),
      ],
      "Mapa i link do nawigacji liczone są z adresu w „Ustawieniach strony”."
    ),

    sekcja(
      "contact",
      "Wizyta (formularz kontaktowy)",
      "kontakt",
      [
        defineField({
          name: "show",
          title: "Pokaż sekcję",
          description: "Uwaga: przyciski „Umów wizytę” w całym serwisie prowadzą do tej sekcji — nie wyłączaj jej bez potrzeby.",
          type: "boolean",
          initialValue: true,
        }),
        tekst("label", "Etykieta sekcji", { max: 30 }),
        tekst("heading", "Nagłówek", { max: 60 }),
        tekst("lead", "Wstęp", { max: 220, wiersze: 3 }),
        tekst("phoneLabel", "Etykieta: telefon", { max: 20 }),
        tekst("addressLabel", "Etykieta: adres", { max: 20 }),
        tekst("navigateText", "Link nawigacji przy adresie", { max: 20 }),
        tekst("hoursLabel", "Etykieta: godziny", { max: 20 }),
      ],
      "Telefon, adres i godziny pochodzą z „Ustawień strony”."
    ),
  ],
  preview: { prepare: () => ({ title: "Strona główna" }) },
});
