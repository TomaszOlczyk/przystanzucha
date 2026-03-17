import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/sanity/schemaTypes";

const singletonTypes = new Set([
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

export default defineConfig({
  name: "przystanzucha",
  title: "Przystanzucha CMS",
  projectId: "hzxqcvp2",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
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
            S.listItem()
              .title("Zgłoszenia")
              .id("submissions")
              .child(
                S.documentTypeList("submission")
                  .title("Zgłoszenia z formularzy")
                  .defaultOrdering([{ field: "submittedAt", direction: "desc" }])
              ),
          ]),
    }),
    visionTool(),
    presentationTool({
      previewUrl: {
        previewMode: {
          enable: "/api/draft-mode/enable",
        },
      },
    }),
  ],

  schema: {
    types: schemaTypes,
    templates: (templates) =>
      templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },

  document: {
    actions: (input, context) =>
      singletonTypes.has(context.schemaType)
        ? input.filter(
            ({ action }) =>
              action && ["publish", "discardChanges", "restore"].includes(action)
          )
        : input,
  },
});
