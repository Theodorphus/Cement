import {defineField, defineType} from "sanity"

export const bild = defineType({
  name: "bild",
  title: "Bild",
  type: "image",
  options: {hotspot: true},
  fields: [
    defineField({
      name: "alt",
      title: "Bildbeskrivning",
      type: "string",
      description: "Beskriv kort vad bilden visar, t.ex. ”Betongkrukor i olika storlekar”. Läses upp för den som inte ser bilden.",
      validation: (rule) => rule.required().max(140),
    }),
  ],
})
