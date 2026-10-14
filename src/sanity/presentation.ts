/**
 * Podgląd na żywo (Presentation tool): które dokumenty edytujemy na której stronie (mainDocuments)
 * i na których stronach dokument jest widoczny (locations — lista „Używane na stronach” nad edytorem).
 */
import { defineDocuments, defineLocations, type PresentationPluginOptions } from "sanity/presentation";

const STRONY = {
  glowna: { title: "Strona główna", href: "/" },
  kadra: { title: "Kadra", href: "/kadra/" },
  sale: { title: "Sale", href: "/sale/" },
  zajecia: { title: "Zajęcia", href: "/zajecia/" },
  konsultacja: { title: "Konsultacja", href: "/konsultacja/" },
  polityka: { title: "Polityka prywatności", href: "/polityka-prywatnosci/" },
};

const tylko = (...strony: { title: string; href: string }[]) => defineLocations({ locations: strony });

export const resolve: PresentationPluginOptions["resolve"] = {
  mainDocuments: defineDocuments([
    { route: "/", filter: `_type == "homePage" && _id == "homePage"` },
    { route: ["/kadra", "/kadra/"], filter: `_type == "staffPage" && _id == "staffPage"` },
    { route: ["/sale", "/sale/"], filter: `_type == "classroomsPage" && _id == "classroomsPage"` },
    { route: ["/zajecia", "/zajecia/"], filter: `_type == "activitiesPage" && _id == "activitiesPage"` },
    { route: ["/konsultacja", "/konsultacja/"], filter: `_type == "consultationPage" && _id == "consultationPage"` },
    { route: ["/polityka-prywatnosci", "/polityka-prywatnosci/"], filter: `_type == "privacyPage" && _id == "privacyPage"` },
  ]),
  locations: {
    homePage: tylko(STRONY.glowna),
    // Kadra i zajęcia są też zapowiadane na stronie głównej.
    staffPage: tylko(STRONY.kadra, STRONY.glowna),
    activitiesPage: tylko(STRONY.zajecia, STRONY.glowna),
    classroomsPage: tylko(STRONY.sale),
    consultationPage: tylko(STRONY.konsultacja),
    privacyPage: tylko(STRONY.polityka),
    // Ustawienia (menu, stopka, kontakt) są na każdej stronie.
    siteSettings: tylko(...Object.values(STRONY)),
  },
};
