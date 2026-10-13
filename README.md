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

- **Listy:** Do kontaktu dziś (`nextContactAt` ≤ koniec dnia, status nie umowa/rezygnacja/spam),
  Nowe, W kontakcie (kontakt + wizyta_umowiona), Adaptacja, Umowy, Rezygnacje / spam, Wszystkie.
- **Statusy (`status`):** `nowy`, `kontakt`, `wizyta_umowiona`, `adaptacja`, `umowa`, `rezygnacja`,
  `spam`. Stare wartości `new` / `in_progress` / `done` zostają na liście jako „(stare) …”
  (new → Nowe, in_progress → W kontakcie, done → tylko Wszystkie).
- **Źródło (`source`):** `www_rekrutacja`, `www_konsultacja`, `facebook_lead_ads`, `google_business`,
  `email`, `telefon`, `recznie`. Stare zgłoszenia bez `source` — liczone z `type`.
- **Pola:** `language` (pl/en/uk/inny), `childBirthDate`, `nextContactAt`, `notes[]` ({text, at, author}),
  `assignedTo`, `utm` {source, medium, campaign}, `gclid`, `fbclid`, `externalId` (tylko do odczytu).
- **Formularze WWW:** `POST /api/contact` zapisuje lead (`source` www_*, `language` pl, UTM/gclid/fbclid
  z adresu — pierwszy kontakt w sesji) i wysyła mail przez Resend.
- **FB Lead Ads / e-mail:** leady zapisuje do Sanity `przystanzucha-ops/lead-hub` na FRIDAY,
  deduplikując po `externalId`. Wartości statusów i źródeł to kontrakt — słowniki w `src/sanity/crm.ts`.

Zmienne w Vercel: `SANITY_WRITE_TOKEN`, `RESEND_API_KEY`, `CONTACT_EMAIL` (adresaci po przecinku),
opcjonalnie `CONTACT_FROM` (domena nadawcy musi być zweryfikowana w Resend).
Stare zgłoszenia na publicznych ID: `SANITY_AUTH_TOKEN=… npx tsx scripts/private-submissions.ts`.
