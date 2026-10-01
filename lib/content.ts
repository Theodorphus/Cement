import type { CatalogItem } from "@/lib/catalog";
import type { OpeningHours } from "@/lib/oppettider";
import { sanityFetch } from "@/lib/sanity/fetch";
import { toSiteImage, type SanityImage, type SiteImage } from "@/lib/sanity/image";

/**
 * Innehåll som kunden redigerar i Sanity Studio. Varje hämtning cachas av Next
 * och förnyas av webhooken när en redaktör publicerar (se lib/sanity/fetch.ts).
 * Datamängderna är små, så sidorna hämtar hela listor och filtrerar här.
 */

const IMAGE = `alt, "asset": {"_id": asset._ref}, crop, hotspot`;

const PRODUCTS_QUERY = `*[_type == "produkt" && defined(slug.current) && defined(kategori)] | order(ordning asc, namn asc) {
  "category": kategori, "slug": slug.current, "name": namn, "intro": coalesce(ingress, ""), "details": coalesce(punkter, []),
  "guide": typ == "guide", "images": coalesce(bilder[defined(asset)]{${IMAGE}}, []),
  "availability": tillganglighet, "keywords": sokord, "updatedAt": _updatedAt
}`;

const RENTALS_QUERY = `*[_type == "hyrmaskin" && defined(slug.current) && defined(bild.asset)] | order(ordning asc, namn asc) {
  "slug": slug.current, "name": namn, "intro": coalesce(ingress, ""), "details": coalesce(punkter, []),
  "image": bild{${IMAGE}}, "updatedAt": _updatedAt
}`;

const NEWS_QUERY = `*[_type == "nyhet" && (!defined(visaTill) || visaTill >= $idag)] | order(datum desc, _createdAt desc) {
  "id": _id, "title": rubrik, "kicker": etikett, text,
  "image": select(defined(bild.asset) => bild{${IMAGE}}),
  "links": coalesce(lankar[defined(url)]{"key": _key, text, "href": url}, [])
}`;

const HOURS_QUERY = `*[_id == "oppettider"][0]{
  "rows": coalesce(tider[]{"label": rubrik, "days": coalesce(dagar, []), "opens": oppnar, "closes": stanger}, []),
  "exceptions": avvikelse
}`;

type Raw<T, K extends keyof T, I> = Omit<T, K> & { [P in K]: I };

export type Rental = { slug: string; name: string; intro: string; details: string[]; image: SiteImage; updatedAt: string };
export type NewsItem = { id: string; title: string; kicker?: string; text?: string; image?: SiteImage; links: { key: string; text: string; href: string }[] };

export async function getProducts(): Promise<CatalogItem[]> {
  const rows = await sanityFetch<Raw<CatalogItem, "images", SanityImage[]>[]>(PRODUCTS_QUERY, {}, ["produkt"]);
  return rows.map(row => ({ ...row, images: row.images.map(image => toSiteImage(image, row.name)) }));
}

export async function getProduct(category: string, slug: string): Promise<CatalogItem | undefined> {
  return (await getProducts()).find(p => p.category === category && p.slug === slug);
}

export async function getRentals(): Promise<Rental[]> {
  const rows = await sanityFetch<Raw<Rental, "image", SanityImage>[]>(RENTALS_QUERY, {}, ["hyrmaskin"]);
  return rows.map(row => ({ ...row, image: toSiteImage(row.image, row.name) }));
}

export async function getNews(): Promise<NewsItem[]> {
  const idag = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Stockholm" }).format(new Date());
  const rows = await sanityFetch<Raw<NewsItem, "image", SanityImage | null>[]>(NEWS_QUERY, { idag }, ["nyhet"]);
  return rows.map(row => ({ ...row, image: row.image ? toSiteImage(row.image, row.title) : undefined }));
}

export async function getOpeningHours(): Promise<OpeningHours> {
  const hours = await sanityFetch<OpeningHours | null>(HOURS_QUERY, {}, ["oppettider"]);
  return { rows: hours?.rows ?? [], exceptions: hours?.exceptions ?? undefined };
}
