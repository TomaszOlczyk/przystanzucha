/**
 * Domyślne treści strony = stan z 14.10.2026 (po redesignie z 13.10).
 *
 * Do czego służą:
 *  1. `scripts/migracja-cms.ts` zapisuje je do Sanity (razem ze zdjęciami) — od tego momentu źródłem prawdy jest Studio.
 *  2. Bezpiecznik w `src/sanity/fetchers.ts`: gdy pole w Sanity jest puste (albo dokumentu brak), strona pokazuje
 *     wartość stąd, zamiast się wysypać. NIE edytuj tu treści — zmieniaj je w /studio.
 *
 * Zdjęć tu nie ma celowo: puste zdjęcie = ilustracja kreską (PhotoSlot), a nie „przywrócone” stare zdjęcie.
 * Liczby i fakty tylko potwierdzone — nie dopisuj ceny ani wielkości grup bez potwierdzenia placówki.
 */
import type {
  ActivitiesPage,
  ClassroomsPage,
  ConsultationPage,
  HomePage,
  SiteSettings,
  StaffPage,
} from "@/sanity/types";

export const domyslneUstawienia: SiteSettings = {
  name: "Przystań Zucha",
  legalName: "Przystań Zucha Sp. z o.o.",
  phone: "+48 510 131 146",
  email: "rekrutacja@przystanzucha.pl",
  hours: "Poniedziałek – Piątek: 7:00 – 17:00",
  address: { street: "ul. Maratońska 49C/U3", zip: "94-102", city: "Łódź", district: "Retkinia" },
  social: {
    facebook: "https://www.facebook.com/p/Przedszkole-Przysta%C5%84-ZUCHA-61556466219631/",
    instagram: "https://instagram.com/przystanzucha",
  },
  recruitmentYear: "2026/2027",
  navigation: [
    { _key: "nav-grupy", label: "Grupy", href: "/#grupy" },
    { _key: "nav-adaptacja", label: "Adaptacja", href: "/#adaptacja" },
    { _key: "nav-kadra", label: "Kadra", href: "/kadra/" },
    { _key: "nav-sale", label: "Sale", href: "/sale/" },
    { _key: "nav-zajecia", label: "Zajęcia", href: "/zajecia/" },
    { _key: "nav-pytania", label: "Pytania", href: "/#pytania" },
    { _key: "nav-dojazd", label: "Dojazd", href: "/#dojazd" },
  ],
  header: { ctaText: "Umów wizytę" },
  mobileBar: { callText: "Zadzwoń", ctaText: "Umów bezpłatną wizytę" },
  visitCtaButton: "Umów bezpłatną wizytę",
  footer: {
    heading: "Do zobaczenia *na Retkini.*",
    ctaText: "Umów bezpłatną wizytę",
    description: "Kameralne przedszkole z elementami pedagogiki Montessori na łódzkiej Retkini.",
    addressLabel: "Adres",
    navigateText: "Nawiguj do przedszkola",
    contactLabel: "Kontakt",
    linksLabel: "Na skróty",
    privacyLinkText: "Polityka prywatności",
  },
  seo: {
    title: "Przystań Zucha — kameralne przedszkole Montessori w Łodzi (Retkinia)",
    description:
      "Kameralne przedszkole z elementami Montessori na Retkini w Łodzi. Dwie małe grupy, adaptacja z rodzicem, 10 zajęć w czesnym.",
  },
  documents: [],
};

