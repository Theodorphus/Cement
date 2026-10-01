import type { SiteImage } from "@/lib/sanity/image";
import { getKategori, KATEGORIER } from "@/lib/data";

/** En produktgrupp eller guide. Innehållet redigeras i Sanity (se lib/content.ts). */
export type CatalogItem = {
  category: string; slug: string; name: string; intro: string; details: string[];
  guide: boolean; images: SiteImage[]; availability?: string; keywords?: string; updatedAt: string;
};
export function productPath(item: Pick<CatalogItem, "category" | "slug">) { return `/produkter/${item.category}/${item.slug}`; }
export const MATERIALS = [
 ["Sand", "Gjutsand 0/8", "Putssand 0/4"],
 ["Krossprodukter", "Bärlagergrus 0/32", "Väggrus 0/18", "Stenmjöl 0/5", "Flis 2/5", "Singel 5/8 och 8/11", "Makadam 11/16 och 16/22", "Asfaltkross"],
 ["Jord i lösvikt", "Harpad matjord", "Fyllnadsjord"]
];
export type SearchEntry = { name: string; href: string; category?: string; search: string };
/** Sökindex för produktsökningen: produkter, sökord från Sanity och kategorier. */
export function searchIndex(products: CatalogItem[]): SearchEntry[] {
 return [
  ...products.map(p=>({name:p.name,href:productPath(p),category:getKategori(p.category)?.name,search:[p.name,p.intro,...p.details,p.keywords??""].join(" ")})),
  ...KATEGORIER.map(k=>({name:k.name,href:`/produkter/${k.slug}`,category:"Produktkategori",search:[k.name,k.desc,...(k.slug === "sand-kross-jord" ? MATERIALS.flat() : [])].join(" ")})),
 ];
}
