/** En rad i öppettiderna, t.ex. "Måndag–fredag" 07:00–16:00. */
export type OpeningRow = { label: string; days: string[]; opens: string; closes: string };
export type OpeningHours = { rows: OpeningRow[]; exceptions?: string };

/** "07:00" → "7", "09:30" → "9.30", som i sajtens tidigare text. */
export function shortTime(time: string): string {
  const [hours, minutes] = time.split(":");
  return String(Number(hours)) + (minutes === "00" ? "" : `.${minutes}`);
}

/** "Måndag–fredag 7–16" */
export function formatOpeningRow(row: OpeningRow): string {
  return `${row.label} ${shortTime(row.opens)}–${shortTime(row.closes)}`;
}
