/**
 * Treści strony (copy) po audycie z 13.10.2026.
 * Dane kontaktowe, kadra, zajęcia, zdjęcia i dokumenty nadal pochodzą z Sanity (/studio).
 * Liczby i fakty tylko potwierdzone — nie dopisuj ceny ani wielkości grup bez potwierdzenia placówki.
 */

export const SITE_URL = "https://www.przystanzucha.pl";

export const nav = [
  { label: "Grupy", href: "/#grupy" },
  { label: "Kadra", href: "/kadra/" },
  { label: "Sale", href: "/sale/" },
  { label: "Zajęcia", href: "/zajecia/" },
  { label: "Pytania", href: "/#pytania" },
];

export const hero = {
  badge: "Rekrutacja 2026/2027 — ruszyła Grupa 2",
  heading: "Kameralne przedszkole Montessori",
  headingAccent: "na Retkini",
  lead: "Dwie małe grupy, adaptacja razem z rodzicem i nauczycielki, które znają każde dziecko — także to, czego się boi i co je cieszy.",
  primaryCta: "Umów bezpłatną wizytę",
  chips: ["2 kameralne grupy", "Adaptacja z rodzicem", "10 zajęć w czesnym", "Pn–Pt 7:00–17:00"],
};

export const groups = {
  eyebrow: "Nasze grupy",
  heading: "Dwie sale, dwie małe grupy",
  lead: "Rośniemy, ale nie zmieniamy skali. Otworzyliśmy drugą salę, żeby obie grupy zostały kameralne.",
  items: [
    {
      tag: "Grupa 1",
      title: "Przystań dla ciekawych świata",
      text: "Codzienność oparta na elementach pedagogiki Montessori: samodzielność, swobodny wybór aktywności i nauczycielka jako uważny przewodnik, a nie dyrygent.",
      status: "Zapytaj o wolne miejsca",
    },
    {
      tag: "Grupa 2 · nowość",
      title: "Dla dzieci, którym w dużej grupie jest za głośno",
      text: "Niektóre dzieci gubią się w 25-osobowych grupach przedszkoli publicznych: hałas, pośpiech, brak czasu na rozmowę. Grupa 2 jest kameralna i prowadzona spokojniej — dla dzieci, które potrzebują więcej uwagi, czasu i bliskości dorosłego.",
      status: "Trwa rekrutacja",
      highlight: true,
    },
  ],
  specialists:
    "W zespole są pedagodzy specjalni, logopeda i terapeutka TUS, z doświadczeniem w pracy z dziećmi w spektrum autyzmu i z orzeczeniami.",
};

export const reasons = {
  eyebrow: "Dlaczego rodzice wybierają Przystań",
  heading: "Tu dziecko nie musi być gotowe od pierwszego dnia",
  items: [
    {
      icon: "harbor",
      title: "Mało dzieci, dużo uwagi",
      text: "Dwie kameralne grupy w osobnych salach. Nauczycielka zauważa, że ktoś dziś gorzej spał, zanim zrobi się z tego płacz.",
    },
    {
      icon: "hands",
      title: "Adaptacja razem z rodzicem",
      text: "Pierwsze dni możecie spędzić u nas razem. Rozstanie przychodzi wtedy, gdy dziecko jest na nie gotowe — nie wtedy, gdy wypada w kalendarzu.",
    },
    {
      icon: "leaf",
      title: "Montessori bez presji",
      text: "Nie zmuszamy dzieci do występów ani aktywności, na które nie są gotowe. Obserwujemy, czym się interesują, i od tego zaczynamy naukę.",
    },
  ],
};

export const story = {
  eyebrow: "Pierwszy tydzień w Przystani",
  heading: "Jak wygląda u nas adaptacja",
  paragraphs: [
    "Poniedziałek rano. Antek trzyma mamę za rękę i nie zamierza jej puścić. Nikt go nie pogania. Mama siada z nim na dywanie, a nauczycielka stawia obok koszyk z drewnianymi klockami. Bez słów — po prostu blisko.",
    "We wtorek Antek sam sięga do koszyka. W środę mama wychodzi na chwilę i wraca, tak jak obiecała. W czwartek Antek nie zauważa, kiedy wychodzi.",
    "W piątek przy odbiorze nie chce wracać do domu, bo „jeszcze nie skończył budowy”.",
  ],
  closing: "Każde dziecko ma swój rytm. Naszym zadaniem jest go uszanować.",
  note: "Historia ilustracyjna — tempo adaptacji ustalamy indywidualnie z każdą rodziną.",
};

export const faq = [
  {
    q: "W jakim wieku przyjmujecie dzieci?",
    a: "Przyjmujemy dzieci w wieku od 2 do 6 lat. W rozmowie dobierzemy grupę do wieku i potrzeb dziecka.",
  },
  {
    q: "W jakich godzinach działa przedszkole?",
    a: "Od poniedziałku do piątku w godzinach 7:00–17:00.",
  },
  {
    q: "Jak wygląda adaptacja?",
    a: "Łagodnie i razem z rodzicem. Pierwsze dni możecie spędzić w sali wspólnie, a czas rozstania wydłużamy stopniowo, w tempie dziecka.",
  },
  {
    q: "Dla kogo jest Grupa 2?",
    a: "Dla dzieci, które potrzebują więcej uwagi i spokoju niż daje duża grupa — np. wrażliwych na hałas, nieśmiałych, z trudnościami w adaptacji lub ze specjalnymi potrzebami rozwojowymi. Opowiedz nam o dziecku, a wspólnie sprawdzimy, czy to dobre miejsce.",
  },
  {
    q: "Czy pracujecie z dziećmi z orzeczeniem?",
    a: "Tak. W zespole są pedagodzy specjalni i logopeda, z doświadczeniem w pracy z dziećmi w spektrum autyzmu i o zróżnicowanych potrzebach rozwojowych.",
  },
  {
    q: "Co obejmuje czesne?",
    a: "W ramach czesnego dziecko ma 10 zajęć dodatkowych, m.in. angielski, rytmikę, robotykę, logopedię i gimnastykę korekcyjną — bez dopłat. Aktualną wysokość czesnego podamy w rozmowie telefonicznej.",
  },
  {
    q: "Kiedy mogę zapisać dziecko?",
    a: "Rekrutacja trwa przez cały rok, jeśli w grupie jest wolne miejsce. Najlepiej zacząć od wizyty — zobaczysz sale i poznasz nauczycielki.",
  },
];

export const contact = {
  eyebrow: "Umów wizytę",
  heading: "Przyjdź z dzieckiem i zobacz, jak u nas jest",
  lead: "Zostaw numer — oddzwonimy w ciągu 24 godzin, odpowiemy na pytania i umówimy spokojną wizytę w sali.",
};
