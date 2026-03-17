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
    })
    .commit();

  console.log("Done! siteSettings patched with homepage fields.");
}

patch().catch((err) => {
  console.error("Patch failed:", err);
  process.exit(1);
});
