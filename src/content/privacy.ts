/**
 * Dane administratora do polityki prywatności i klauzul informacyjnych.
 * Źródło: odpis aktualny KRS 0001109519 (api-krs.ms.gov.pl, stan na 13.10.2026).
 * Zmiana tych danych = aktualizacja polityki (data w POLICY_EFFECTIVE_DATE).
 */
export const PRIVACY_ADMIN = {
  name: "Przystań Zucha sp. z o.o.",
  fullName: "Przystań Zucha spółka z ograniczoną odpowiedzialnością",
  preschool: "Niepubliczne Przedszkole „Przystań Zucha”",
  street: "ul. Maratońska 49C lok. U3",
  zip: "94-102",
  city: "Łódź",
  krs: "0001109519",
  nip: "7292756724",
  regon: "528826369",
  email: "rekrutacja@przystanzucha.pl",
  phone: "+48 510 131 146",
} as const;

/** Z ukośnikiem na końcu — next.config ma `trailingSlash: true` (bez niego link kończy się 308). */
export const POLICY_PATH = "/polityka-prywatnosci/";
export const POLICY_EFFECTIVE_DATE = "13 października 2026 r.";
