// Produktkategorierna styrs av webbplatsen (adresser, bilder och texter ligger i
// lib/data.ts). Listan här måste stämma med KATEGORIER där – testet
// tests/sanity-schema.test.mjs kontrollerar det.
export const KATEGORIER = [
  {title: "Betong/Cement", value: "betong-cement"},
  {title: "Markbeläggning", value: "markbelaggning"},
  {title: "Sand/Krossprodukter/Jord", value: "sand-kross-jord"},
  {title: "Byggmaterial", value: "byggmaterial"},
  {title: "Sten/Leca/Rör", value: "sten-leca-ror"},
  {title: "Ved", value: "ved"},
  {title: "Trädgårdsdekoration/Rengöring", value: "tradgardsdekoration-rengoring"},
]
