export const CONTACT_LIMITS = { namn: 100, epost: 254, meddelande: 5000, website: 200 };
export type ContactFields = { namn: string; epost: string; meddelande: string; website: string };
export function validateContact(input: unknown): { fields?: ContactFields; error?: string } {
  if (!input || typeof input !== "object" || Array.isArray(input)) return { error: "Ogiltig förfrågan." };
  const data = input as Record<string, unknown>;
  const fields: ContactFields = { namn: "", epost: "", meddelande: "", website: "" };
  for (const key of Object.keys(fields) as (keyof ContactFields)[]) {
    const value = data[key] ?? "";
    if (typeof value !== "string") return { error: "Fyll i formuläret med text." };
    fields[key] = value.trim();
    if (fields[key].length > CONTACT_LIMITS[key]) return { error: "Ett fält är för långt. Korta texten och försök igen." };
  }
  if (!fields.namn || !fields.epost || !fields.meddelande) return { error: "Fyll i namn, e-postadress och meddelande." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.epost) || /[\r\n]/.test(fields.epost)) return { error: "Ange en giltig e-postadress." };
  return { fields };
}

