This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## CRM leadów

`/studio` → **CRM — Leady**: dokumenty `submission` („Zgłoszenia / Leady”) pod prywatnym ID
`submission.<uuid>` (niewidoczne w publicznym API — dataset jest publiczny). Nowy lead dodajemy
przyciskiem „Nowy lead” w liście CRM (globalne „Utwórz” i „Duplikuj” są wyłączone, bo nadałyby
publiczne ID).

- **Listy:** 🔍 Do weryfikacji (N) — licznik na żywo, Do kontaktu dziś (`nextContactAt` ≤ koniec dnia,
  status nie umowa/rezygnacja/spam), Nowe, W kontakcie (kontakt + wizyta_umowiona), Adaptacja, Umowy,
  Rezygnacje / spam, Wszystkie.
- **Statusy (`status`):** `do_weryfikacji` (start KAŻDEGO zgłoszenia — WWW, lead-hub, ręcznie), `nowy`
  („Lead — nowy”), `kontakt`, `wizyta_umowiona`, `adaptacja`, `umowa`, `rezygnacja`, `spam`.
  Stare wartości `new` / `in_progress` / `done` zostają na liście jako „(stare) …”
  (new → Nowe, in_progress → W kontakcie, done → tylko Wszystkie). Dokument **bez pola `status`**
  (zgłoszenia sprzed CRM) trafia do „Do weryfikacji” — nie wiemy, czy ktoś go przejrzał.
- **Weryfikacja:** w dokumencie ze statusem `do_weryfikacji` (lub bez statusu) główne przyciski to
  **✅ To lead** (`status: "nowy"` + publikacja) i **🚫 To spam** (`status: "spam"` + publikacja).
  W innych statusach te same akcje są w menu „…” obok „Opublikuj”.
- **Źródło (`source`):** `www_rekrutacja`, `www_konsultacja`, `facebook_lead_ads`, `google_business`,
  `email`, `telefon`, `recznie`. Stare zgłoszenia bez `source` — liczone z `type`.
- **Pola:** `language` (pl/en/uk/inny), `childBirthDate`, `nextContactAt`, `notes[]` ({text, at, author}),
  `assignedTo`, `utm` {source, medium, campaign}, `gclid`, `fbclid`, `externalId` (tylko do odczytu).
- **Formularze WWW:** `POST /api/contact` zapisuje lead (`source` www_*, `language` pl, UTM/gclid/fbclid
  z adresu — pierwszy kontakt w sesji) i wysyła mail przez Resend.
- **FB Lead Ads / e-mail:** leady zapisuje do Sanity `przystanzucha-ops/lead-hub` na FRIDAY,
  deduplikując po `externalId`. Wartości statusów i źródeł to kontrakt — słowniki w `src/sanity/crm.ts`.

### Link do zgłoszenia w Studio (kontrakt dla lead-hub / Telegrama)

```
https://www.przystanzucha.pl/studio/intent/edit/id=<_id>;type=submission/
```

`<_id>` to opublikowane ID dokumentu, np. `submission.3f2c…` (bez prefiksu `drafts.`; kropki i myślniki
nie wymagają kodowania). Studio ma `basePath: "/studio"` (`sanity.config.ts`) — bez tego router Studio
nie rozpoznaje adresów `/studio/…`. Końcowy `/` to kanoniczna forma przy `trailingSlash: true` w Next.js
(wersja bez ukośnika też zwraca 200 i otwiera Studio). Niezalogowany użytkownik widzi ekran
logowania Sanity, a po zalogowaniu wraca pod ten sam adres i otwiera się dokument.

Zmienne w Vercel: `SANITY_WRITE_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL` (adresaci po przecinku),
opcjonalnie `CONTACT_FROM` / `RESEND_FROM_EMAIL` (domena nadawcy musi być zweryfikowana w Resend).
Stare zgłoszenia na publicznych ID: `SANITY_AUTH_TOKEN=… npx tsx scripts/private-submissions.ts`.

