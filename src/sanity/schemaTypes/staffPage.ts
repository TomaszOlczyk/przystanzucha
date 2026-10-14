import { defineArrayMember, defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";
import { GRUPY_PODSTRONY, obraz, pasWizyty, seo, tekst, wstepPodstrony } from "./pola";

/** Podstrona /kadra/ — także źródło zapowiedzi kadry na stronie głównej (pierwsze osoby z listy). */
export const staffPage = defineType({
  name: "staffPage",
  title: "Kadra",
  type: "document",
  icon: UsersIcon,
  groups: GRUPY_PODSTRONY,
  fields: [
    seo(),
    wstepPodstrony(),
    defineField({
      name: "members",
      title: "Osoby",
      description: "Przeciągnij, żeby zmienić kolejność. Pierwsze osoby pokazujemy też na stronie głównej.",
      type: "array",
      group: "tresc",
      of: [
        defineArrayMember({
          type: "object",
          name: "osoba",
          title: "Osoba",
          fields: [
            tekst("name", "Imię i nazwisko", { max: 40, wymagane: true }),
            tekst("role", "Stanowisko i kwalifikacje", { max: 160, opis: "Np. „Nauczyciel mianowany, pedagog specjalny, logopeda”." }),
            obraz("image", "Zdjęcie", "Pionowe (portret). Bez zdjęcia pokazujemy inicjały."),
            tekst("description", "Opis (bio)", {
              wiersze: 10,
              opis: "Każdy akapit w nowej linii. Pierwszy akapit wyświetla się większą czcionką.",
            }),
            tekst("quote", "Cytat na stronę główną", {
              max: 200,
              wiersze: 2,
              opis: "Jedno zdanie z bio pokazywane w zapowiedzi kadry na stronie głównej (bez cudzysłowów).",
            }),
            defineField({
              name: "qualifications",
              title: "Dodatkowe kwalifikacje (lista)",
              description: "Opcjonalnie — krótkie hasła z gwiazdką pod opisem.",
              type: "array",
              of: [defineArrayMember({ type: "string" })],
            }),
          ],
          preview: { select: { title: "name", subtitle: "role", media: "image" } },
        }),
      ],
    }),
    pasWizyty(),
  ],
  preview: { prepare: () => ({ title: "Kadra" }) },
});
