/**
 * Migracja treści strony do Sanity (14.10.2026): przenosi treści zaszyte dotąd w kodzie (home.ts, privacy.ts)
 * i aktualne wartości z produkcji do singletonów Strony WWW, tak żeby strona wyglądała 1:1 jak przed zmianą.
 *
 * Uruchomienie (token z uprawnieniem do zapisu — NIE wypisuj go):
 *   SANITY_WRITE_TOKEN=… npx tsx scripts/migracja-cms.ts                 # backup + zapis (stare pola zostają)
 *   SANITY_WRITE_TOKEN=… npx tsx scripts/migracja-cms.ts --na-sucho       # tylko backup i podgląd JSON, bez zapisu
 *   SANITY_WRITE_TOKEN=… npx tsx scripts/migracja-cms.ts --usun-stare-pola # po wdrożeniu: sprzątanie starych pól
 *
 * Kolejność wdrożenia: migracja PRZED mergem zostawia stare pola (np. heroImage, testimonial, room, uses), więc
 * dotychczasowa wersja strony na produkcji działa dalej. Po wdrożeniu nowego kodu `--usun-stare-pola` je usuwa.
 *
 * Co robi:
 *  1. Backup: eksport wszystkich dokumentów stron (bez zgłoszeń `submission`) do pliku POZA repo
 *     (domyślnie ../pz-cms-backup-RRRR-MM-DD.json względem katalogu repo; zmiana: BACKUP=ścieżka).
 *  2. createOrReplace singletonów: homePage, siteSettings, staffPage, classroomsPage, activitiesPage,
 *     consultationPage, privacyPage — treść z `src/content/domyslne*.ts` + zdjęcia/pliki z obecnych dokumentów.
 *  3. Usuwa ewentualne wersje robocze tych singletonów (stara struktura pól) — są w backupie.
 * Dokumentów `submission` (CRM) skrypt nie czyta i nie dotyka.
 */
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@sanity/client";
import {
  domyslnaKadra,
  domyslnaKonsultacja,
  domyslnaStronaGlowna,
  domyslneSale,
  domyslneUstawienia,
  domyslneZajecia,
} from "../src/content/domyslne";
import { domyslnaPolityka } from "../src/content/domyslnaPolityka";
import type { SanityImage } from "../src/sanity/types";

const token = process.env.SANITY_WRITE_TOKEN || process.env.SANITY_AUTH_TOKEN;
if (!token) {
  console.error("Brak tokena: ustaw SANITY_WRITE_TOKEN (albo SANITY_AUTH_TOKEN).");
  process.exit(1);
}
const naSucho = process.argv.includes("--na-sucho");
const usunStarePola = process.argv.includes("--usun-stare-pola");

/** Pola starego schematu, których nowa strona już nie czyta (zostają do czasu wdrożenia nowego kodu). */
const STARE_POLA: Record<string, string[]> = {
  siteSettings: [
    "tagline", "description", "domain", "recruitmentOpen", "heroHeading", "heroSubheading", "heroDescription", "heroImage",
    "gallery", "stats", "benefits", "testimonial", "benefitsHeading", "benefitsSubheading", "contactFormHeading",
    "contactFormSubheading", "exploreHeading", "exploreCards", "ctaHeading", "ctaDescription", "ctaButtonText",
  ],
  staffPage: ["title", "subtitle", "columns"],
  classroomsPage: ["title", "subtitle", "room", "uses", "materials"],
  activitiesPage: ["title", "subtitle", "badge", "heroImage"],
};

const client = createClient({
  projectId: "hzxqcvp2",
  dataset: "production",
  apiVersion: "2026-03-17",
  useCdn: false,
  token,
  perspective: "raw",
});

const SINGLETONY = ["homePage", "siteSettings", "staffPage", "classroomsPage", "activitiesPage", "consultationPage", "privacyPage"];

// Zdjęcia, które dotąd były wpisane na sztywno w kodzie (page.tsx / sale/page.tsx / layout.tsx).
const SALA_MORSKA = "image-9db91764f3e0697d04dbaae92ae8cf139f5e7992-4096x3072-jpg";
const SALA_MORSKA_OKNA = "image-5c84f0677c50117270285ce77db6b95b29463e8c-385x385-jpg";

type Obj = Record<string, unknown>;
type Img = SanityImage;