## Analityka (GTM/GA4)

Kontener Google Tag Manager ładuje się **tylko w części publicznej** (layout `src/app/(site)`), nigdy
w `/studio`. Tagi (GA4, Google Ads `AW-18511309808`, ewentualnie Meta) konfigurujemy w GTM, nie w kodzie.

- **Env:** `NEXT_PUBLIC_GTM_ID=GTM-WTCRG8VR` (kontener Przystań Zucha: GA4 `G-KS1JVFWK81`,
  Google Ads `AW-18511309808`; ustawiamy w Vercel → Production/Preview, przykład w `.env.example`). Zmienna jest wkompilowana
  w build — po ustawieniu/zmianie trzeba zrobić redeploy. Brak lub zły format (`GTM-[A-Z0-9]+`) →
  nic się nie ładuje: ani GTM, ani baner cookies, ani link „Ustawienia cookies”.
- **Kod:** `src/lib/analytics.ts` (`pushEvent`, Consent Mode, kontrakt zdarzeń),
  `src/components/GoogleTagManager.tsx` (loader + `<noscript>`), `CookieConsent.tsx` (baner),
  `CookieSettingsLink.tsx` (link w stopce), `ClickTracking.tsx` (jeden globalny listener kliknięć).

### Consent Mode v2

Jeden skrypt inline (`next/script`, `afterInteractive`) w kolejności:
1. `gtag('consent','default', …)` — `ad_storage`, `ad_user_data`, `ad_personalization`,
   `analytics_storage` = `denied`; `functionality_storage`, `security_storage` = `granted`; `wait_for_update: 500`.
2. Jeśli użytkownik wybrał wcześniej — `gtag('consent','update', …)` z zapisanego wyboru.
3. `gtm.js`.

Brak wyboru = `denied`. Baner: „Akceptuję wszystkie” / „Tylko niezbędne” / „Ustawienia”
(analityczne → `analytics_storage`, marketingowe → `ad_storage` + `ad_user_data` + `ad_personalization`).
Wybór w `localStorage` pod `pz_zgody_cookies` (`{v, ts, analytics, marketing}`); ważny 12 miesięcy,
podbicie `CONSENT_VERSION` wymusza ponowne pytanie. Po decyzji: `gtag('consent','update', …)` +
zdarzenie `consent_update`. Link „Ustawienia cookies” w stopce otwiera baner ponownie.
W GTM: tagi Google mają wbudowaną obsługę zgód; tagi spoza Google (np. Meta Pixel) ustawić na
„Wymagaj dodatkowej zgody” (`ad_storage`).

### Zdarzenia dataLayer (kontrakt dla tagów w GTM)

**Do dataLayer nigdy nie trafiają dane osobowe** (imię, e-mail, telefon, treść wiadomości).

| Zdarzenie | Kiedy | Parametry |
|---|---|---|
| `generate_lead` | po **udanej** wysyłce formularza (odpowiedź 2xx z `/api/contact`) | `form_type`: `rekrutacja` \| `konsultacja`, `lead_source`: `www`, `child_age` (tylko rekrutacja: `2`–`6`) |
| `form_start` | pierwsza interakcja (focus/zmiana pola) z formularzem — raz na wypełnienie | `form_type` |
| `click_to_call` | kliknięcie linku `tel:` | `link_location`: `menu` \| `stopka` \| `formularz` \| `tresc` |
| `click_email` | kliknięcie linku `mailto:` | `link_location` |
| `click_social` | kliknięcie linku do Facebooka / Instagrama | `social_network`: `facebook` \| `instagram`, `link_location` |
| `consent_update` | zapis wyboru w banerze | `consent_analytics`, `consent_marketing`: `granted` \| `denied` |

