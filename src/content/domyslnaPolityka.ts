/**
 * Domyślna treść polityki prywatności (stan na 13.10.2026) w formacie Portable Text — tak samo jak w Sanity.
 * Służy migracji (`scripts/migracja-cms.ts`) i jako bezpiecznik, gdy dokument w Sanity jest pusty.
 * NIE edytuj tu treści — zmieniaj ją w /studio → Strona WWW → Polityka prywatności.
 *
 * Dane administratora: odpis aktualny KRS 0001109519 (api-krs.ms.gov.pl, stan na 13.10.2026).
 */
import type { PortableTextBlock } from "next-sanity";
import type { PrivacyPage } from "@/sanity/types";

// --- Mini-DSL do budowania Portable Text (klucze deterministyczne, żeby migracja była powtarzalna) ---
let licznik = 0;
const klucz = (prefiks: string) => `${prefiks}${(licznik++).toString(36)}`;

type Pole = "fullName" | "preschool" | "street" | "zip" | "city" | "krs" | "nip" | "regon" | "email" | "phone" | "effectiveDate";
type Czesc = string | { b: string } | { a: string; href: string } | { pole: Pole; pogrubienie?: boolean } | { cookiesLink: true };

const b = (tekst: string): Czesc => ({ b: tekst });
const a = (tekst: string, href: string): Czesc => ({ a: tekst, href });
const dane = (pole: Pole, pogrubienie = false): Czesc => ({ pole, pogrubienie });
const MAIL = dane("email");
const TEL = dane("phone");

function blok(czesci: Czesc[], extra: Record<string, unknown> = {}): PortableTextBlock {
  const markDefs: { _key: string; _type: "link"; href: string }[] = [];
  const children = czesci.map((c) => {
    if (typeof c === "string") return { _type: "span", _key: klucz("s"), text: c, marks: [] };
    if ("b" in c) return { _type: "span", _key: klucz("s"), text: c.b, marks: ["strong"] };
    if ("a" in c) {
      const def = { _key: klucz("l"), _type: "link" as const, href: c.href };
      markDefs.push(def);
      return { _type: "span", _key: klucz("s"), text: c.a, marks: [def._key] };
    }
    if ("pole" in c) return { _type: "adminData", _key: klucz("d"), field: c.pole, ...(c.pogrubienie ? { bold: true } : {}) };
    return { _type: "cookieSettingsLink", _key: klucz("c") };
  });
  return { _type: "block", _key: klucz("b"), style: "normal", markDefs, children, ...extra } as PortableTextBlock;
}

const p = (...czesci: Czesc[]) => blok(czesci);
const h3 = (tekst: string) => blok([tekst], { style: "h3" });
const li = (...czesci: Czesc[]) => blok(czesci, { listItem: "bullet", level: 1 });
const tabelaCookies = (): PortableTextBlock => ({ _type: "cookieTable", _key: klucz("t") }) as unknown as PortableTextBlock;

const sekcja = (anchor: string, title: string, body: PortableTextBlock[]) => ({ _key: anchor, anchor, title, body });

