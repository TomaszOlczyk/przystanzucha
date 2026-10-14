import { sanityFetch } from "./live";
import {
  activitiesPageQuery,
  classroomsPageQuery,
  consultationPageQuery,
  homePageQuery,
  privacyPageQuery,
  siteSettingsQuery,
  staffPageQuery,
} from "./queries";
import type {
  ActivitiesPage,
  ClassroomsPage,
  ConsultationPage,
  HomePage,
  PrivacyPage,
  SiteSettings,
  StaffPage,
} from "./types";
import {
  domyslnaKadra,
  domyslnaKonsultacja,
  domyslnaStronaGlowna,
  domyslneSale,
  domyslneUstawienia,
  domyslneZajecia,
} from "@/content/domyslne";
import { domyslnaPolityka } from "@/content/domyslnaPolityka";

const pusty = (v: unknown) => v === undefined || v === null || (typeof v === "string" && v.trim() === "");
const zwyklyObiekt = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v);

/**
 * Bezpiecznik: wartości z Sanity mają pierwszeństwo, a puste pola (brak / pusty tekst) dostają domyślną
 * treść z `src/content/domyslne.ts`, żeby strona nigdy się nie wysypała. Listy z Sanity (nawet puste)
 * wygrywają w całości — redaktor może celowo usunąć elementy.
 */
export function zDomyslnymi<T>(dane: unknown, domyslne: T): T {
  if (pusty(dane)) return domyslne;
  if (Array.isArray(domyslne)) return (Array.isArray(dane) ? dane : domyslne) as T;
  if (zwyklyObiekt(domyslne) && zwyklyObiekt(dane)) {
    const wynik: Record<string, unknown> = { ...dane };
    for (const [klucz, wartosc] of Object.entries(domyslne)) wynik[klucz] = zDomyslnymi(dane[klucz], wartosc);
    return wynik as T;
  }
  return dane as T;
}

type Opcje = { stega?: boolean };

async function pobierz<T>(query: string, domyslne: T, { stega }: Opcje = {}): Promise<T> {
  const { data } = await sanityFetch({ query, stega });
  return zDomyslnymi(data, domyslne);
}

// `stega: false` do metadanych (<title>, opisy) i danych strukturalnych — tam nie może być niewidocznych znaków.
export const getSiteSettings = (o?: Opcje) => pobierz<SiteSettings>(siteSettingsQuery, domyslneUstawienia, o);
export const getHomePage = (o?: Opcje) => pobierz<HomePage>(homePageQuery, domyslnaStronaGlowna, o);
export const getStaffPage = (o?: Opcje) => pobierz<StaffPage>(staffPageQuery, domyslnaKadra, o);
export const getClassroomsPage = (o?: Opcje) => pobierz<ClassroomsPage>(classroomsPageQuery, domyslneSale, o);
export const getActivitiesPage = (o?: Opcje) => pobierz<ActivitiesPage>(activitiesPageQuery, domyslneZajecia, o);
export const getConsultationPage = (o?: Opcje) => pobierz<ConsultationPage>(consultationPageQuery, domyslnaKonsultacja, o);
export const getPrivacyPage = (o?: Opcje) => pobierz<PrivacyPage>(privacyPageQuery, domyslnaPolityka, o);
