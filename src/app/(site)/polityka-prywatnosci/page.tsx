import type { Metadata } from "next";
import type { ReactNode } from "react";
import CookieSettingsLink from "@/components/CookieSettingsLink";
import { GTM_ID } from "@/lib/analytics";
import { POLICY_EFFECTIVE_DATE, PRIVACY_ADMIN as A } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  alternates: { canonical: "/polityka-prywatnosci/" },
  description:
    "Jak Przystań Zucha sp. z o.o. przetwarza dane osobowe osób korzystających ze strony przedszkola: formularze, kontakt, pliki cookies, analityka i Twoje prawa (RODO).",
};

const tel = A.phone.replace(/\s/g, "");

const linkCls = "font-semibold text-[var(--color-sea-dark)] underline underline-offset-4 hover:text-[var(--color-ink)]";

function Mail() {
  return (
    <a href={`mailto:${A.email}`} className={linkCls}>
      {A.email}
    </a>
  );
}

function Phone() {
  return (
    <a href={`tel:${tel}`} className={linkCls}>
      {A.phone}
    </a>
  );
}

function Ext({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={linkCls}>
      {children}
    </a>
  );
}

function UL({ children }: { children: ReactNode }) {
  return <ul className="list-disc pl-5 space-y-1.5 marker:text-[var(--color-sea)]">{children}</ul>;
}

function H3({ children }: { children: ReactNode }) {
  return <h3 className="text-lg font-bold text-[var(--color-ink)] pt-2">{children}</h3>;
}

const cookieRows: { category: string; names: ReactNode; purpose: string }[] = [
  {
    category: "Niezbędne (zawsze aktywne)",
    names: (
      <>
        <code>pz_zgody_cookies</code> (localStorage), <code>pz_atrybucja</code> (sessionStorage) —
        nasza strona
      </>
    ),
    purpose:
      "Zapamiętanie Twojego wyboru zgód (12 miesięcy) oraz zachowanie informacji o źródle wejścia do czasu wysłania formularza (do zamknięcia karty przeglądarki).",
  },
  {
    category: "Analityczne (za zgodą)",
    names: (
      <>
        <code>_ga</code>, <code>_ga_*</code> — Google Analytics 4
      </>
    ),
    purpose:
      "Statystyki odwiedzin i korzystania ze strony; do 2 lat (dane w Google Analytics — do 14 miesięcy).",
  },
  {
    category: "Marketingowe (za zgodą)",
    names: (
      <>
        <code>_gcl_au</code>, <code>_gcl_aw</code> oraz cookies Google Ads/DoubleClick w domenach
        Google (np. <code>IDE</code>) — Google
      </>
    ),
    purpose:
      "Pomiar konwersji z reklam i remarketing; zwykle do 90 dni (cookies w domenach Google — do 13 miesięcy).",
  },
  {
    category: "Marketingowe — po wdrożeniu Piksela Meta (za zgodą)",
    names: (
      <>
        <code>_fbp</code>, <code>_fbc</code> — Meta
      </>
    ),
    purpose:
      "Pomiar skuteczności reklam na Facebooku i Instagramie oraz remarketing; do 90 dni.",
  },
];

type Section = { id: string; title: string; body: ReactNode };

