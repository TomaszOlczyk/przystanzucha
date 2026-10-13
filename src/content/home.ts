/**
 * Treści strony (copy) po audycie z 13.10.2026.
 * Dane kontaktowe, kadra, zajęcia, zdjęcia i dokumenty nadal pochodzą z Sanity (/studio).
 * Liczby i fakty tylko potwierdzone — nie dopisuj ceny ani wielkości grup bez potwierdzenia placówki.
 */

export const SITE_URL = "https://www.przystanzucha.pl";

export const nav = [
  { label: "Grupy", href: "/#grupy" },
  { label: "Adaptacja", href: "/#adaptacja" },
  { label: "Kadra", href: "/kadra/" },
  { label: "Sale", href: "/sale/" },
  { label: "Zajęcia", href: "/zajecia/" },
  { label: "Pytania", href: "/#pytania" },
];

export const hero = {
  badge: "Rekrutacja 2026/2027: nabór do Grupy 2",
  lead: "Kameralne przedszkole z elementami pedagogiki Montessori na łódzkiej Retkini. Dwie małe grupy, łagodna adaptacja z rodzicem i nauczycielki, które znają każde dziecko: wiedzą, co je cieszy, a co niepokoi.",
  primaryCta: "Umów bezpłatną wizytę",
};

export const groups = {
  lead: "Rośniemy, ale zostajemy kameralni. Obok Sali Morskiej otworzyliśmy Salę Leśną, więc każda grupa ma teraz własną przestrzeń.",
  items: [
    {
      tag: "Grupa 1 · Sala Morska",
      title: "Dla małych odkrywców",
      text: "Dzień oparty na pedagogice Montessori. Dzieci same wybierają aktywności i uczą się samodzielności, a nauczycielka towarzyszy im i podpowiada, zamiast dyrygować.",
      status: "Zapytaj o wolne miejsca",
    },
    {
      tag: "Grupa 2 · Sala Leśna",
      title: "Dla dzieci, którym w mniejszej grupie jest lepiej",
      text: "W 25-osobowej grupie łatwo się zgubić: jest głośno, wszystko dzieje się szybko i brakuje czasu na rozmowę. Grupa 2 jest mniejsza i pracuje w spokojniejszym rytmie. Dziecko dostaje tu więcej uwagi, czasu i bliskości dorosłego.",
      status: "Trwa nabór",
      highlight: true,
    },
  ],
  specialists:
    "W zespole są pedagożki specjalne, logopedka i terapeutka TUS. Mają doświadczenie w pracy z dziećmi w spektrum autyzmu i z dziećmi z orzeczeniami.",
  staffLead:
    "Pedagożki specjalne, logopedka i terapeutka TUS. Dwie z nas są też mamami, więc wiemy, jak to jest zostawić dziecko w przedszkolu po raz pierwszy.",
};

export const reasons = {
  items: [
    {
      title: "Mało dzieci, dużo uwagi",
      text: "Dwie małe grupy w osobnych salach. Nauczycielka ma czas zauważyć, że dziecko jest dziś zmęczone albo smutne, i zareagować, zanim pojawią się łzy.",
    },
    {
      title: "Adaptacja razem z rodzicem",
      text: "Pierwsze dni możecie spędzić w przedszkolu razem. Rozstanie przychodzi wtedy, gdy dziecko jest na nie gotowe, a nie wtedy, gdy wypada w kalendarzu.",
    },
    {
      title: "Montessori bez presji",
      text: "Nie zmuszamy dzieci do występów ani do zajęć, na które nie są gotowe. Obserwujemy, co je ciekawi, i od tego zaczynamy naukę.",
    },
  ],
};

export const story = {
  heading: "Pierwszy tydzień",
  headingAccent: "Antka",
  intro: "Tak może wyglądać łagodny start w przedszkolu, gdy nikt się nie spieszy.",
  days: [
    { day: "Pn", title: "Trzyma mamę za rękę", text: "Nikt go nie pogania. Mama siada z nim na dywanie, a nauczycielka stawia obok koszyk z drewnianymi klockami." },
    { day: "Wt", title: "Sięga po klocki", text: "Ciekawość wygrywa ze strachem. Antek buduje pierwszą wieżę." },
    { day: "Śr", title: "Mama wychodzi na chwilę", text: "I wraca dokładnie wtedy, kiedy obiecała." },
    { day: "Cz", title: "Nie zauważa wyjścia mamy", text: "Jest zajęty budową z nowym kolegą." },
    { day: "Pt", title: "„Jeszcze nie skończyłem!”", text: "Przy odbiorze nie chce wracać do domu." },
  ],
  closing: "Każde dziecko ma swój rytm. Naszym zadaniem jest go uszanować.",
  note: "To przykładowa historia. Tempo adaptacji ustalamy z każdą rodziną indywidualnie.",
};

/** Galeria „Dzień w Przystani”: zdjęcia dodaje się w Sanity (Ustawienia strony → Galeria); do tego czasu ilustracje. */
export const gallery = {
  lead: "Zabawa, zajęcia, spacer i chwila odpoczynku. Tak wygląda nasz zwykły dzień.",
  items: [
    { caption: "Poranne zabawy", motif: "blocks" as const },
    { caption: "Zajęcia w sali", motif: "book" as const },
    { caption: "Spacer i podwórko", motif: "sun" as const },
    { caption: "Chwila odpoczynku", motif: "boat" as const },
  ],
};

export const faq = [
  {
    q: "W jakim wieku przyjmujecie dzieci?",
    a: "Przyjmujemy dzieci od 2 do 6 lat. Podczas rozmowy pomożemy dobrać grupę do wieku i potrzeb dziecka.",
  },
  {
    q: "W jakich godzinach działa przedszkole?",
    a: "Od poniedziałku do piątku, w godzinach 7:00–17:00.",
  },
  {
    q: "Jak wygląda adaptacja?",
    a: "Łagodnie i razem z rodzicem. Pierwsze dni spędzacie w sali wspólnie, a czas rozstania wydłużamy stopniowo, w tempie dziecka.",
  },
  {
    q: "Dla kogo jest Grupa 2?",
    a: "Dla dzieci, które w dużej grupie czują się zagubione: wrażliwych na hałas, nieśmiałych, mających trudności z adaptacją albo ze specjalnymi potrzebami rozwojowymi. Opowiedz nam o swoim dziecku, a razem sprawdzimy, czy to dla niego dobre miejsce.",
  },
  {
    q: "Czy pracujecie z dziećmi z orzeczeniem?",
    a: "Tak. W zespole są pedagożki specjalne i logopedka. Mają doświadczenie w pracy z dziećmi w spektrum autyzmu i z różnymi potrzebami rozwojowymi.",
  },
  {
    q: "Co obejmuje czesne?",
    a: "Czesne obejmuje 10 zajęć dodatkowych, m.in. angielski, rytmikę, robotykę, logopedię i gimnastykę korekcyjną, bez dopłat. Aktualną wysokość czesnego podamy podczas rozmowy telefonicznej.",
  },
  {
    q: "Kiedy mogę zapisać dziecko?",
    a: "Rekrutacja trwa przez cały rok, o ile w grupie jest wolne miejsce. Najlepiej zacząć od wizyty: zobaczysz sale i poznasz nauczycielki.",
  },
];

export const contact = {
  lead: "Zostaw numer telefonu. Oddzwonimy w ciągu 24 godzin, odpowiemy na pytania i umówimy spokojną wizytę w przedszkolu.",
};
