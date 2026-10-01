import {svSELocale} from "@sanity/locale-sv-se"
import {defineConfig} from "sanity"
import {structureTool} from "sanity/structure"
import {DATASET, PROJECT_ID} from "./projekt"
import {SINGLETONS, schemaTypes} from "./schemaTypes"
import {structure} from "./structure"

/** Åtgärder som är meningsfulla för ett dokument som alltid ska finnas. */
const SINGLETON_ACTIONS = new Set(["publish", "discardChanges", "restore"])

export default defineConfig({
  name: "default",
  title: "Öckerö Cementgjuteri",
  projectId: PROJECT_ID,
  dataset: DATASET,
  plugins: [structureTool({structure}), svSELocale()],
  schema: {
    types: schemaTypes,
    templates: (templates) => [
      ...templates.filter(({schemaType}) => !SINGLETONS.has(schemaType)),
      {
        id: "produkt-i-kategori",
        title: "Produkt i kategori",
        schemaType: "produkt",
        parameters: [{name: "kategori", type: "string"}],
        value: ({kategori}: {kategori: string}) => ({kategori, typ: "produktgrupp", ordning: 1000}),
      },
    ],
  },
  document: {
    actions: (actions, {schemaType}) =>
      SINGLETONS.has(schemaType) ? actions.filter(({action}) => action && SINGLETON_ACTIONS.has(action)) : actions,
    newDocumentOptions: (options, {creationContext}) =>
      creationContext.type === "global"
        ? options.filter(({templateId}) => !SINGLETONS.has(templateId) && templateId !== "produkt-i-kategori")
        : options,
  },
})
