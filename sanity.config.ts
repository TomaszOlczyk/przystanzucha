import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure, singletonTypes } from "./src/sanity/structure";

export default defineConfig({
  name: "przystanzucha",
  title: "Przystanzucha CMS",
  projectId: "hzxqcvp2",
  dataset: "production",

  plugins: [
    structureTool({ structure }),
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
    // Leady tworzymy tylko z sekcji "CRM — Leady" (prywatne ID `submission.<uuid>`),
    // więc chowamy je z globalnego menu "Utwórz".
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === "global"
        ? prev.filter((item) => item.templateId !== "submission")
        : prev,
    actions: (input, context) => {
      if (singletonTypes.has(context.schemaType)) {
        return input.filter(
          ({ action }) =>
            action && ["publish", "discardChanges", "restore"].includes(action)
        );
      }
      // Duplikat dostałby publiczne ID (zwykłe UUID) — wyłączamy dla leadów.
      if (context.schemaType === "submission") {
        return input.filter(({ action }) => action !== "duplicate");
      }
      return input;
    },
  },
});
