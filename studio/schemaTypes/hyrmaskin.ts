import {WrenchIcon} from "@sanity/icons/Wrench"
import {defineArrayMember, defineField, defineType} from "sanity"
import {slugify} from "./slugify"

export const hyrmaskin = defineType({
  name: "hyrmaskin",
  title: "Hyrmaskin",
  type: "document",
  icon: WrenchIcon,
  fields: [
    defineField({
      name: "namn",
      title: "Namn",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "slug",
      title: "Adress",
      type: "slug",
      description: "Sidans adress på webbplatsen. Klicka på ”Generera” efter att du skrivit namnet. Ändra den inte efter publicering.",
      options: {source: "namn", slugify},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ingress",
      title: "Kort beskrivning",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "punkter",
      title: "Punkter",
      type: "array",
      of: [defineArrayMember({type: "text", rows: 2})],
      description: "Maskiner, mått och vad de passar till. Skriv inga priser.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "bild",
      title: "Bild",
      type: "bild",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ordning",
      title: "Ordning",
      type: "number",
      description: "Lägre tal visas först.",
      initialValue: 1000,
      validation: (rule) => rule.integer().min(0),
    }),
  ],
  orderings: [
    {
      title: "Ordning på webbplatsen",
      name: "ordning",
      by: [
        {field: "ordning", direction: "asc"},
        {field: "namn", direction: "asc"},
      ],
    },
  ],
  preview: {
    select: {title: "namn", subtitle: "ingress", media: "bild"},
  },
})
