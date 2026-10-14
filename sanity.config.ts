import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from "sanity/presentation";
import { schemaTypes } from "./src/sanity/schemaTypes";
import { structure, singletonTypes } from "./src/sanity/structure";
import { submissionActions } from "./src/sanity/actions/verifyActions";

export default defineConfig({
  name: "przystanzucha",
  title: "Przystanzucha CMS",
  projectId: "hzxqcvp2",
  dataset: "production",
  // Studio jest osadzone w Next.js pod /studio (src/app/studio/[[...tool]]). Bez basePath router
  // Studio nie rozpoznaje adresów /studio/… — m.in. linków-intencji do dokumentu z Telegrama.
  basePath: "/studio",

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
      // Leady: szybka weryfikacja „To lead” / „To spam”, bez „Duplikuj”.
      if (context.schemaType === "submission") {
        return submissionActions(input);
      }
      return input;
    },
  },
});
