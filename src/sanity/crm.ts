/**
 * Słowniki CRM leadów. Wartości (`value`) to KONTRAKT — dokumenty `submission` zapisuje też
 * lead-hub (przystanzucha-ops na FRIDAY). Nie zmieniać wartości bez zmiany po obu stronach.
 */

export const LEAD_SOURCES = [
  { title: "WWW — rekrutacja", value: "www_rekrutacja" },
  { title: "WWW — konsultacja", value: "www_konsultacja" },
  { title: "Facebook Lead Ads", value: "facebook_lead_ads" },
  { title: "Wizytówka Google", value: "google_business" },
  { title: "E-mail", value: "email" },
  { title: "Telefon", value: "telefon" },
  { title: "Dodany ręcznie", value: "recznie" },
] as const;

/**
 * Statusy leada. Każde nowe zgłoszenie (WWW, lead-hub: FB Lead Ads / e-mail, ręcznie w Studio)
 * zaczyna od `do_weryfikacji`; w Studio przyciskami „To lead” / „To spam” przechodzi do `nowy`
 * albo `spam`. Dokument bez pola `status` (bardzo stare zgłoszenia) traktujemy jak `do_weryfikacji`.
 */
export const LEAD_STATUSES = [
  { title: "🔍 Do weryfikacji", value: "do_weryfikacji" },
  { title: "🆕 Lead — nowy", value: "nowy" },
  { title: "📞 Kontakt", value: "kontakt" },
  { title: "📅 Wizyta umówiona", value: "wizyta_umowiona" },
  { title: "🧸 Adaptacja", value: "adaptacja" },
  { title: "✅ Umowa", value: "umowa" },
  { title: "❌ Rezygnacja", value: "rezygnacja" },
  { title: "🚫 Spam", value: "spam" },
  // Stare wartości sprzed CRM — zostają na liście, żeby stare dokumenty nie zgłaszały błędu.
  // W widokach desk: new → "Nowe", in_progress → "W kontakcie", done → tylko "Wszystkie".
  { title: "(stare) Nowe", value: "new" },
  { title: "(stare) W trakcie", value: "in_progress" },
  { title: "(stare) Załatwione", value: "done" },
] as const;

export const LEAD_LANGUAGES = [
  { title: "Polski", value: "pl" },
  { title: "Angielski", value: "en" },
  { title: "Ukraiński", value: "uk" },
  { title: "Inny", value: "inny" },
] as const;

/** Status początkowy każdego nowego zgłoszenia (kontrakt z lead-hub). */
export const INITIAL_STATUS = "do_weryfikacji";

export const STATUS_EMOJI: Record<string, string> = {
  do_weryfikacji: "🔍",
  nowy: "🆕",
  new: "🆕",
  kontakt: "📞",
  in_progress: "📞",
  wizyta_umowiona: "📅",
  adaptacja: "🧸",
  umowa: "✅",
  done: "✔️",
  rezygnacja: "❌",
  spam: "🚫",
};

/** Źródło leada; stare dokumenty bez `source` — wyprowadzamy z `type`. */
export function resolveSource(source?: string, type?: string): string {
  if (source) return source;
  return type === "consultation" ? "www_konsultacja" : "www_rekrutacja";
}

export function sourceLabel(value: string): string {
  return LEAD_SOURCES.find((s) => s.value === value)?.title ?? value;
}

/** Statusy zamknięte — nie pokazujemy ich w "Do kontaktu dziś". */
export const CLOSED_STATUSES = ["umowa", "rezygnacja", "spam"];
