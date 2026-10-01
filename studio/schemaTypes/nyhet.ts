import {BulbOutlineIcon} from "@sanity/icons/BulbOutline"
import {defineArrayMember, defineField, defineType} from "sanity"

export const nyhet = defineType({
  name: "nyhet",
  title: "Aktuellt",
  type: "document",
  icon: BulbOutlineIcon,
  fields: [
    defineField({
      name: "rubrik",
      title: "Rubrik",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "etikett",
      title: "Etikett",
      type: "string",
      description: "Kort rad ovanför rubriken, till exempel ”Ved · Pellets · Värmeloggs”. Valfri.",
      validation: (rule) => rule.max(60),
    }),
    defineField({
      name: "text",
      title: "Text",
      type: "text",
      rows: 5,
      description: "Tom rad mellan stycken.",
    }),
    defineField({
      name: "bild",
      title: "Bild",
      type: "bild",
    }),
    defineField({
      name: "lankar",
      title: "Länkar",
      type: "array",
      description: "Till exempel länkar till produkter. Adresser på webbplatsen kan skrivas som /produkter/ved.",
      of: [
        defineArrayMember({
          type: "object",
          name: "lank",
          title: "Länk",
          fields: [
            defineField({name: "text", title: "Text", type: "string", validation: (rule) => rule.required().max(60)}),
            defineField({
              name: "url",
              title: "Adress",
              type: "url",
              validation: (rule) => rule.required().uri({allowRelative: true, scheme: ["http", "https", "mailto", "tel"]}),
            }),
          ],
          preview: {select: {title: "text", subtitle: "url"}},
        }),
      ],
    }),
    defineField({
      name: "datum",
      title: "Datum",
      type: "date",
      description: "Det senaste inlägget visas först.",
      initialValue: () => new Date().toISOString().slice(0, 10),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "visaTill",
      title: "Visa till och med",
      type: "date",
      description: "Valfritt. Efter detta datum försvinner inlägget från webbplatsen, till exempel för julens öppettider.",
      validation: (rule) =>
        rule.custom((visaTill, {document}) =>
          visaTill && typeof document?.datum === "string" && visaTill < document.datum
            ? "Slutdatumet ligger före inläggets datum."
            : true,
        ),
    }),
  ],
  orderings: [
    {title: "Senaste först", name: "datumFallande", by: [{field: "datum", direction: "desc"}]},
  ],
  preview: {
    select: {title: "rubrik", subtitle: "datum", media: "bild"},
  },
})
