import { defineType, defineField } from "sanity";

export const submission = defineType({
  name: "submission",
  title: "Zgłoszenia",
  type: "document",
  fields: [
    defineField({
      name: "type",
      title: "Typ",
      type: "string",
      options: {
        list: [
          { title: "Rekrutacja", value: "recruitment" },
          { title: "Konsultacja", value: "consultation" },
        ],
      },
    }),
    defineField({ name: "parentName", title: "Rodzic", type: "string" }),
    defineField({ name: "childName", title: "Dziecko", type: "string" }),
    defineField({ name: "childAge", title: "Wiek dziecka", type: "string" }),
    defineField({ name: "email", title: "Email", type: "string" }),
    defineField({ name: "phone", title: "Telefon", type: "string" }),
    defineField({ name: "message", title: "Wiadomość", type: "text" }),
    defineField({ name: "preferredTime", title: "Preferowany termin", type: "string" }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Nowe", value: "new" },
          { title: "W trakcie", value: "in_progress" },
          { title: "Załatwione", value: "done" },
        ],
      },
      initialValue: "new",
    }),
    defineField({
      name: "submittedAt",
      title: "Data zgłoszenia",
      type: "datetime",
    }),
  ],
  orderings: [
    {
      title: "Najnowsze",
      name: "submittedAtDesc",
      by: [{ field: "submittedAt", direction: "desc" }],
    },
  ],
  preview: {
    select: {
      title: "parentName",
      subtitle: "type",
      date: "submittedAt",
    },
    prepare({ title, subtitle, date }) {
      const typeLabel = subtitle === "consultation" ? "Konsultacja" : "Rekrutacja";
      const dateStr = date ? new Date(date).toLocaleDateString("pl-PL") : "";
      return {
        title: title || "Brak nazwy",
        subtitle: `${typeLabel} — ${dateStr}`,
      };
    },
  },
});