Proponowana konfiguracja w GTM: wyzwalacze „Zdarzenie niestandardowe” o powyższych nazwach;
GA4 — zdarzenia o tych samych nazwach (parametry przez zmienne warstwy danych), `generate_lead`
oznaczone jako kluczowe; Google Ads — konwersja na `generate_lead` (osobne akcje per `form_type`
wg potrzeb) i ewentualnie `click_to_call`. Strona jest SPA (App Router) — page_view dla przejść
między podstronami: w GA4 „Pomiar zaawansowany → zmiany historii przeglądania” albo wyzwalacz
„Zmiana historii” w GTM.
## Strona (redesign po audycie 13.10.2026)

- **Treści:** wszystkie w Sanity — patrz „Edycja treści (Sanity)” niżej (fakty tylko potwierdzone przez placówkę).
- **Wygląd:** tokeny kolorów w `src/app/globals.css` (paleta z sal: granat, morski, piasek, koral = CTA),
  fonty Fraunces (nagłówki) + Nunito (treść).
- **Pomiar:** GTM + Consent Mode v2 (sekcja „Analityka” niżej). Przyciski CTA mają `data-cta` i `data-loc`
  → zdarzenie `cta_click { cta, link_location }`; `data-loc` nadpisuje też `link_location` w `click_to_call`.
- **SEO:** `robots.ts`, `sitemap.ts`, canonical na każdej stronie, JSON-LD `Preschool` + `FAQPage` na stronie głównej.

## Edycja treści (Sanity)