export const domyslnaStronaGlowna: HomePage = {
  seo: {
    title: "Przedszkole Montessori Łódź Retkinia — kameralne grupy | Przystań Zucha",
    description:
      "Kameralne przedszkole z elementami Montessori na Retkini (ul. Maratońska 49C). Dwie małe grupy, adaptacja z rodzicem, 10 zajęć w czesnym. Umów wizytę.",
  },
  hero: {
    showBadge: true,
    badge: "Rekrutacja 2026/2027: nabór do Grupy 2",
    title: "Mała przystań dla *dużych* uczuć.",
    lead: "Kameralne przedszkole z elementami pedagogiki Montessori na łódzkiej Retkini. Dwie małe grupy, łagodna adaptacja z rodzicem i nauczycielki, które znają każde dziecko: wiedzą, co je cieszy, a co niepokoi.",
    primaryCta: "Umów bezpłatną wizytę",
    infoLine: "ul. Maratońska 49C/U3, Łódź Retkinia · pn–pt 7:00–17:00",
    stamp: {
      show: true,
      ringText: "trwa nabór · grupa 2 · trwa nabór · grupa 2 ·",
      number: "2",
      label: "Grupa 2: trwa nabór",
    },
  },
  activitiesStrip: { show: true, srLabel: "Zajęcia w ramach czesnego:" },
  groups: {
    show: true,
    label: "Nasze grupy",
    heading: "Dwie sale, dwie małe grupy.",
    lead: "Rośniemy, ale zostajemy kameralni. Obok Sali Morskiej otworzyliśmy Salę Leśną, więc każda grupa ma teraz własną przestrzeń.",
    items: [
      {
        _key: "grupa-1",
        tag: "Grupa 1 · Sala Morska",
        title: "Dla małych odkrywców",
        text: "Dzień oparty na pedagogice Montessori. Dzieci same wybierają aktywności i uczą się samodzielności, a nauczycielka towarzyszy im i podpowiada, zamiast dyrygować.",
        status: "Zapytaj o wolne miejsca",
        highlight: false,
        motif: "wave",
      },
      {
        _key: "grupa-2",
        tag: "Grupa 2 · Sala Leśna",
        title: "Dla dzieci, którym w mniejszej grupie jest lepiej",
        text: "W 25-osobowej grupie łatwo się zgubić: jest głośno, wszystko dzieje się szybko i brakuje czasu na rozmowę. Grupa 2 jest mniejsza i pracuje w spokojniejszym rytmie. Dziecko dostaje tu więcej uwagi, czasu i bliskości dorosłego.",
        status: "Trwa nabór",
        highlight: true,
        ctaText: "Opowiedz nam o dziecku →",
        motif: "forest",
      },
    ],
    specialists:
      "W zespole są pedagożki specjalne, logopedka i terapeutka TUS. Mają doświadczenie w pracy z dziećmi w spektrum autyzmu i z dziećmi z orzeczeniami.",
    specialistsLinkText: "Poznaj zespół",
  },
  adaptation: {
    show: true,
    label: "Adaptacja",
    heading: "Pierwszy tydzień Antka.",
    intro: "Tak może wyglądać łagodny start w przedszkolu, gdy nikt się nie spieszy.",
    days: [
      { _key: "pn", day: "Pn", title: "Trzyma mamę za rękę", text: "Nikt go nie pogania. Mama siada z nim na dywanie, a nauczycielka stawia obok koszyk z drewnianymi klockami." },
      { _key: "wt", day: "Wt", title: "Sięga po klocki", text: "Ciekawość wygrywa ze strachem. Antek buduje pierwszą wieżę." },
      { _key: "sr", day: "Śr", title: "Mama wychodzi na chwilę", text: "I wraca dokładnie wtedy, kiedy obiecała." },
      { _key: "cz", day: "Cz", title: "Nie zauważa wyjścia mamy", text: "Jest zajęty budową z nowym kolegą." },
      { _key: "pt", day: "Pt", title: "„Jeszcze nie skończyłem!”", text: "Przy odbiorze nie chce wracać do domu." },
    ],
    closing: "Każde dziecko ma swój rytm. Naszym zadaniem jest go uszanować.",
    note: "To przykładowa historia. Tempo adaptacji ustalamy z każdą rodziną indywidualnie.",
  },
  gallery: {
    show: true,
    label: "Zwykły dzień",
    heading: "Dzień w Przystani.",
    lead: "Zabawa, zajęcia, spacer i chwila odpoczynku. Tak wygląda nasz zwykły dzień.",
    items: [
      { _key: "g1", caption: "Poranne zabawy", motif: "blocks" },
      { _key: "g2", caption: "Zajęcia w sali", motif: "book" },
      { _key: "g3", caption: "Spacer i podwórko", motif: "sun" },
      { _key: "g4", caption: "Chwila odpoczynku", motif: "boat" },
    ],
  },
  testimonials: {
    show: true,
    items: [{ _key: "opinia-1", "quote": "Cudowne miejsce, w którym dzieci są świetnie zaopiekowane. Jest to przedszkole, gdzie indywidualne potrzeby dziecka są stawiane na pierwszym miejscu. Ponadto odbywa się tam mnóstwo ciekawych zajęć i zabaw, które bardzo dobrze rozwijają dzieci, ale jednocześnie ich nie przemęczają.",
  "author": "Paulina W.",
  "role": "mama" }],
  },
  reasons: {
    show: true,
    label: "Dlaczego my",
    heading: "Tu dziecko nie musi być gotowe od pierwszego dnia.",
    items: [
      {
        _key: "powod-1",
        title: "Mało dzieci, dużo uwagi",
        text: "Dwie małe grupy w osobnych salach. Nauczycielka ma czas zauważyć, że dziecko jest dziś zmęczone albo smutne, i zareagować, zanim pojawią się łzy.",
      },
      {
        _key: "powod-2",
        title: "Adaptacja razem z rodzicem",
        text: "Pierwsze dni możecie spędzić w przedszkolu razem. Rozstanie przychodzi wtedy, gdy dziecko jest na nie gotowe, a nie wtedy, gdy wypada w kalendarzu.",
      },
      {
        _key: "powod-3",
        title: "Montessori bez presji",
        text: "Nie zmuszamy dzieci do występów ani do zajęć, na które nie są gotowe. Obserwujemy, co je ciekawi, i od tego zaczynamy naukę.",
      },
    ],
    feesText: "W ramach czesnego: {liczba} zajęć bez dopłat.",
    feesLinkText: "Zobacz plan zajęć",
  },
  staff: {
    show: true,
    label: "Kadra",
    heading: "Ludzie, którym powierzasz dziecko.",
    lead: "Pedagożki specjalne, logopedka i terapeutka TUS. Dwie z nas są też mamami, więc wiemy, jak to jest zostawić dziecko w przedszkolu po raz pierwszy.",
    count: 3,
    linkText: "Poznaj cały zespół →",
  },
  faq: {
    show: true,
    label: "Pytania rodziców",
    heading: "Zanim zadzwonisz.",
    helpText: "Nie ma tu odpowiedzi na Twoje pytanie? Zadzwoń:",
    items: [
      {
        _key: "faq-wiek",
        question: "W jakim wieku przyjmujecie dzieci?",
        answer: "Przyjmujemy dzieci od 2 do 6 lat. Podczas rozmowy pomożemy dobrać grupę do wieku i potrzeb dziecka.",
      },
      {
        _key: "faq-godziny",
        question: "W jakich godzinach działa przedszkole?",
        answer: "Od poniedziałku do piątku, w godzinach 7:00–17:00.",
      },
      {
        _key: "faq-adaptacja",
        question: "Jak wygląda adaptacja?",
        answer: "Łagodnie i razem z rodzicem. Pierwsze dni spędzacie w sali wspólnie, a czas rozstania wydłużamy stopniowo, w tempie dziecka.",
      },
      {
        _key: "faq-grupa-2",
        question: "Dla kogo jest Grupa 2?",
        answer: "Dla dzieci, które w dużej grupie czują się zagubione: wrażliwych na hałas, nieśmiałych, mających trudności z adaptacją albo ze specjalnymi potrzebami rozwojowymi. Opowiedz nam o swoim dziecku, a razem sprawdzimy, czy to dla niego dobre miejsce.",
      },
      {
        _key: "faq-orzeczenie",
        question: "Czy pracujecie z dziećmi z orzeczeniem?",
        answer: "Tak. W zespole są pedagożki specjalne i logopedka. Mają doświadczenie w pracy z dziećmi w spektrum autyzmu i z różnymi potrzebami rozwojowymi.",
      },
      {
        _key: "faq-czesne",
        question: "Co obejmuje czesne?",
        answer: "Czesne obejmuje 10 zajęć dodatkowych, m.in. angielski, rytmikę, robotykę, logopedię i gimnastykę korekcyjną, bez dopłat. Aktualną wysokość czesnego podamy podczas rozmowy telefonicznej.",
      },
      {
        _key: "faq-zapisy",
        question: "Kiedy mogę zapisać dziecko?",
        answer: "Rekrutacja trwa przez cały rok, o ile w grupie jest wolne miejsce. Najlepiej zacząć od wizyty: zobaczysz sale i poznasz nauczycielki.",
      },
    ],
  },
  location: {
    show: true,
    label: "Dojazd",
    heading: "Jak do nas trafić.",
    lead: "Jesteśmy na nowym osiedlu na Retkini, w lokalu U3 na parterze nowego wieżowca przy ul. Maratońskiej 49C.",
    addressTitle: "ul. Maratońska 49C, lokal U3",
    addressSubtitle: "94-102 Łódź, osiedle Retkinia",
    navigateText: "Nawiguj w Google Maps",
    callText: "Zadzwoń, gdy nie możesz trafić",
    hint: "Z telefonu najszybciej: kliknij „Nawiguj” i Google Maps poprowadzi Cię pod same drzwi.",
  },
  contact: {
    show: true,
    label: "Wizyta",
    heading: "Przyjdź z dzieckiem i zobacz, jak u nas jest.",
    lead: "Zostaw numer telefonu. Oddzwonimy w ciągu 24 godzin, odpowiemy na pytania i umówimy spokojną wizytę w przedszkolu.",
    phoneLabel: "Telefon",
    addressLabel: "Adres",
    navigateText: "Nawiguj",
    hoursLabel: "Godziny",
  },
};

