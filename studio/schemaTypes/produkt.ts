import {PackageIcon} from "@sanity/icons/Package"
import {defineArrayMember, defineField, defineType} from "sanity"
import {KATEGORIER} from "./kategorier"
import {slugify} from "./slugify"

export const produkt = defineType({
  name: "produkt",
  title: "Produkt",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "namn",
      title: "Namn",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: "kategori",
      title: "Kategori",
      type: "string",
      options: {list: KATEGORIER, layout: "dropdown"},
      description: "Byter du kategori på en publicerad produkt får den en ny adress, och gamla länkar slutar fungera.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Adress",
      type: "slug",
      description: "Sidans adress på webbplatsen. Klicka på ”Generera” efter att du skrivit namnet. Ändra den inte efter publicering – då slutar gamla länkar att fungera.",
      options: {source: "namn", slugify},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "typ",
      title: "Typ",
      type: "string",
      options: {
        list: [
          {title: "Produktgrupp", value: "produktgrupp"},
          {title: "Guide med numrerade steg", value: "guide"},
        ],
        layout: "radio",
        direction: "horizontal",
      },
      initialValue: "produktgrupp",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ingress",
      title: "Kort beskrivning",
      type: "text",
      rows: 2,
      description: "En mening som visas i listor och överst på produktsidan.",
      validation: (rule) => rule.required().max(200),
    }),
    defineField({
      name: "punkter",
      title: "Punkter",
      type: "array",
      of: [defineArrayMember({type: "text", rows: 2})],
      description: "Tre till fem korta punkter om sortimentet. Skriv inga priser – kunderna hör av sig för pris. Avsluta gärna med en uppmaning att kontakta er.",
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "bilder",
      title: "Bilder",
      type: "array",
      of: [defineArrayMember({type: "bild"})],
      description: "Den första bilden visas också i kategorilistan.",
      options: {layout: "grid"},
    }),
    defineField({
      name: "tillganglighet",
      title: "Tillgänglighet",
      type: "string",
      description: "Lämna tomt för ”Kontakta oss för lagerstatus”. Skriv till exempel ”På beställning”.",
      hidden: ({document}) => document?.typ === "guide",
    }),
    defineField({
      name: "sokord",
      title: "Fler sökord",
      type: "string",
      description: "Ord som kunder kan söka på men som inte står i texten, till exempel ”brasved eldning”.",
    }),
    defineField({
      name: "ordning",
      title: "Ordning",
      type: "number",
      description: "Lägre tal visas först i kategorin.",
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
    select: {title: "namn", subtitle: "ingress", media: "bilder.0"},
  },
})