Każdy tekst i zdjęcie strony edytujemy w **/studio** (https://www.przystanzucha.pl/studio/) → **Strona WWW**
(nad „CRM — Leady”). Interfejs Studio jest po polsku (`@sanity/locale-pl-pl`). Dokumenty to singletony
o stałym ID = nazwa typu (bez „Utwórz”/„Duplikuj”/„Usuń”):

| Studio → Strona WWW | Typ / ID | Gdzie na stronie |
|---|---|---|
| Strona główna | `homePage` | `/` — sekcje w stałej kolejności: góra (hero + pieczątka), pas zajęć, Grupy, Adaptacja, Dzień w Przystani, Opinie, Dlaczego my, Kadra, Pytania, Dojazd, Wizyta |
| Kadra | `staffPage` | `/kadra/` + zapowiedź kadry na `/` (pierwsze N osób, pole „Cytat na stronę główną”) |
| Sale | `classroomsPage` | `/sale/` — Sala Morska, Sala Leśna, Wyposażenie, Strefy, Materiały |
| Zajęcia | `activitiesPage` | `/zajecia/` + pas z nazwami zajęć i liczba zajęć na `/` |
| Konsultacja | `consultationPage` | `/konsultacja/` (pola formularza są w kodzie) |
| Polityka prywatności | `privacyPage` | `/polityka-prywatnosci/` — sekcje w Portable Text, dane administratora, data obowiązywania, tabela cookies |
| Ustawienia strony | `siteSettings` | wszędzie: telefon, e-mail, adres (→ mapa i „Nawiguj”), godziny, social, menu, nagłówek, stopka, pasek na telefonie, dokumenty, SEO domyślne i og:image |

- **Układ jest stały** (bez page buildera). Każda sekcja ma przełącznik **„Pokaż sekcję”**, a elementy w sekcjach
  (karty grup, dni adaptacji, zdjęcia galerii, opinie, powody, pytania FAQ, osoby, zajęcia, strefy, materiały,
  sekcje polityki) dodaje się, usuwa i przestawia przeciąganiem. Teksty mają limity długości tam, gdzie dłuższy
  tekst rozjeżdża układ (ostrzeżenie albo blokada publikacji przy twardych limitach, np. znak w pieczątce).
- **Wyróżnienie w nagłówkach:** fragment w `*gwiazdkach*` dostaje kolor (np. `Ludzie, którym *powierzasz* dziecko.`).
  `{liczba}` w tytule Zajęć i w zdaniu „W ramach czesnego…” zamienia się na liczbę zajęć z listy.
- **Zdjęcia:** pole obrazka z punktem centralnym (hotspot — kadrowanie wokół niego) i wymaganym opisem **alt**.
  Puste zdjęcie = ilustracja kreską (komponent `PhotoSlot`).
- **Polityka prywatności:** treść sekcji to Portable Text (akapity, śródtytuły H3, listy, pogrubienie, linki).
  Wstawki „Dane administratora” podstawiają pola z zakładki „Dane administratora” (KRS, NIP, e-mail, telefon,
  data obowiązywania…), „Link: ustawienia cookies” — przycisk otwierający baner zgód, blok „Tabela cookies” —
  karty z listy „Pliki cookies (tabela)”. Numeracja i spis treści tworzą się same.
- **SEO:** każdy dokument strony ma zakładkę SEO (tytuł + opis). Na podstronach Next dopisuje „| Przystań Zucha”,
  tytuł strony głównej jest pełny. Domyślne SEO i obrazek do udostępniania — Ustawienia strony → SEO domyślne.

### Podgląd na żywo (Presentation)

`/studio` → **Podgląd strony**: strona obok edytora, **wersje robocze widoczne od razu** (bez publikowania),
klik w tekst lub zdjęcie na podglądzie otwiera właściwe pole. Nad edytorem widać listę „Używane na stronach”.

- Studio włącza tryb podglądu przez `/api/draft-mode/enable` (`defineEnableDraftMode` — sprawdza jednorazowy
  sekret z Studio, bez niego draft mode się nie włączy), wyłącza przez `/api/draft-mode/disable`.
- Dane: `src/sanity/live.ts` (`defineLive`) — w podglądzie perspektywa `drafts` + **stega** (niewidoczne znaczniki
  w tekstach, z których `VisualEditing` robi klikalne nakładki). Do logiki (href, `tel:`, porównania, JSON-LD)
  zawsze `stegaClean(...)`; metadane pobieramy z `stega: false`.
- Mapowanie stron ↔ dokumentów: `src/sanity/presentation.ts` (`mainDocuments` + `locations`).
- Token do wersji roboczych (tylko serwer): `SANITY_API_READ_TOKEN` (token **Viewer**), a do czasu jego dodania
  w Vercel — `SANITY_WRITE_TOKEN` (`src/sanity/client.ts → previewToken`). Do przeglądarki nie trafia żaden token
  (`browserToken: false`) — podgląd wersji roboczych działa w Presentation tool.
- Otwarty poza Studio podgląd pokazuje przycisk „Podgląd wersji roboczych — wyłącz”.
- Podgląd/Studio wymaga, żeby origin był na liście CORS projektu Sanity (jest `https://www.przystanzucha.pl`
  i `http://localhost:3000`; podglądów Vercel `*.vercel.app` nie ma).

### Odświeżanie po publikacji

Strony są statyczne (ISR, `revalidate = 60`). `<SanityLive />` w layoucie nasłuchuje zmian (Live Content API)
i unieważnia cache tagami zaraz po publikacji; awaryjnie cache odświeża się co 60 s. Zostaje też
`POST /api/revalidate` (`revalidatePath("/", "layout")`) — do ręcznego wymuszenia albo webhooka.

### Bezpiecznik i migracja

- `src/content/domyslne.ts` i `domyslnaPolityka.ts` = treści ze stanu 14.10.2026. Służą (1) migracji i
  (2) jako bezpiecznik w `src/sanity/fetchers.ts` (`zDomyslnymi`): puste pole w Sanity → wartość domyślna,
  żeby strona się nie wysypała. Listy z Sanity (nawet puste) wygrywają w całości. **Treści zmieniamy w Studio,
  nie w tych plikach.**
- `scripts/migracja-cms.ts` — jednorazowe przeniesienie treści do Sanity (backup do pliku poza repo,
  `createOrReplace` singletonów, CRM `submission` nietknięty); `--na-sucho` bez zapisu,
  `--usun-stare-pola` usuwa pola starego schematu po wdrożeniu.