const obraz = (ref: string, alt: string, extra: Obj = {}): SanityImage => ({ _type: "image", asset: { _type: "reference", _ref: ref }, alt, ...extra });
/** Istniejące zdjęcie z Sanity (z hotspotem/cropem) + opis alt. */
const przenies = (img: Img | undefined, alt: string, _key?: string): SanityImage | undefined =>
  img?.asset?._ref
    ? {
        ...(_key ? { _key } : {}),
        _type: "image",
        asset: { _type: "reference", _ref: img.asset._ref },
        ...(img.hotspot ? { hotspot: img.hotspot } : {}),
        ...(img.crop ? { crop: img.crop } : {}),
        alt: img.alt?.trim() || alt,
      }
    : undefined;

const kopia = <T>(v: T): T => JSON.parse(JSON.stringify(v));

/** Nazwy typów elementów tablic (jak w schematach) — Studio oczekuje `_type` przy obiektach w tablicach. */
const TYPY_ELEMENTOW: Record<string, string> = {
  "homePage.groups.items": "grupa",
  "homePage.adaptation.days": "dzien",
  "homePage.gallery.items": "zdjecieGalerii",
  "homePage.testimonials.items": "opinia",
  "homePage.reasons.items": "powod",
  "homePage.faq.items": "pytanie",
  "siteSettings.navigation": "pozycjaMenu",
  "siteSettings.documents": "dokument",
  "staffPage.members": "osoba",
  "classroomsPage.seaRoom.images": "image",
  "classroomsPage.zones.items": "strefa",
  "classroomsPage.learningMaterials.items": "kategoria",
  "activitiesPage.activities": "zajecie",
  "privacyPage.sections": "sekcjaPolityki",
  "privacyPage.cookieRows": "kategoriaCookies",
};

function nadajTypy(wezel: unknown, sciezka: string): unknown {
  if (Array.isArray(wezel)) {
    const typ = TYPY_ELEMENTOW[sciezka];
    return wezel.map((el, i) => {
      if (typeof el !== "object" || el === null) return el;
      const o = nadajTypy(el, sciezka) as Obj;
      return { ...(typ && !o._type ? { _type: typ } : {}), _key: (o._key as string) ?? `${sciezka.split(".").pop()}-${i}`, ...o };
    });
  }
  if (typeof wezel === "object" && wezel !== null) {
    const o = wezel as Obj;
    if (o._type === "block") return o; // Portable Text zostawiamy jak jest
    return Object.fromEntries(Object.entries(o).map(([k, v]) => [k, nadajTypy(v, `${sciezka}.${k}`)]));
  }
  return wezel;
}

async function sprzatanie() {
  const tx = client.transaction();
  for (const [id, pola] of Object.entries(STARE_POLA)) tx.patch(id, (p) => p.unset(pola));
  const wynik = await tx.commit({ visibility: "sync" });
  console.log(`Usunięto stare pola z ${Object.keys(STARE_POLA).length} dokumentów (transakcja ${wynik.transactionId}).`);
}

/** Pola systemowe Sanity nie idą do createOrReplace. */
const bezSystemowych = (d: Obj | undefined): Obj =>
  Object.fromEntries(Object.entries(d ?? {}).filter(([k]) => !["_rev", "_createdAt", "_updatedAt", "_system", "_id", "_type"].includes(k)));

