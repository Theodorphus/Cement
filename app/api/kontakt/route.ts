import { NextResponse } from "next/server";
import { validateContact } from "@/lib/contact";
export const runtime = "nodejs";
const MAX_BODY_BYTES = 24_000;
// Instance-local backstop. Production also needs a rate limit at the hosting edge.
const attempts = new Map<string, { count: number; until: number }>();
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) return NextResponse.json({ error: "Ogiltigt ursprung." }, { status: 403 });
  if (!request.headers.get("content-type")?.includes("application/json")) return NextResponse.json({ error: "Ogiltigt format." }, { status: 415 });
  let input: unknown;
  try {
    const reader = request.body?.getReader();
    if (!reader) throw new Error("empty");
    const chunks: Uint8Array[] = []; let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > MAX_BODY_BYTES) { await reader.cancel(); return NextResponse.json({ error: "Meddelandet är för långt." }, { status: 413 }); }
      chunks.push(value);
    }
    input = JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch { return NextResponse.json({ error: "Ogiltig förfrågan." }, { status: 400 }); }
  const { fields, error } = validateContact(input);
  if (!fields) return NextResponse.json({ error }, { status: 400 });
  if (fields.website) return NextResponse.json({ error: "Kunde inte skicka formuläret." }, { status: 400 });
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO;
  const from = process.env.CONTACT_FROM;
  if (!apiKey || !to || !from || from.includes("onboarding@resend.dev")) {
    return NextResponse.json({ error: "Formuläret är tillfälligt stängt. Ring 031-96 60 66 eller mejla en av våra kontaktpersoner." }, { status: 503 });
  }
  const now = Date.now();
  for (const [key, value] of attempts) if (value.until <= now) attempts.delete(key);
  const keys = [fields.epost.toLowerCase(), "__global__"];
  if (keys.some(key => (attempts.get(key)?.count ?? 0) >= (key === "__global__" ? 50 : 5))) return NextResponse.json({ error: "För många försök. Vänta en stund eller ring oss." }, { status: 429, headers: { "Retry-After": "600" } });
  for (const key of keys) { const current = attempts.get(key); attempts.set(key, { count: (current?.count ?? 0) + 1, until: current?.until ?? now + 600_000 }); }
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST", signal: AbortSignal.timeout(12_000),
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ from, to: [to], reply_to: fields.epost, subject: "Förfrågan från ockerocement.se", text: `Namn: ${fields.namn}\nE-post: ${fields.epost}\n\n${fields.meddelande}` }),
    });
    if (!response.ok) throw new Error("delivery");
    const receipt = await response.json();
    if (typeof receipt.id !== "string" || !receipt.id) throw new Error("receipt");
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Meddelandet kunde inte skickas. Försök igen eller ring 031-96 60 66." }, { status: 502 }); }
}

