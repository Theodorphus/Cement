import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { revalidateTag } from "next/cache";
import { CONTENT_TYPES, type ContentType } from "@/lib/sanity/fetch";

/**
 * Tar emot Sanitys webhook när en redaktör publicerar, ändrar eller tar bort
 * innehåll, och förnyar cachen för just den innehållstypen. Webhooken skickar
 * {"_type": ...} och signeras med SANITY_REVALIDATE_SECRET.
 */
export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return Response.json({ error: "Webhooken är inte konfigurerad." }, { status: 500 });
  const body = await request.text();
  const signature = request.headers.get(SIGNATURE_HEADER_NAME) ?? "";
  if (!(await isValidSignature(body, signature, secret))) return Response.json({ error: "Ogiltig signatur." }, { status: 401 });
  let type: unknown;
  try { type = (JSON.parse(body) as { _type?: unknown })._type; } catch { return Response.json({ error: "Ogiltig JSON." }, { status: 400 }); }
  if (!CONTENT_TYPES.includes(type as ContentType)) return Response.json({ revalidated: [] });
  revalidateTag(type as ContentType);
  return Response.json({ revalidated: [type] });
}
