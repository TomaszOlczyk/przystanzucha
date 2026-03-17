import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "hzxqcvp2",
  dataset: "production",
  apiVersion: "2026-03-17",
  useCdn: false,
  token: process.env.SANITY_AUTH_TOKEN,
});

async function patch() {
  await client
    .patch("siteSettings")
    .set({
      heroHeading: "Najlepszy start",
      heroSubheading: "dla Twojego dziecka",
      heroDescription:
        "Przedszkole prywatne w Łodzi, gdzie każde dziecko odkrywa swoje talenty w bezpiecznej, nowoczesnej przestrzeni.",
      stats: [
        { _key: "s0", _type: "object", value: "150+", label: "Szczęśliwych dzieci" },
        { _key: "s1", _type: "object", value: "15", label: "Lat doświadczenia" },
        { _key: "s2", _type: "object", value: "10", label: "Zajęć w ramach czesnego" },
        { _key: "s3", _type: "object", value: "98%", label: "Polecających rodziców" },
      ],
      benefits: [
        { _key: "b0", _type: "object", icon: "👶", title: "Małe grupy", desc: "Maksymalnie 15 dzieci w grupie — każde dziecko dostaje pełną uwagę" },
        { _key: "b1", _type: "object", icon: "🎓", title: "Wykwalifikowana kadra", desc: "Doświadczeni pedagodzy, psycholog i logopeda na miejscu" },
        { _key: "b2", _type: "object", icon: "🌍", title: "Angielski codziennie", desc: "Codzienna nauka języka angielskiego przez zabawę i immersję" },
        { _key: "b3", _type: "object", icon: "🎨", title: "10 dedykowanych zajęć", desc: "Robotyka, plastyka, muzyka, gimnastyka — w ramach czesnego" },
        { _key: "b4", _type: "object", icon: "🏡", title: "Nowoczesna sala", desc: "Jedna przestrzeń, wiele możliwości — sensoryka, Montessori, multimedia" },
        { _key: "b5", _type: "object", icon: "🥦", title: "Własna kuchnia", desc: "Świeże, zbilansowane posiłki przygotowywane codziennie na miejscu" },
      ],
      testimonial: {
        _type: "object",
        quote: "Córka codziennie nie może się doczekać pójścia do przedszkola. Kadra jest wspaniała, a ilość dedykowanych zajęć w ramach czesnego to coś, czego nie znajdziecie nigdzie indziej w Łodzi.",
        author: "Katarzyna M.",
        role: "Mama 4-letniej Zosi",
      },
      benefitsHeading: "Dlaczego rodzice wybierają",
      benefitsSubheading: "Tworzymy miejsce, w którym każde dziecko czuje się bezpiecznie, rozwija się i odkrywa świat z radością",
      contactFormHeading: "Zapisz dziecko do przedszkola",
      contactFormSubheading: "Zostaw kontakt — oddzwonimy w ciągu 24 godzin",
      exploreHeading: "Poznaj nas bliżej",
      exploreCards: [
        { _key: "e0", _type: "object", href: "/kadra", title: "Nasza kadra", desc: "Poznaj zespół doświadczonych pedagogów, psychologa i logopedę", icon: "👩‍🏫" },
        { _key: "e1", _type: "object", href: "/sale", title: "Nasza sala", desc: "Jedna przestrzeń z wieloma możliwościami — sensoryka, Montessori, multimedia", icon: "🏫" },
        { _key: "e2", _type: "object", href: "/zajecia", title: "Zajęcia dla dzieci", desc: "10 dedykowanych zajęć w ramach czesnego — bez ukrytych opłat", icon: "🎯" },
      ],
      ctaHeading: "Daj swojemu dziecku najlepszy start",
      ctaDescription: "Zostaw kontakt — opowiemy Ci o naszym przedszkolu i zaprosimy na wizytę",
      ctaButtonText: "Zapisz dziecko",
    })
    .commit();

  console.log("Done! siteSettings patched with all homepage fields.");
}

patch().catch((err) => {
  console.error("Patch failed:", err);
  process.exit(1);
});