export const domyslnaPolityka: PrivacyPage = {
  seo: {
    title: "Polityka prywatności",
    description:
      "Jak Przystań Zucha sp. z o.o. przetwarza dane osobowe osób korzystających ze strony przedszkola: formularze, kontakt, pliki cookies, analityka i Twoje prawa (RODO).",
  },
  badge: "RODO",
  title: "Polityka *prywatności*",
  lead: "Jak przetwarzamy dane osób, które odwiedzają naszą stronę i kontaktują się z przedszkolem.",
  effectiveLabel: "Obowiązuje od",
  effectiveDate: "2026-10-13",
  tocTitle: "Spis treści",
  administrator: {
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
  },
  cookieRows: [
    {
      _key: "niezbedne",
      category: "Niezbędne (zawsze aktywne)",
      names: "`pz_zgody_cookies` (localStorage), `pz_atrybucja` (sessionStorage) — nasza strona",
      purpose:
        "Zapamiętanie Twojego wyboru zgód (12 miesięcy) oraz zachowanie informacji o źródle wejścia do czasu wysłania formularza (do zamknięcia karty przeglądarki).",
    },
    {
      _key: "analityczne",
      category: "Analityczne (za zgodą)",
      names: "`_ga`, `_ga_*` — Google Analytics 4",
      purpose: "Statystyki odwiedzin i korzystania ze strony; do 2 lat (dane w Google Analytics — do 14 miesięcy).",
    },
    {
      _key: "marketingowe",
      category: "Marketingowe (za zgodą)",
      names: "`_gcl_au`, `_gcl_aw` oraz cookies Google Ads/DoubleClick w domenach Google (np. `IDE`) — Google",
      purpose: "Pomiar konwersji z reklam i remarketing; zwykle do 90 dni (cookies w domenach Google — do 13 miesięcy).",
    },
    {
      _key: "meta",
      category: "Marketingowe — po wdrożeniu Piksela Meta (za zgodą)",
      names: "`_fbp`, `_fbc` — Meta",
      purpose: "Pomiar skuteczności reklam na Facebooku i Instagramie oraz remarketing; do 90 dni.",
    },
  ],
  sections: [
    sekcja("administrator", "Administrator danych", [
      p(
        "Administratorem Twoich danych osobowych jest ",
        dane("fullName", true),
        " z siedzibą w Łodzi, ",
        dane("street"),
        ", ",
        dane("zip"),
        " ",
        dane("city"),
        ", wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego pod numerem KRS ",
        dane("krs"),
        ", NIP ",
        dane("nip"),
        ", REGON ",
        dane("regon"),
        " — organ prowadzący ",
        dane("preschool"),
        " (dalej: „Administrator”, „my”)."
      ),
      p("Kontakt w sprawach danych osobowych: e-mail ", MAIL, ", tel. ", TEL, ", lub pisemnie na adres siedziby."),
      p(
        "Niniejsza polityka dotyczy danych przetwarzanych w związku z korzystaniem ze strony internetowej przedszkola, formularzy kontaktowych oraz kontaktem z nami przez e-mail, telefon i media społecznościowe. Zasady przetwarzania danych dzieci uczęszczających do przedszkola i ich rodziców (po zawarciu umowy) określają odrębne dokumenty przedszkola."
      ),
    ]),
    sekcja("iod", "Inspektor Ochrony Danych", [
      p(
        "Administrator nie wyznaczył Inspektora Ochrony Danych. We wszystkich sprawach dotyczących ochrony danych osobowych możesz kontaktować się z nami bezpośrednio: ",
        MAIL,
        ", tel. ",
        TEL,
        "."
      ),
    ]),
    sekcja("cele", "Jakie dane przetwarzamy i w jakim celu", [
      h3("Formularz rekrutacyjny"),
      p(
        "Przetwarzamy: imię i nazwisko rodzica lub opiekuna, imię dziecka, wiek dziecka, adres e-mail, numer telefonu oraz wybrany język strony. Dane służą do kontaktu w sprawie rekrutacji, przedstawienia oferty i zapisu dziecka do przedszkola. O dziecku zbieramy wyłącznie imię i wiek — nie prosimy o informacje o zdrowiu ani inne dane szczególnych kategorii."
      ),
      h3("Formularz konsultacji"),
      p(
        "Przetwarzamy: imię, adres e-mail, numer telefonu, preferowany termin spotkania i treść wiadomości (jeśli ją podasz). Dane służą do umówienia i przeprowadzenia konsultacji oraz odpowiedzi na Twoje pytania. Prosimy, by w wiadomości nie podawać informacji o zdrowiu dziecka — o takich sprawach porozmawiamy osobiście."
      ),
      h3("Informacje o źródle zgłoszenia"),
      p(
        "Razem ze zgłoszeniem zapisujemy informację, skąd trafiłeś na stronę — parametry kampanii z adresu strony (utm_source, utm_medium, utm_campaign) oraz identyfikatory kliknięcia reklamy (gclid — Google, fbclid — Facebook/Instagram), jeśli występowały w adresie. Dzięki temu wiemy, które działania promocyjne przynoszą zgłoszenia. Prowadzimy też ewidencję zgłoszeń (status, notatki z kontaktu), aby sprawnie obsłużyć rekrutację."
      ),
      h3("Kontakt e-mail i telefoniczny"),
      p(
        "Gdy piszesz lub dzwonisz, przetwarzamy dane, które nam przekażesz (np. imię, adres e-mail, numer telefonu, treść korespondencji), aby odpowiedzieć na Twoje pytanie lub prowadzić dalszą rozmowę o rekrutacji."
      ),
      h3("Facebook, Instagram i formularze reklam Meta"),
      p(
        "Prowadzimy profile przedszkola na Facebooku i Instagramie. Gdy do nas napiszesz, skomentujesz lub polubisz post, przetwarzamy Twoją nazwę profilu i treść interakcji, aby odpowiedzieć i prowadzić komunikację. Jeśli wypełnisz formularz w reklamie na Facebooku/Instagramie (tzw. formularz kontaktowy Meta), otrzymujemy dane, które w nim podasz (zwykle imię, e-mail, telefon i odpowiedzi na pytania formularza), i wykorzystujemy je tak samo jak zgłoszenia z naszej strony. W zakresie statystyk profilu (Page Insights) jesteśmy współadministratorem razem z Meta Platforms Ireland Ltd. — zasady opisuje ",
        a("uzupełnienie Meta dotyczące administratora strony", "https://www.facebook.com/legal/terms/page_controller_addendum"),
        ". Meta przetwarza dane użytkowników także we własnych celach jako odrębny administrator — zob. ",
        a("politykę prywatności Meta", "https://www.facebook.com/privacy/policy"),
        "."
      ),
      h3("Wizytówka Google"),
      p(
        "Jeśli wystawisz opinię lub napiszesz do nas przez wizytówkę przedszkola w Google, przetwarzamy nazwę Twojego profilu i treść wpisu, aby odpowiedzieć. Google przetwarza te dane jako odrębny administrator — ",
        a("polityka prywatności Google", "https://policies.google.com/privacy?hl=pl"),
        "."
      ),
      h3("Statystyki i reklama (tylko za Twoją zgodą)"),
      p(
        "Jeśli wyrazisz zgodę w banerze cookies, korzystamy z Google Analytics 4 (statystyki odwiedzin), Google Ads (pomiar konwersji, czyli tego, czy reklama doprowadziła do wysłania formularza, oraz remarketing — wyświetlanie reklam osobom, które odwiedziły stronę) i w przyszłości z Piksela Meta (analogiczny pomiar dla reklam na Facebooku i Instagramie). Narzędzia te ładujemy przez Google Tag Manager. Do narzędzi analitycznych i reklamowych nie przekazujemy danych wpisanych w formularze (imienia, e-maila, telefonu, treści wiadomości) — wysyłamy tylko informację o samym zdarzeniu (np. „wysłano formularz rekrutacyjny”). Szczegóły w sekcji ",
        a("Pliki cookies", "#cookies"),
        "."
      ),
    ]),
    sekcja("podstawy", "Podstawy prawne przetwarzania", [
      li(
        b("Art. 6 ust. 1 lit. b RODO"),
        " — działania na Twoje żądanie przed zawarciem umowy o wychowanie przedszkolne: obsługa formularza rekrutacyjnego, kontakt w sprawie zapisu dziecka."
      ),
      li(
        b("Art. 6 ust. 1 lit. f RODO"),
        " — nasz prawnie uzasadniony interes: odpowiedź na pytania i umówienie konsultacji, korespondencja e-mail i telefoniczna, komunikacja w mediach społecznościowych, prowadzenie ewidencji zgłoszeń i mierzenie, skąd pochodzą zgłoszenia, a także ustalenie, dochodzenie lub obrona przed roszczeniami."
      ),
      li(
        b("Art. 6 ust. 1 lit. a RODO"),
        " w zw. z art. 399 ustawy — Prawo komunikacji elektronicznej — Twoja zgoda: analityczne i marketingowe pliki cookies oraz związane z nimi przetwarzanie danych (Google Analytics, Google Ads, Piksel Meta)."
      ),
      li(
        b("Art. 6 ust. 1 lit. c RODO"),
        " — obowiązek prawny, np. rozpatrzenie żądania dotyczącego Twoich danych i rozliczalność wobec organu nadzorczego."
      ),
      p("Wobec przetwarzania opartego na prawnie uzasadnionym interesie możesz w każdej chwili wnieść sprzeciw (zob. „Twoje prawa”)."),
    ]),
    sekcja("okres", "Jak długo przechowujemy dane", [
      li(
        b("Zgłoszenia z formularzy i korespondencja w sprawie rekrutacji lub konsultacji"),
        " — do zakończenia rekrutacji, której dotyczy zgłoszenie, a najdłużej 12 miesięcy od ostatniego kontaktu. Jeśli zawrzemy umowę o wychowanie przedszkolne, dane przechowujemy zgodnie z zasadami dotyczącymi dokumentacji przedszkola."
      ),
      li(
        b("Dane przetwarzane na podstawie zgody"),
        " — do czasu jej wycofania lub wygaśnięcia (pytamy o zgodę ponownie po 12 miesiącach). Dane w Google Analytics są przechowywane maksymalnie 14 miesięcy."
      ),
      li(
        b("Komunikacja w mediach społecznościowych"),
        " — przez czas istnienia wpisu lub wiadomości w serwisie albo do czasu wniesienia sprzeciwu."
      ),
      li("Okresy te mogą zostać przedłużone o czas przedawnienia roszczeń, jeśli dane są potrzebne do ich ustalenia, dochodzenia lub obrony."),
    ]),
    sekcja("odbiorcy", "Komu przekazujemy dane", [
      p(
        "Nie sprzedajemy danych. Dostęp do nich mają upoważnieni pracownicy przedszkola oraz podmioty, które świadczą dla nas usługi i przetwarzają dane w naszym imieniu na podstawie umów powierzenia:"
      ),
      li(b("Vercel Inc."), " (USA) — hosting strony internetowej;"),
      li(b("Sanity AS"), " (Norwegia, EOG) — system zarządzania treścią, w którym przechowujemy zgłoszenia z formularzy i ich ewidencję;"),
      li(b("Resend"), " (Plus Five Five, Inc., USA) — wysyłka powiadomień e-mail o nowych zgłoszeniach;"),
      li(b("dostawca usług IT"), " obsługujący stronę i system zgłoszeń, w tym serwer zlokalizowany w Polsce służący do analizy i obsługi zgłoszeń;"),
      li(
        b("Google Ireland Limited / Google LLC"),
        " — Google Tag Manager, Google Analytics i Google Ads (w zakresie objętym Twoją zgodą), poczta i narzędzia biurowe, o ile z nich korzystamy;"
      ),
      li(
        b("Meta Platforms Ireland Ltd."),
        " — obsługa profili w serwisach Facebook i Instagram, formularze reklam oraz (po wdrożeniu i za Twoją zgodą) Piksel Meta."
      ),
      p(
        "Dane mogą też otrzymać podmioty uprawnione na podstawie przepisów prawa (np. sądy, organy państwowe) — wyłącznie gdy obowiązek ich przekazania wynika z prawa."
      ),
    ]),
    sekcja("transfer", "Przekazywanie danych poza EOG", [
      p(
        "Część naszych dostawców (Vercel, Resend, Google, Meta) ma siedziby lub infrastrukturę w USA, więc dane mogą być przekazywane poza Europejski Obszar Gospodarczy. Odbywa się to na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony danych w ramach programu EU-US Data Privacy Framework (wobec podmiotów certyfikowanych) lub standardowych klauzul umownych zatwierdzonych przez Komisję Europejską (art. 46 ust. 2 lit. c RODO). Kopię zabezpieczeń możesz otrzymać, kontaktując się z nami."
      ),
    ]),
    sekcja("cookies", "Pliki cookies i podobne technologie", [
      p(
        "Pliki cookies to niewielkie pliki zapisywane w Twojej przeglądarce. Podobnie działa pamięć przeglądarki (localStorage, sessionStorage). Pliki niezbędne stosujemy zawsze; analityczne i marketingowe — dopiero po wyrażeniu zgody w banerze. Do czasu wyboru wszystkie zgody poza niezbędnymi są wyłączone (Google Consent Mode v2). Bez zgody narzędzia Google mogą otrzymywać jedynie ograniczone sygnały bez plików cookies (np. informację o odsłonie lub konwersji bez identyfikatora użytkownika), wykorzystywane do zbiorczego modelowania statystyk."
      ),
      tabelaCookies(),
      p(
        "Zgodę możesz w każdej chwili zmienić lub wycofać — ",
        { cookiesLink: true },
        " Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej wycofaniem. Cookies możesz też usunąć lub zablokować w ustawieniach przeglądarki. Informacje o tym, jak Google wykorzystuje dane z witryn, znajdziesz na stronie ",
        a("policies.google.com/technologies/partner-sites", "https://policies.google.com/technologies/partner-sites?hl=pl"),
        "."
      ),
    ]),
    sekcja("prawa", "Twoje prawa", [
      p("W związku z przetwarzaniem danych masz prawo do:"),
      li("dostępu do swoich danych i otrzymania ich kopii;"),
      li("sprostowania (poprawienia) danych;"),
      li("usunięcia danych;"),
      li("ograniczenia przetwarzania;"),
      li("przenoszenia danych — w zakresie danych przetwarzanych na podstawie zgody lub umowy;"),
      li("sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie, w tym w celach marketingowych;"),
      li("wycofania zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania przed jej wycofaniem;"),
      li(
        "wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa, ",
        a("uodo.gov.pl", "https://uodo.gov.pl"),
        "), jeśli uważasz, że przetwarzamy Twoje dane niezgodnie z prawem."
      ),
      p(
        "Aby skorzystać z praw, napisz na ",
        MAIL,
        " lub zadzwoń: ",
        TEL,
        ". Odpowiemy bez zbędnej zwłoki, nie później niż w ciągu miesiąca. Możemy poprosić o informacje pozwalające potwierdzić Twoją tożsamość."
      ),
    ]),
    sekcja("dobrowolnosc", "Dobrowolność podania danych i profilowanie", [
      p(
        "Podanie danych jest dobrowolne, ale bez danych kontaktowych nie będziemy mogli odpowiedzieć na zgłoszenie ani przeprowadzić rekrutacji. Wyrażenie zgody na cookies analityczne i marketingowe jest dobrowolne i nie wpływa na możliwość korzystania ze strony."
      ),
      p(
        "Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym przetwarzaniu, w tym profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób istotnie na Ciebie wpływały. Narzędzia reklamowe (za Twoją zgodą) mogą dopasowywać wyświetlane reklamy do Twoich zainteresowań — nie ma to wpływu na rekrutację."
      ),
    ]),
    sekcja("bezpieczenstwo", "Bezpieczeństwo danych", [
      p(
        "Strona korzysta z szyfrowanego połączenia (HTTPS). Dostęp do zgłoszeń mają wyłącznie upoważnione osoby, a dostawców usług wybieramy tak, aby zapewniali odpowiednie zabezpieczenia techniczne i organizacyjne."
      ),
    ]),
    sekcja("zmiany", "Zmiany polityki prywatności", [
      p(
        "Polityka obowiązuje od ",
        dane("effectiveDate"),
        " Możemy ją aktualizować, np. przy zmianie wykorzystywanych narzędzi lub przepisów — aktualna wersja jest zawsze dostępna na tej stronie wraz z datą wejścia w życie. Jeśli zmiana dotyczy narzędzi wymagających zgody, poprosimy o nią ponownie."
      ),
    ]),
  ],
};
