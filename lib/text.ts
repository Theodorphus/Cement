/** Limit user-facing text without cutting a Unicode character in half. */
export function truncateText(value: string, maxCharacters: number): string {
  return Array.from(value).slice(0, Math.max(0, maxCharacters)).join("");
}