const sections: Section[] = [
  {
    id: "administrator",
    title: "Administrator danych",
    body: (
      <>
        <p>
          Administratorem Twoich danych osobowych jest <strong>{A.fullName}</strong> z siedzibą w
          Łodzi, {A.street}, {A.zip} {A.city}, wpisana do rejestru przedsiębiorców Krajowego
          Rejestru Sądowego pod numerem KRS {A.krs}, NIP {A.nip}, REGON {A.regon} — organ
          prowadzący {A.preschool} (dalej: „Administrator”, „my”).
        </p>
        <p>
          Kontakt w sprawach danych osobowych: e-mail <Mail />, tel. <Phone />, lub pisemnie na
          adres siedziby.
        </p>
        <p>
          Niniejsza polityka dotyczy danych przetwarzanych w związku z korzystaniem ze strony
          internetowej przedszkola, formularzy kontaktowych oraz kontaktem z nami przez e-mail,
          telefon i media społecznościowe. Zasady przetwarzania danych dzieci uczęszczających do
          przedszkola i ich rodziców (po zawarciu umowy) określają odrębne dokumenty przedszkola.
        </p>
      </>
    ),
  },
  {
    id: "iod",
    title: "Inspektor Ochrony Danych",
    body: (
      <p>
        Administrator nie wyznaczył Inspektora Ochrony Danych. We wszystkich sprawach dotyczących
        ochrony danych osobowych możesz kontaktować się z nami bezpośrednio: <Mail />, tel. <Phone />.
      </p>
    ),
  },
  {
    id: "cele",
    title: "Jakie dane przetwarzamy i w jakim celu",
    body: (
      <>
        <H3>Formularz rekrutacyjny</H3>
        <p>
          Przetwarzamy: imię i nazwisko rodzica lub opiekuna, imię dziecka, wiek dziecka, adres
          e-mail, numer telefonu oraz wybrany język strony. Dane służą do kontaktu w sprawie
          rekrutacji, przedstawienia oferty i zapisu dziecka do przedszkola. O dziecku zbieramy
          wyłącznie imię i wiek — nie prosimy o informacje o zdrowiu ani inne dane szczególnych
          kategorii.
        </p>
        <H3>Formularz konsultacji</H3>
        <p>
          Przetwarzamy: imię, adres e-mail, numer telefonu, preferowany termin spotkania i treść
          wiadomości (jeśli ją podasz). Dane służą do umówienia i przeprowadzenia konsultacji oraz
          odpowiedzi na Twoje pytania. Prosimy, by w wiadomości nie podawać informacji o zdrowiu
          dziecka — o takich sprawach porozmawiamy osobiście.
        </p>
        <H3>Informacje o źródle zgłoszenia</H3>
        <p>
          Razem ze zgłoszeniem zapisujemy informację, skąd trafiłeś na stronę — parametry kampanii
          z adresu strony (utm_source, utm_medium, utm_campaign) oraz identyfikatory kliknięcia
          reklamy (gclid — Google, fbclid — Facebook/Instagram), jeśli występowały w adresie.
          Dzięki temu wiemy, które działania promocyjne przynoszą zgłoszenia. Prowadzimy też
          ewidencję zgłoszeń (status, notatki z kontaktu), aby sprawnie obsłużyć rekrutację.
        </p>
        <H3>Kontakt e-mail i telefoniczny</H3>
        <p>
          Gdy piszesz lub dzwonisz, przetwarzamy dane, które nam przekażesz (np. imię, adres
          e-mail, numer telefonu, treść korespondencji), aby odpowiedzieć na Twoje pytanie lub
          prowadzić dalszą rozmowę o rekrutacji.
        </p>
        <H3>Facebook, Instagram i formularze reklam Meta</H3>
        <p>
          Prowadzimy profile przedszkola na Facebooku i Instagramie. Gdy do nas napiszesz,
          skomentujesz lub polubisz post, przetwarzamy Twoją nazwę profilu i treść interakcji, aby
          odpowiedzieć i prowadzić komunikację. Jeśli wypełnisz formularz w reklamie na
          Facebooku/Instagramie (tzw. formularz kontaktowy Meta), otrzymujemy dane, które w nim
          podasz (zwykle imię, e-mail, telefon i odpowiedzi na pytania formularza), i
          wykorzystujemy je tak samo jak zgłoszenia z naszej strony. W zakresie statystyk profilu
          (Page Insights) jesteśmy współadministratorem razem z Meta Platforms Ireland Ltd. — zasady
          opisuje{" "}
          <Ext href="https://www.facebook.com/legal/terms/page_controller_addendum">
            uzupełnienie Meta dotyczące administratora strony
          </Ext>
          . Meta przetwarza dane użytkowników także we własnych celach jako odrębny administrator —
          zob.{" "}
          <Ext href="https://www.facebook.com/privacy/policy">politykę prywatności Meta</Ext>.
        </p>
        <H3>Wizytówka Google</H3>
        <p>
          Jeśli wystawisz opinię lub napiszesz do nas przez wizytówkę przedszkola w Google,
          przetwarzamy nazwę Twojego profilu i treść wpisu, aby odpowiedzieć. Google przetwarza te
          dane jako odrębny administrator —{" "}
          <Ext href="https://policies.google.com/privacy?hl=pl">polityka prywatności Google</Ext>.
        </p>
        <H3>Statystyki i reklama (tylko za Twoją zgodą)</H3>
        <p>
          Jeśli wyrazisz zgodę w banerze cookies, korzystamy z Google Analytics 4 (statystyki
          odwiedzin), Google Ads (pomiar konwersji, czyli tego, czy reklama doprowadziła do
          wysłania formularza, oraz remarketing — wyświetlanie reklam osobom, które odwiedziły
          stronę) i w przyszłości z Piksela Meta (analogiczny pomiar dla reklam na Facebooku i
          Instagramie). Narzędzia te ładujemy przez Google Tag Manager. Do narzędzi analitycznych
          i reklamowych nie przekazujemy danych wpisanych w formularze (imienia, e-maila,
          telefonu, treści wiadomości) — wysyłamy tylko informację o samym zdarzeniu (np. „wysłano
          formularz rekrutacyjny”). Szczegóły w sekcji{" "}
          <a href="#cookies" className={linkCls}>
            Pliki cookies
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "podstawy",
    title: "Podstawy prawne przetwarzania",
    body: (
      <>
        <UL>
          <li>
            <strong>Art. 6 ust. 1 lit. b RODO</strong> — działania na Twoje żądanie przed zawarciem
            umowy o wychowanie przedszkolne: obsługa formularza rekrutacyjnego, kontakt w sprawie
            zapisu dziecka.
          </li>
          <li>
            <strong>Art. 6 ust. 1 lit. f RODO</strong> — nasz prawnie uzasadniony interes:
            odpowiedź na pytania i umówienie konsultacji, korespondencja e-mail i telefoniczna,
            komunikacja w mediach społecznościowych, prowadzenie ewidencji zgłoszeń i mierzenie,
            skąd pochodzą zgłoszenia, a także ustalenie, dochodzenie lub obrona przed roszczeniami.
          </li>
          <li>
            <strong>Art. 6 ust. 1 lit. a RODO</strong> w zw. z art. 399 ustawy — Prawo komunikacji
            elektronicznej — Twoja zgoda: analityczne i marketingowe pliki cookies oraz związane z
            nimi przetwarzanie danych (Google Analytics, Google Ads, Piksel Meta).
          </li>
          <li>
            <strong>Art. 6 ust. 1 lit. c RODO</strong> — obowiązek prawny, np. rozpatrzenie
            żądania dotyczącego Twoich danych i rozliczalność wobec organu nadzorczego.
          </li>
        </UL>
        <p>
          Wobec przetwarzania opartego na prawnie uzasadnionym interesie możesz w każdej chwili
          wnieść sprzeciw (zob. „Twoje prawa”).
        </p>
      </>
    ),
  },
  {
    id: "okres",
    title: "Jak długo przechowujemy dane",
    body: (
      <UL>
        <li>
          <strong>Zgłoszenia z formularzy i korespondencja w sprawie rekrutacji lub
          konsultacji</strong> — do zakończenia rekrutacji, której dotyczy zgłoszenie, a najdłużej
          12 miesięcy od ostatniego kontaktu. Jeśli zawrzemy umowę o wychowanie przedszkolne, dane
          przechowujemy zgodnie z zasadami dotyczącymi dokumentacji przedszkola.
        </li>
        <li>
          <strong>Dane przetwarzane na podstawie zgody</strong> — do czasu jej wycofania lub
          wygaśnięcia (pytamy o zgodę ponownie po 12 miesiącach). Dane w Google Analytics są
          przechowywane maksymalnie 14 miesięcy.
        </li>
        <li>
          <strong>Komunikacja w mediach społecznościowych</strong> — przez czas istnienia wpisu lub
          wiadomości w serwisie albo do czasu wniesienia sprzeciwu.
        </li>
        <li>
          Okresy te mogą zostać przedłużone o czas przedawnienia roszczeń, jeśli dane są potrzebne
          do ich ustalenia, dochodzenia lub obrony.
        </li>
      </UL>
    ),
  },
  {
    id: "odbiorcy",
    title: "Komu przekazujemy dane",
    body: (
      <>
        <p>
          Nie sprzedajemy danych. Dostęp do nich mają upoważnieni pracownicy przedszkola oraz
          podmioty, które świadczą dla nas usługi i przetwarzają dane w naszym imieniu na podstawie
          umów powierzenia:
        </p>
        <UL>
          <li>
            <strong>Vercel Inc.</strong> (USA) — hosting strony internetowej;
          </li>
          <li>
            <strong>Sanity AS</strong> (Norwegia, EOG) — system zarządzania treścią, w którym
            przechowujemy zgłoszenia z formularzy i ich ewidencję;
          </li>
          <li>
            <strong>Resend</strong> (Plus Five Five, Inc., USA) — wysyłka powiadomień e-mail o
            nowych zgłoszeniach;
          </li>
          <li>
            <strong>dostawca usług IT</strong> obsługujący stronę i system zgłoszeń, w tym serwer
            zlokalizowany w Polsce służący do analizy i obsługi zgłoszeń;
          </li>
          <li>
            <strong>Google Ireland Limited / Google LLC</strong> — Google Tag Manager, Google
            Analytics i Google Ads (w zakresie objętym Twoją zgodą), poczta i narzędzia biurowe, o
            ile z nich korzystamy;
          </li>
          <li>
            <strong>Meta Platforms Ireland Ltd.</strong> — obsługa profili w serwisach Facebook i
            Instagram, formularze reklam oraz (po wdrożeniu i za Twoją zgodą) Piksel Meta.
          </li>
        </UL>
        <p>
          Dane mogą też otrzymać podmioty uprawnione na podstawie przepisów prawa (np. sądy,
          organy państwowe) — wyłącznie gdy obowiązek ich przekazania wynika z prawa.
        </p>
      </>
    ),
  },
  {
    id: "transfer",
    title: "Przekazywanie danych poza EOG",
    body: (
      <p>
        Część naszych dostawców (Vercel, Resend, Google, Meta) ma siedziby lub infrastrukturę w
        USA, więc dane mogą być przekazywane poza Europejski Obszar Gospodarczy. Odbywa się to na
        podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony danych w
        ramach programu EU-US Data Privacy Framework (wobec podmiotów certyfikowanych) lub
        standardowych klauzul umownych zatwierdzonych przez Komisję Europejską (art. 46 ust. 2
        lit. c RODO). Kopię zabezpieczeń możesz otrzymać, kontaktując się z nami.
      </p>
    ),
  },
  {
    id: "cookies",
    title: "Pliki cookies i podobne technologie",
    body: (
      <>
        <p>
          Pliki cookies to niewielkie pliki zapisywane w Twojej przeglądarce. Podobnie działa
          pamięć przeglądarki (localStorage, sessionStorage). Pliki niezbędne stosujemy zawsze;
          analityczne i marketingowe — dopiero po wyrażeniu zgody w banerze. Do czasu wyboru
          wszystkie zgody poza niezbędnymi są wyłączone (Google Consent Mode v2). Bez zgody
          narzędzia Google mogą otrzymywać jedynie ograniczone sygnały bez plików cookies (np.
          informację o odsłonie lub konwersji bez identyfikatora użytkownika), wykorzystywane do
          zbiorczego modelowania statystyk.
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          {cookieRows.map((row) => (
            <dl
              key={row.category}
              className="rounded-2xl border border-white/80 bg-white/50 px-4 py-3 text-sm space-y-1.5"
            >
              <dt className="font-bold text-[var(--color-ink)]">{row.category}</dt>
              <dd>
                <span className="font-semibold text-[var(--color-ink)]">Nazwy: </span>
                {row.names}
              </dd>
              <dd>
                <span className="font-semibold text-[var(--color-ink)]">Cel i czas: </span>
                {row.purpose}
              </dd>
            </dl>
          ))}
        </div>
        <p>
          Zgodę możesz w każdej chwili zmienić lub wycofać —{" "}
          {GTM_ID ? (
            <>
              kliknij{" "}
              <CookieSettingsLink className={linkCls} /> (link jest też w stopce strony).
            </>
          ) : (
            <>przez link „Ustawienia cookies” w stopce strony.</>
          )}{" "}
          Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, którego dokonano przed jej
          wycofaniem. Cookies możesz też usunąć lub zablokować w ustawieniach przeglądarki.
          Informacje o tym, jak Google wykorzystuje dane z witryn, znajdziesz na stronie{" "}
          <Ext href="https://policies.google.com/technologies/partner-sites?hl=pl">
            policies.google.com/technologies/partner-sites
          </Ext>
          .
        </p>
      </>
    ),
  },
  {
    id: "prawa",
    title: "Twoje prawa",
    body: (
      <>
        <p>W związku z przetwarzaniem danych masz prawo do:</p>
        <UL>
          <li>dostępu do swoich danych i otrzymania ich kopii;</li>
          <li>sprostowania (poprawienia) danych;</li>
          <li>usunięcia danych;</li>
          <li>ograniczenia przetwarzania;</li>
          <li>przenoszenia danych — w zakresie danych przetwarzanych na podstawie zgody lub umowy;</li>
          <li>
            sprzeciwu wobec przetwarzania opartego na prawnie uzasadnionym interesie, w tym w celach
            marketingowych;
          </li>
          <li>
            wycofania zgody w dowolnym momencie, bez wpływu na zgodność z prawem przetwarzania przed
            jej wycofaniem;
          </li>
          <li>
            wniesienia skargi do Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193
            Warszawa,{" "}
            <Ext href="https://uodo.gov.pl">uodo.gov.pl</Ext>), jeśli uważasz, że przetwarzamy
            Twoje dane niezgodnie z prawem.
          </li>
        </UL>
        <p>
          Aby skorzystać z praw, napisz na <Mail /> lub zadzwoń: <Phone />. Odpowiemy bez zbędnej
          zwłoki, nie później niż w ciągu miesiąca. Możemy poprosić o informacje pozwalające
          potwierdzić Twoją tożsamość.
        </p>
      </>
    ),
  },
  {
    id: "dobrowolnosc",
    title: "Dobrowolność podania danych i profilowanie",
    body: (
      <>
        <p>
          Podanie danych jest dobrowolne, ale bez danych kontaktowych nie będziemy mogli
          odpowiedzieć na zgłoszenie ani przeprowadzić rekrutacji. Wyrażenie zgody na cookies
          analityczne i marketingowe jest dobrowolne i nie wpływa na możliwość korzystania ze
          strony.
        </p>
        <p>
          Nie podejmujemy wobec Ciebie decyzji opartych wyłącznie na zautomatyzowanym
          przetwarzaniu, w tym profilowaniu, które wywoływałyby skutki prawne lub w podobny sposób
          istotnie na Ciebie wpływały. Narzędzia reklamowe (za Twoją zgodą) mogą dopasowywać
          wyświetlane reklamy do Twoich zainteresowań — nie ma to wpływu na rekrutację.
        </p>
      </>
    ),
  },
  {
    id: "bezpieczenstwo",
    title: "Bezpieczeństwo danych",
    body: (
      <p>
        Strona korzysta z szyfrowanego połączenia (HTTPS). Dostęp do zgłoszeń mają wyłącznie
        upoważnione osoby, a dostawców usług wybieramy tak, aby zapewniali odpowiednie
        zabezpieczenia techniczne i organizacyjne.
      </p>
    ),
  },
  {
    id: "zmiany",
    title: "Zmiany polityki prywatności",
    body: (
      <p>
        Polityka obowiązuje od {POLICY_EFFECTIVE_DATE} Możemy ją aktualizować, np. przy zmianie
        wykorzystywanych narzędzi lub przepisów — aktualna wersja jest zawsze dostępna na tej
        stronie wraz z datą wejścia w życie. Jeśli zmiana dotyczy narzędzi wymagających zgody,
        poprosimy o nią ponownie.
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <section className="pt-12 pb-16 md:pt-20 md:pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 md:mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[var(--color-line)] text-sm font-bold mb-5">
            <span className="text-[var(--color-sea-dark)]">RODO</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold mb-4">
            Polityka <span className="italic text-[var(--color-sea)]">prywatności</span>
          </h1>
          <p className="text-lg text-[var(--color-ink-soft)] max-w-2xl mx-auto">
            Jak przetwarzamy dane osób, które odwiedzają naszą stronę i kontaktują się z
            przedszkolem.
          </p>
          <p className="text-sm text-[var(--color-ink-soft)] mt-3">
            Obowiązuje od {POLICY_EFFECTIVE_DATE}
          </p>
        </div>

        <nav aria-labelledby="spis-tresci" className="card p-6 md:p-8 mb-8">
          <h2 id="spis-tresci" className="text-lg font-bold mb-3">
            Spis treści
          </h2>
          <ol className="grid gap-x-8 gap-y-1.5 sm:grid-cols-2 list-decimal pl-5 text-sm marker:text-[var(--color-sea)]">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[var(--color-ink-soft)] hover:text-[var(--color-sea-dark)] transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="space-y-6">
          {sections.map((s, i) => (
            <article
              key={s.id}
              id={s.id}
              className="card p-6 md:p-8 scroll-mt-24 md:scroll-mt-28"
            >
              <h2 className="text-2xl font-semibold mb-4">
                <span className="text-[var(--color-sea)] mr-2">{i + 1}.</span>
                {s.title}
              </h2>
              <div className="space-y-3 text-[15px] leading-relaxed text-[var(--color-ink-soft)] break-words">
                {s.body}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
