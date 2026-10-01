import {ClockIcon} from "@sanity/icons/Clock"
import {defineArrayMember, defineField, defineType} from "sanity"

const KLOCKSLAG = /^([01]\d|2[0-3]):[0-5]\d$/

const VECKODAGAR = [
  {title: "Måndag", value: "Monday"},
  {title: "Tisdag", value: "Tuesday"},
  {title: "Onsdag", value: "Wednesday"},
  {title: "Torsdag", value: "Thursday"},
  {title: "Fredag", value: "Friday"},
  {title: "Lördag", value: "Saturday"},
  {title: "Söndag", value: "Sunday"},
]

const klockslag = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "string",
    description: "Skriv som 07:00.",
    validation: (rule) => rule.required().regex(KLOCKSLAG, {name: "klockslag"}),
  })

/** Ett enda dokument (se structure.ts). Visas i sidhuvud, sidfot, kontakt och Aktuellt. */
export const oppettider = defineType({
  name: "oppettider",
  title: "Öppettider",
  type: "document",
  icon: ClockIcon,
  fields: [
    defineField({
      name: "tider",
      title: "Ordinarie öppettider",
      type: "array",
      description: "En rad per grupp av dagar. Dagar som inte finns med räknas som stängda.",
      of: [
        defineArrayMember({
          type: "object",
          name: "oppettid",
          title: "Öppettid",
          fields: [
            defineField({
              name: "rubrik",
              title: "Rubrik",
              type: "string",
              description: "Så som det står på webbplatsen, till exempel ”Måndag–fredag” eller ”Lördagar”.",
              validation: (rule) => rule.required().max(40),
            }),
            defineField({
              name: "dagar",
              title: "Dagar",
              type: "array",
              of: [defineArrayMember({type: "string"})],
              options: {list: VECKODAGAR, layout: "grid"},
              description: "Används av Google för att visa om ni har öppet.",
              validation: (rule) => rule.required().min(1).unique(),
            }),
            klockslag("oppnar", "Öppnar"),
            klockslag("stanger", "Stänger"),
          ],
          preview: {
            select: {rubrik: "rubrik", oppnar: "oppnar", stanger: "stanger"},
            prepare: ({rubrik, oppnar, stanger}) => ({title: `${rubrik ?? ""} ${oppnar ?? ""}–${stanger ?? ""}`}),
          },
        }),
      ],
      validation: (rule) => rule.required().min(1),
    }),
    defineField({
      name: "avvikelse",
      title: "Röda dagar och helger",
      type: "text",
      rows: 3,
      description: "Visas under öppettiderna på kontakt- och Aktuelltsidan. Enstaka avvikande dagar läggs hellre som ett inlägg under Aktuellt.",
    }),
  ],
  preview: {prepare: () => ({title: "Öppettider"})},
})