export const domyslnaKadra: StaffPage = {
  seo: {
    title: "Kadra przedszkola — pedagodzy specjalni, logopeda",
    description:
      "Poznaj nauczycielki Przystani Zucha: pedagodzy specjalni, logopeda, terapeutka TUS. Doświadczenie w pracy z dziećmi w spektrum autyzmu. Łódź, Retkinia.",
  },
  intro: {
    eyebrow: "Kadra",
    title: "Ludzie, którym *powierzasz* dziecko.",
    lead: "Pedagożki specjalne, logopedka i terapeutka TUS. Dwie z nas są też mamami, więc wiemy, jak to jest zostawić dziecko w przedszkolu po raz pierwszy.",
  },
  members: [
  {
    "_key": "member-0",
    "name": "Justyna Olczyk",
    "role": "Nauczyciel mianowany edukacji wczesnoszkolnej, pedagog specjalny, logopeda",
    "description": "Cześć, mam na imię Justyna i jestem nauczycielem, logopedą oraz pedagogiem specjalnym w Przystani Zucha. Prywatnie jestem mamą dwójki dzieci, co sprawia, że na swoją pracę patrzę nie tylko z perspektywy specjalisty, ale także rodzica.\nPrzystań Zucha to miejsce, które sama wybrałabym dla swoich dzieci – przytulne, kameralne przedszkole, w którym panuje atmosfera wzajemnej akceptacji, ciepła i bliskości. Szczególnie ważne jest dla mnie podejście oparte na relacji oraz możliwość wspólnej adaptacji rodzica z dzieckiem, która daje poczucie bezpieczeństwa i łagodny start w nowym środowisku.\nPosiadam również doświadczenie w pracy z dziećmi w spektrum autyzmu. Jako pedagog specjalny wspieram dzieci o zróżnicowanych potrzebach rozwojowych, dbając o indywidualne podejście, zrozumienie i dostosowanie metod pracy do możliwości każdego dziecka.\nJestem miłośniczką książek, dlatego prowadzę zajęcia z bajkoterapii. Wierzę, że to niezwykle wartościowa metoda wspierania rozwoju dzieci – pomaga im lepiej rozumieć emocje, radzić sobie z trudnościami i budować pozytywny obraz siebie oraz świata.\nBliska jest mi również pedagogika Marii Montessori, w której nauczyciel pełni rolę uważnego przewodnika i towarzysza dziecka w jego indywidualnej drodze rozwoju. W swojej pracy stawiam na uważność, szacunek i wspieranie samodzielności.",
    "quote": "Prywatnie jestem mamą dwójki dzieci, co sprawia, że na swoją pracę patrzę nie tylko z perspektywy specjalisty, ale także rodzica.",
    "qualifications": []
  },
  {
    "_key": "member-1",
    "name": "Magda Klimczak",
    "role": "Nauczyciel mianowany edukacji wczesnoszkolnej, pedagog specjalny, terapeuta TUS, nauczyciel wychowania fizycznego",
    "description": "Jestem nauczycielem mianowanym oraz pedagogiem specjalnym z wieloletnim doświadczeniem w pracy z dziećmi. To nie tylko mój zawód, ale przede wszystkim pasja – cenię w niej możliwość wspierania rozwoju najmłodszych, odkrywania ich potencjału oraz budowania relacji opartych na zaufaniu i wzajemnym szacunku.\nPrywatnie jestem mamą dwójki dzieci, co wzbogaca moje podejście do pracy. Pozwala mi jeszcze lepiej rozumieć potrzeby i emocje dzieci – zarówno z perspektywy nauczyciela, jak i rodzica.\nBliski jest mi aktywny i zdrowy styl życia. Kocham sport i ruch, które staram się w naturalny sposób wprowadzać do codzienności dzieci, pokazując im, jak ważne są dla zdrowia, dobrego samopoczucia i harmonijnego rozwoju.\nW swojej pracy wykorzystuję również elementy terapii ręki, wspierając dzieci w rozwijaniu sprawności motorycznej, precyzji ruchów oraz prawidłowego napięcia mięśniowego. To niezwykle istotny obszar, który wpływa nie tylko na naukę pisania, ale także na codzienne funkcjonowanie dziecka.",
    "quote": "Jestem nauczycielem mianowanym oraz pedagogiem specjalnym z wieloletnim doświadczeniem w pracy z dziećmi.",
    "qualifications": []
  },
  {
    "_key": "478a8f66fa2b",
    "name": "Zosia Michalak",
    "role": "Nauczyciel",
    "description": "Cześć! Nazywam się Zosia, jestem na początku swojej drogi zawodowej, wyróżniam się ogromnym zaangażowaniem, świeżym spojrzeniem oraz głową pełną kreatywnych pomysłów.\nZ pasją podchodzę do pracy z dziećmi, dbając o ich rozwój, bezpieczeństwo i radosną atmosferę każdego dnia. Chętnie wprowadzam nowe, ciekawe aktywności, które pobudzają wyobraźnię najmłodszych i zachęcają do odkrywania świata.\nPosiadam doświadczenie zdobyte podczas praktyk pedagogicznych realizowanych w sześciu różnych placówkach edukacyjnych, w tym również w szkole specjalnej, gdzie pracowałam z dziećmi z różnego typu niepełnosprawnościami intelektualnymi. Uczestniczyłam również w szkoleniach dotyczących pracy z dziećmi w spektrum autyzmu, co pozwoliło mi rozwinąć umiejętności dostosowywania metod pracy do indywidualnych potrzeb wychowanków. W swojej pracy kieruję się podejściem opartym na szacunku dla autonomii dziecka oraz wspieraniu jego naturalnej ciekawości poznawczej. Szczególnie bliskie jest mi konstruktywistyczne podejście do edukacji, w którym dziecko aktywnie odkrywa świat poprzez doświadczenie i działanie.",
    "quote": "Z pasją podchodzę do pracy z dziećmi, dbając o ich rozwój, bezpieczeństwo i radosną atmosferę każdego dnia.",
    "qualifications": []
  }
],
  visitCta: {
    heading: "Poznaj nas *osobiście*.",
    text: "Przyjdź z dzieckiem na spokojną wizytę. Porozmawiasz z nauczycielkami i zobaczysz, jak wygląda nasz dzień.",
  },
};

