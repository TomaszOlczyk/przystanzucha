import { defineType } from "sanity";
import { CommentIcon } from "@sanity/icons";
import { GRUPY_PODSTRONY, OPIS_AKCENTU, seo, tekst, wGrupie } from "./pola";

/** Podstrona /konsultacja/ (formularz umówienia spotkania). Pola formularza są w kodzie. */
export const consultationPage = defineType({
  name: "consultationPage",
  title: "Konsultacja",
  type: "document",
  icon: CommentIcon,
  groups: GRUPY_PODSTRONY,
  fields: [
    seo(),
    ...wGrupie("tresc", [
      tekst("breadcrumb", "Nazwa w okruszku", { max: 30 }),
      tekst("title", "Tytuł", { max: 60, opis: OPIS_AKCENTU }),
      tekst("lead", "Wstęp", { max: 300, wiersze: 4 }),
      tekst("phoneLabel", "Tekst nad numerem telefonu", { max: 40 }),
    ]),
  ],
  preview: { prepare: () => ({ title: "Konsultacja" }) },
});
