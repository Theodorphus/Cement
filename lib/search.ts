/** Treat accents and punctuation consistently in queries and catalogue text. */
export function normalizeSearchText(value: string): string {
  return value.toLocaleLowerCase("sv").normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

export function searchEntries<T extends { name: string; search: string }>(entries: T[], query: string): T[] {
  const phrase = normalizeSearchText(query);
  if (!phrase) return [];
  const words = phrase.split(/\s+/);
  return entries.map((entry, index) => {
    const name = normalizeSearchText(entry.name);
    const text = normalizeSearchText(entry.search);
    if (!words.every(word => `${name} ${text}`.includes(word))) return null;
    const score = name === phrase ? 100 : name.startsWith(phrase) ? 60
      : words.every(word => name.includes(word)) ? 40
      : words.filter(word => name.includes(word)).length;
    return { entry, score, index };
  }).filter((match): match is NonNullable<typeof match> => match !== null)
    .sort((a, b) => b.score - a.score || a.index - b.index)
    .map(match => match.entry);
}