export const domyslneSale: ClassroomsPage = {
  seo: {
    title: "Sala Morska i Sala Leśna — nasze sale",
    description:
      "Dwie kameralne sale: Morska i Leśna. Strefa sensoryczna, materiały Montessori, kącik czytelniczy i tablica interaktywna. Przedszkole Przystań Zucha, Łódź Retkinia.",
  },
  intro: {
    eyebrow: "Sale",
    title: "Sala Morska i *Sala Leśna*.",
    lead: "Każda grupa ma własną salę. Grupa 1 bawi się i uczy w Sali Morskiej, a Grupa 2 w Sali Leśnej. Dzięki małym grupom nikt tu nie ginie w tłumie.",
  },
  seaRoom: {
    show: true,
    label: "Grupa 1",
    heading: "Sala Morska",
    lead: "Mural z wielorybem, dywan w morskie fale i duże, jasne okna. To sala Grupy 1.",
  },
  forestRoom: {
    show: true,
    label: "Grupa 2",
    heading: "Sala Leśna",
    lead: "Nowa sala Grupy 2, czyli dzieci, którym w mniejszej grupie jest lepiej. Dzień płynie tu spokojniej, więc łatwiej się wyciszyć i skupić.",
    linkText: "Zapytaj o wolne miejsce w Grupie 2 →",
  },
  features: {
    show: true,
    label: "Wyposażenie",
    heading: "Co znajdziesz *w salach*.",
    items: [
  "Interaktywna tablica multimedialna",
  "Modułowe meble dostosowane do wzrostu dzieci",
  "Kącik sensoryczny z elementami świetlnymi i dotykowymi",
  "Dywan do zajęć ruchowych i zabaw grupowych",
  "Stoliki do prac plastycznych i edukacyjnych",
  "Kącik czytelniczy z biblioteką bajek"
],
  },
  zones: {
    show: true,
    label: "Strefy",
    heading: "Sala zmienia się *w ciągu dnia*.",
    items: [
  {
    "_key": "use-0",
    "name": "Zajęcia edukacyjne",
    "description": "Stoliki i tablica interaktywna tworzą idealne środowisko do nauki liter, cyfr i odkrywania świata."
  },
  {
    "_key": "use-1",
    "name": "Pracownia plastyczna",
    "description": "Sztalugi, farby, plastelina — sala zamienia się w kreatywną przestrzeń do artystycznego wyrazu."
  },
  {
    "_key": "use-2",
    "name": "Strefa sensoryczna",
    "description": "Kącik sensoryczny z kolumną wodną, światłowodami i panelami dotykowymi wspiera integrację zmysłów."
  },
  {
    "_key": "use-3",
    "name": "Sala do rytmiki",
    "description": "Dywan, lustra i instrumenty Orffa tworzą przestrzeń do zajęć muzycznych i tanecznych."
  },
  {
    "_key": "use-4",
    "name": "Strefa ruchowa",
    "description": "Materace, tunele i przeszkody — sala zamienia się w tor sprawnościowy dla małych sportowców."
  },
  {
    "_key": "use-5",
    "name": "Teatrzyk",
    "description": "Parawan teatralny, kostiumy i rekwizyty pozwalają dzieciom wcielać się w różne role."
  }
],
  },
  learningMaterials: {
    show: true,
    label: "Materiały",
    heading: "Pomoce, z którymi *pracujemy*.",
    items: [
  {
    "_key": "mat-0",
    "category": "Materiały Montessori",
    "items": [
      "Kolorowa gra sotrująca",
      "Drewniane zabawki",
      "Drewniane mozaiki do układania",
      "Drewniane puzzle matematyczne"
    ]
  },
  {
    "_key": "mat-1",
    "category": "Materiały plastyczne",
    "items": [
      "Farby i pędzle",
      "Plastelina i modelina",
      "Papier kolorowy",
      "Materiały do kolażu",
      "Sztalugi",
      "Piankolina"
    ]
  },
  {
    "_key": "mat-2",
    "category": "Zabawki edukacyjne",
    "items": [
      "Klocki LEGO Duplo",
      "Puzzle edukacyjne",
      "Gry planszowe",
      "Tablice magnetyczne",
      "Globusy i mapy"
    ]
  },
  {
    "_key": "mat-3",
    "category": "Technologia",
    "items": [
      "Tablety edukacyjne",
      "Roboty do nauki programowania",
      "Tablica interaktywna",
      "Globus interaktywny"
    ]
  }
],
  },
  visitCta: {
    heading: "Zobacz sale *na żywo*.",
    text: "Najlepiej przyjść z dzieckiem. Zobaczysz, jak reaguje na nowe miejsce i na nauczycielki.",
  },
};

