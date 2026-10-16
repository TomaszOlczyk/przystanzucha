import { StatusInput } from "../components/StatusInput";
import { defineType, defineField, defineArrayMember } from "sanity";
import {
  INITIAL_STATUS,
  LEAD_LANGUAGES,
  LEAD_SOURCES,
  LEAD_STATUSES,
  STATUS_EMOJI,
  resolveSource,
  sourceLabel,
} from "../crm";

/**
 * Zgłoszenie / lead (CRM). Dokumenty mają prywatne ID `submission.<uuid>` (niewidoczne
 * w publicznym API). Zapisują je: formularze WWW (/api/contact), lead-hub na FRIDAY
 * (Facebook Lead Ads, e-mail — deduplikacja po `externalId`) oraz ręcznie w Studio.
 */
export const submission = defineType({
  name: "submission",
  title: "Zgłoszenia / Leady",
  type: "document",
  groups: [
    { name: "lead", title: "Lead", default: true },
    { name: "crm", title: "Obsługa" },
    { name: "atrybucja", title: "Źródło i atrybucja" },
  ],
  fields: [
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      group: ["lead", "crm"],
      options: { list: [...LEAD_STATUSES], layout: "dropdown" },
      initialValue: INITIAL_STATUS,
      components: { input: StatusInput },
    }),
    defineField({
      name: "source",
      title: "Źródło",
      type: "string",
      group: ["lead", "atrybucja"],
      description: "Puste w starych zgłoszeniach — wtedy liczy się pole „Typ” (formularz WWW).",
      options: { list: [...LEAD_SOURCES] },
      initialValue: "recznie",
    }),
    defineField({
      name: "type",
      title: "Typ (zgłoszenie WWW)",
      type: "string",
      group: "lead",
      options: {
        list: [
          { title: "Rekrutacja", value: "recruitment" },
          { title: "Konsultacja", value: "consultation" },
          { title: "Kliknięcie telefonu", value: "phone_click" },
        ],
      },
    }),
    defineField({ name: "parentName", title: "Rodzic", type: "string", group: "lead" }),
    defineField({ name: "email", title: "Email", type: "string", group: "lead" }),
    defineField({ name: "phone", title: "Telefon", type: "string", group: "lead" }),
    defineField({ name: "childName", title: "Dziecko", type: "string", group: "lead" }),
    defineField({ name: "childAge", title: "Wiek dziecka", type: "string", group: "lead" }),
    defineField({
      name: "childBirthDate",
      title: "Data urodzenia dziecka",
      type: "date",
      group: "lead",
    }),
    defineField({
      name: "language",
      title: "Język",
      type: "string",
      group: "lead",
      options: { list: [...LEAD_LANGUAGES], layout: "radio", direction: "horizontal" },
      initialValue: "pl",
    }),
    defineField({ name: "message", title: "Wiadomość", type: "text", group: "lead" }),
    defineField({
      name: "preferredTime",
      title: "Preferowany termin",
      type: "string",
      group: "lead",
    }),
    defineField({
      name: "submittedAt",
      title: "Data zgłoszenia",
      type: "datetime",
      group: "lead",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "nextContactAt",
      title: "Następny kontakt",
      type: "datetime",
      group: "crm",
    }),
    defineField({ name: "assignedTo", title: "Opiekun", type: "string", group: "crm" }),
    defineField({
      name: "notes",
      title: "Notatki z rozmów",
      type: "array",
      group: "crm",
      of: [
        defineArrayMember({
          type: "object",
          name: "note",
          title: "Notatka",
          fields: [
            defineField({ name: "text", title: "Treść", type: "text", rows: 3 }),
            defineField({
              name: "at",
              title: "Kiedy",
              type: "datetime",
              initialValue: () => new Date().toISOString(),
            }),
            defineField({ name: "author", title: "Kto", type: "string" }),
          ],
          preview: {
            select: { text: "text", at: "at", author: "author" },
            prepare({ text, at, author }) {
              const when = at ? new Date(at).toLocaleString("pl-PL") : "";
              return {
                title: text || "(pusta notatka)",
                subtitle: [when, author].filter(Boolean).join(" — "),
              };
            },
          },
        }),
      ],
    }),
    defineField({
      name: "utm",
      title: "UTM",
      type: "object",
      group: "atrybucja",
      options: { collapsible: true, collapsed: true },
      fields: [
        defineField({ name: "source", title: "utm_source", type: "string" }),
        defineField({ name: "medium", title: "utm_medium", type: "string" }),
        defineField({ name: "campaign", title: "utm_campaign", type: "string" }),
      ],
    }),
    defineField({ name: "gclid", title: "gclid (Google Ads)", type: "string", group: "atrybucja" }),
    defineField({ name: "fbclid", title: "fbclid (Facebook)", type: "string", group: "atrybucja" }),
    defineField({
      name: "adConsent",
      title: "Zgoda na cookies marketingowe",
      type: "string",
      group: "atrybucja",
      readOnly: true,
      options: { list: [{ title: "Tak", value: "granted" }, { title: "Nie", value: "denied" }] },
      description: "Stan w chwili zgłoszenia. Tylko przy „Tak” lead-hub wysyła potwierdzonego leada (z gclid) do Google Ads.",
    }),
    defineField({
      name: "googleConversion",
      title: "Konwersja w Google Ads",
      type: "string",
      group: "atrybucja",
      readOnly: true,
      description: "Ustawia lead-hub: kiedy i z jakim wynikiem wysłano potwierdzonego leada do Google Ads.",
    }),
    defineField({
      name: "externalId",
      title: "Zewnętrzne ID",
      type: "string",
      group: "atrybucja",
      readOnly: true,
      description: "Ustawia lead-hub (FRIDAY) — klucz deduplikacji leadów z FB / e-maila.",
    }),
  ],
  orderings: [
    {
      title: "Najnowsze",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
    {
      title: "Następny kontakt",
      name: "nextContactAtAsc",
      by: [{ field: "nextContactAt", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      parentName: "parentName",
      email: "email",
      phone: "phone",
      status: "status",
      source: "source",
      type: "type",
      date: "submittedAt",
    },
    prepare({ parentName, email, phone, status, source, type, date }) {
      const emoji = STATUS_EMOJI[status ?? INITIAL_STATUS] ?? "•";
      const dateStr = date ? new Date(date).toLocaleDateString("pl-PL") : "";
      return {
        title: parentName || email || phone || "Brak danych kontaktowych",
        subtitle: [`${emoji} ${sourceLabel(resolveSource(source, type))}`, dateStr]
          .filter(Boolean)
          .join(" — "),
      };
    },
  },
});
