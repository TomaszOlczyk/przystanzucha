import { AddIcon } from "@sanity/icons";
import type { StructureBuilder, StructureResolver } from "sanity/structure";
import { CLOSED_STATUSES } from "./crm";

export const singletonTypes = new Set([
  "siteSettings",
  "staffPage",
  "classroomsPage",
  "activitiesPage",
]);

const singletonLabels: Record<string, string> = {
  siteSettings: "Ustawienia strony",
  staffPage: "Kadra",
  classroomsPage: "Sala i materiały",
  activitiesPage: "Zajęcia",
};

const API_VERSION = "2024-01-01";

// `_type == "submission"` łapie dokumenty o ID `submission.<uuid>` oraz ich szkice
// `drafts.submission.<uuid>` — Studio samo łączy szkic z opublikowaną wersją na liście.
const BASE = `_type == "submission"`;
const NEWEST: { field: string; direction: "asc" | "desc" }[] = [
  { field: "submittedAt", direction: "desc" },
];

/**
 * Przycisk "Nowy lead" z prywatnym ID `submission.<uuid>`. Domyślne tworzenie w Studio nadaje
 * zwykłe UUID (dokument byłby czytelny przez publiczne API), więc tworzymy przez intencję
 * `create` z własnym `id`. UUID losujemy przy każdym otwarciu listy.
 */
function newLeadItem(S: StructureBuilder) {
  return S.menuItem()
    .title("Nowy lead")
    .icon(AddIcon)
    .showAsAction(true)
    .intent({
      type: "create",
      params: { type: "submission", id: `submission.${crypto.randomUUID()}` },
    });
}

function leadDocumentList(
  S: StructureBuilder,
  id: string,
  title: string,
  filter: string,
  params: Record<string, unknown>,
  ordering: { field: string; direction: "asc" | "desc" }[]
) {
  return S.documentList()
    .id(id)
    .title(title)
    .schemaType("submission")
    .apiVersion(API_VERSION)
    .filter(`${BASE} && (${filter})`)
    .params(params)
    .defaultOrdering(ordering)
    .initialValueTemplates([])
    .menuItems([...S.orderingMenuItemsForType("submission"), newLeadItem(S)]);
}

/** Pozycja menu z listą leadów; lista budowana przy każdym otwarciu (świeże UUID, "dziś"). */
function leadList(
  S: StructureBuilder,
  id: string,
  title: string,
  filter: string,
  params: () => Record<string, unknown> = () => ({}),
  ordering: { field: string; direction: "asc" | "desc" }[] = NEWEST
) {
  return S.listItem()
    .id(id)
    .title(title)
    .schemaType("submission")
    .child(() => leadDocumentList(S, id, title, filter, params(), ordering));
}

/** Koniec bieżącego dnia (czas lokalny przeglądarki) jako ISO. */
function endOfToday() {
  const d = new Date();
  d.setHours(23, 59, 59, 999);
  return d.toISOString();
}

function crmSection(S: StructureBuilder) {
  return S.listItem()
    .id("crm")
    .title("CRM — Leady")
    .child(
      S.list()
        .id("crm-lista")
        .title("CRM — Leady")
        .items([
          // Parametry liczone przy każdym otwarciu listy, żeby "dziś" nie zastygło po północy.
          leadList(
            S,
            "do-kontaktu-dzis",
            "Do kontaktu dziś",
            `defined(nextContactAt) && dateTime(nextContactAt) <= dateTime($koniecDnia) && !(coalesce(status, "nowy") in $zamkniete)`,
            () => ({ koniecDnia: endOfToday(), zamkniete: CLOSED_STATUSES }),
            [{ field: "nextContactAt", direction: "asc" }]
          ),
          S.divider(),
          // Stare statusy: new → Nowe, in_progress → W kontakcie, brak statusu → Nowe.
          leadList(S, "leady-nowe", "Nowe", `!defined(status) || status in ["nowy", "new"]`),
          leadList(
            S,
            "leady-w-kontakcie",
            "W kontakcie",
            `status in ["kontakt", "wizyta_umowiona", "in_progress"]`
          ),
          leadList(S, "leady-adaptacja", "Adaptacja", `status == "adaptacja"`),
          leadList(S, "leady-umowy", "Umowy", `status == "umowa"`),
          leadList(S, "leady-rezygnacje", "Rezygnacje / spam", `status in ["rezygnacja", "spam"]`),
          S.divider(),
          leadList(S, "leady-wszystkie", "Wszystkie", "true"),
        ])
    );
}

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Treści")
    .items([
      ...[...singletonTypes].map((type) =>
        S.listItem()
          .title(singletonLabels[type] || type)
          .id(type)
          .child(S.document().schemaType(type).documentId(type))
      ),
      S.divider(),
      crmSection(S),
    ]);
