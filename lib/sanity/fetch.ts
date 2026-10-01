import { SANITY_API_VERSION, SANITY_DATASET, SANITY_PROJECT_ID } from "./env.ts";

/** Innehållstyper i Sanity. Varje typ är också en cache-tagg som webhooken förnyar. */
export const CONTENT_TYPES = ["produkt", "hyrmaskin", "nyhet", "oppettider"] as const;
export type ContentType = (typeof CONTENT_TYPES)[number];

/**
 * Hämtar publicerat innehåll via Sanitys HTTP-API. Svaret cachas av Next och
 * förnyas när webhooken i app/api/revalidate anropar revalidateTag, med en
 * timme som reserv om en webhook skulle gå förlorad. API:t används direkt i
 * stället för CDN:et, eftersom webhooken kan komma innan CDN:et uppdaterats.
 */
export async function sanityFetch<T>(query: string, params: Record<string, string>, tags: ContentType[]): Promise<T> {
  if (!SANITY_PROJECT_ID) throw new Error("Sanity saknar projekt-id. Ange det i lib/sanity/env.ts.");
  const url = new URL(`https://${SANITY_PROJECT_ID}.api.sanity.io/v${SANITY_API_VERSION}/data/query/${SANITY_DATASET}`);
  url.searchParams.set("query", query);
  url.searchParams.set("perspective", "published");
  for (const [name, value] of Object.entries(params)) url.searchParams.set(`$${name}`, JSON.stringify(value));
  const response = await fetch(url, { next: { revalidate: 3600, tags } });
  if (!response.ok) throw new Error(`Sanity svarade ${response.status}: ${(await response.text()).slice(0, 300)}`);
  return ((await response.json()) as { result: T }).result;
}