export const domyslneZajecia: ActivitiesPage = {
  seo: {
    title: "Zajęcia w ramach czesnego — angielski, rytmika, logopedia",
    description:
      "10 zajęć w ramach czesnego, bez dopłat: angielski, rytmika, plastyka, gimnastyka korekcyjna, logopedia, sensoryka, terapia ręki, robotyka, przyroda, teatrzyk.",
  },
  intro: {
    eyebrow: "Zajęcia",
    title: "{liczba} zajęć *w ramach czesnego*.",
    lead: "Bez dopłat i bez popołudniowego wożenia dziecka na zajęcia. Program dopasowujemy do grupy tak, żeby wspierać dzieci, a nie je przemęczać.",
  },
  tableHeaders: { no: "Nr", name: "Zajęcia", description: "Na czym polegają", frequency: "Jak często", duration: "Ile trwają" },
  activities: [
  {
    "_key": "activity-0",
    "name": "Język angielski",
    "description": "Nauka angielskiego przez zabawę! Gry, piosenki i opowieści pomagają dzieciom naturalnie oswajać się z językiem i pewnie mówić.",
    "frequency": "1 x w tygodniu",
    "duration": "30 minut"
  },
  {
    "_key": "activity-1",
    "name": "Rytmika i muzyka",
    "description": "Muzyka, rytm i ruch w jednej zabawie! Dzieci poznają melodie, uczą się koordynacji i rozwijają kreatywność.",
    "frequency": "2x w tygodniu",
    "duration": "30 min"
  },
  {
    "_key": "activity-2",
    "name": "Zajęcia plastyczne",
    "description": "Malowanie, rysowanie i tworzenie własnych dzieł – to świetny sposób na rozwijanie wyobraźni i zdolności manualnych.",
    "frequency": "3x w tygodniu",
    "duration": "45 min"
  },
  {
    "_key": "activity-3",
    "name": "Gimnastyka korekcyjna",
    "description": "Ruch i zabawa dla zdrowej postawy! Delikatne ćwiczenia wzmacniają mięśnie i poprawiają koordynację.",
    "frequency": "2x w tygodniu",
    "duration": "30 min"
  },
  {
    "_key": "activity-4",
    "name": "Logopedia",
    "description": "Wsparcie mowy i komunikacji w przyjaznej formie. Ćwiczymy wymowę, oddech i artykulację przez zabawę.",
    "frequency": "Wg potrzeb",
    "duration": "Indywidualnie"
  },
  {
    "_key": "activity-5",
    "name": "Zajęcia sensoryczne",
    "description": "Dotyk, wzrok, słuch i zabawa – ćwiczenia sensoryczne wspierają koncentrację i rozwój poznawczy.",
    "frequency": "2x w tygodniu",
    "duration": "30 min"
  },
  {
    "_key": "activity-6",
    "name": "Terapia ręki",
    "description": "Ćwiczenia dłoni i palców przez zabawę, które pomagają w pisaniu, rysowaniu i codziennych czynnościach.",
    "frequency": "1x w tygodniu",
    "duration": "45 min"
  },
  {
    "_key": "activity-7",
    "name": "Robotyka i kodowanie",
    "description": "Budujemy, programujemy i rozwiązujemy zadania! Dzieci odkrywają świat technologii i logicznego myślenia.",
    "frequency": "1x w tygodniu",
    "duration": "30 min"
  },
  {
    "_key": "activity-8",
    "name": "Zajęcia przyrodnicze",
    "description": "Eksperymenty i obserwacje w terenie i w sali. Dzieci poznają przyrodę i uczą się dbać o środowisko.",
    "frequency": "2x w tygodniu",
    "duration": "30 min"
  },
  {
    "_key": "activity-9",
    "name": "Teatrzyk",
    "description": "Zabawa w role i improwizacje rozwijają wyobraźnię, pewność siebie i umiejętność wyrażania emocji.",
    "frequency": "1x w tygodniu",
    "duration": "30 min"
  }
],
  note: "Nasze nauczycielki mają kwalifikacje z pedagogiki specjalnej, dlatego dostosowujemy zajęcia także do dzieci, które potrzebują dodatkowego wsparcia.",
  visitCta: {
    heading: "Zobacz zajęcia *od środka*.",
    text: "Umów wizytę. Opowiemy o planie dnia i o tym, jak dobieramy zajęcia do dziecka.",
  },
};

export const domyslnaKonsultacja: ConsultationPage = {
  seo: {
    title: "Umów konsultację",
    description:
      "Umów spotkanie w przedszkolu Przystań Zucha: opowiemy o grupach i adaptacji, pokażemy sale i odpowiemy na pytania.",
  },
  breadcrumb: "Konsultacja",
  title: "Porozmawiajmy o *Twoim dziecku*.",
  lead: "Spotkanie trwa tyle, ile potrzebujesz. Opowiemy o grupach i adaptacji, pokażemy sale i odpowiemy na wszystkie pytania, także te, które trudno zadać przez telefon.",
  phoneLabel: "Wolisz od razu zadzwonić?",
};
