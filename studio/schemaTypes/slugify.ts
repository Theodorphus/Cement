/** Webbadresser utan å, ä, ö och specialtecken: "Gräsfrö & gödsel" → "grasfro-godsel". */
export function slugify(input: string): string {
  return input
    .toLocaleLowerCase("sv")
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 96)
}