async function main() {
  if (usunStarePola) return sprzatanie();

  // 1. Backup (bez zgłoszeń — CRM nie jest ruszany).
  const dzis = new Date().toISOString().slice(0, 10);
  const backupPlik = process.env.BACKUP || resolve(__dirname, "..", "..", `pz-cms-backup-${dzis}.json`);
  const wszystkie = await client.fetch<Obj[]>(`*[!(_type in ["submission", "sanity.imageAsset", "sanity.fileAsset"]) && !(_id in path("submission.**")) && !(_id in path("drafts.submission.**"))]`);
  writeFileSync(backupPlik, JSON.stringify(wszystkie, null, 2));
  console.log(`Backup: ${wszystkie.length} dokumentów → ${backupPlik}`);

  const obecne = Object.fromEntries(wszystkie.filter((d) => !String(d._id).startsWith("drafts.")).map((d) => [d._id as string, d])) as Record<string, Obj>;
  const ust = (obecne.siteSettings ?? {}) as Obj & {
    heroImage?: Img;
    gallery?: (Img & { caption?: string; _key?: string })[];
    recruitmentOpen?: boolean;
    documents?: { _key: string; title: string; file: unknown }[];
  };
  const sale = (obecne.classroomsPage ?? {}) as Obj & { forestRoom?: { image?: Img; image2?: Img } };
  const kadra = (obecne.staffPage ?? {}) as Obj & { members?: { _key: string; image?: Img; name?: string }[] };

  // 2. Dokumenty docelowe.
  const ustawienia = kopia(domyslneUstawienia) as unknown as Obj;
  ustawienia.documents = (ust.documents ?? []).map((d) => ({
    _key: d._key,
    title: d.title.charAt(0) + d.title.slice(1).toLowerCase(), // „STATUT PRZEDSZKOLA” → „Statut przedszkola” (jak dotąd w stopce)
    file: d.file,
  }));
  (ustawienia.seo as Obj).ogImage = obraz(SALA_MORSKA, "Sala przedszkola Przystań Zucha w morskim klimacie");

  const glowna = kopia(domyslnaStronaGlowna) as typeof domyslnaStronaGlowna & Obj;
  glowna.hero.showBadge = ust.recruitmentOpen ?? true;
  glowna.hero.image = przenies(ust.heroImage, "Uśmiechnięta przedszkolaczka Przystani Zucha");
  glowna.hero.secondImage = obraz(SALA_MORSKA, "Sala Morska z muralem wieloryba i dywanem w morskie fale");
  glowna.groups.items[0].image = obraz(SALA_MORSKA, "Sala Morska: mural z wielorybem i dywan w morskie fale");
  glowna.groups.items[1].image = przenies(sale.forestRoom?.image, "Sala Leśna");
  glowna.gallery.items = glowna.gallery.items.map((item, i) => {
    const img = ust.gallery?.[i];
    return { ...item, ...(img?.caption?.trim() ? { caption: img.caption.trim() } : {}), image: przenies(img, img?.caption || item.caption) };
  });

  const strKadra = kopia(domyslnaKadra) as typeof domyslnaKadra & Obj;
  strKadra.members = strKadra.members.map((m) => {
    const stary = kadra.members?.find((s) => s._key === m._key);
    return { ...m, image: przenies(stary?.image, `${m.name}, ${m.role.toLowerCase()}`) };
  });

  const strSale = kopia(domyslneSale) as typeof domyslneSale & Obj;
  strSale.seaRoom.images = [
    { _key: "morska-1", ...obraz(SALA_MORSKA, "Sala Morska: mural z wielorybem i dywan w kształcie fali") },
    { _key: "morska-2", ...obraz(SALA_MORSKA_OKNA, "Sala Morska: duże okna z napisem Ahoj, dywan w fale i stoliki") },
  ];
  strSale.forestRoom.image = przenies(sale.forestRoom?.image, "Sala Leśna");
  strSale.forestRoom.image2 = przenies(sale.forestRoom?.image2, "Sala Leśna, kącik zabaw");

  const dokumenty: Record<string, Obj> = {
    homePage: glowna,
    siteSettings: ustawienia,
    staffPage: strKadra,
    classroomsPage: strSale,
    activitiesPage: kopia(domyslneZajecia) as unknown as Obj,
    consultationPage: kopia(domyslnaKonsultacja) as unknown as Obj,
    privacyPage: kopia(domyslnaPolityka) as unknown as Obj,
  };

  const tx = client.transaction();
  for (const id of SINGLETONY) {
    // JSON round-trip usuwa pola `undefined` (brak zdjęcia = brak pola).
    const tresc = kopia(nadajTypy(dokumenty[id], id)) as Obj;
    // Stare pola zostają (nadpisujemy tylko nowe), żeby obecna produkcja działała do czasu wdrożenia.
    const stare = Object.fromEntries(Object.entries(bezSystemowych(obecne[id])).filter(([k]) => STARE_POLA[id]?.includes(k)));
    tx.createOrReplace({ ...stare, ...tresc, _id: id, _type: id });
    if (wszystkie.some((d) => d._id === `drafts.${id}`)) {
      console.log(`Usuwam starą wersję roboczą drafts.${id} (jest w backupie).`);
      tx.delete(`drafts.${id}`);
    }
  }

  if (naSucho) {
    console.log(JSON.stringify(tx.serialize(), null, 2));
    console.log("Na sucho — nic nie zapisano.");
    return;
  }
  const wynik = await tx.commit({ visibility: "sync" });
  console.log(`Zapisano ${SINGLETONY.length} singletonów (transakcja ${wynik.transactionId}).`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
