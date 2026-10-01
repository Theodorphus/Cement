import type {MetadataRoute} from "next";
import {KATEGORIER} from "@/lib/data";
import {productPath} from "@/lib/catalog";
import {getProducts, getRentals} from "@/lib/content";
import {SUPPLIERS} from "@/lib/suppliers";
import {SITE_URL,CONTENT_UPDATED} from "@/lib/site";
export default async function sitemap():Promise<MetadataRoute.Sitemap> {
 const [products,rentals]=await Promise.all([getProducts(),getRentals()]);
 const paths=["/","/produkter","/uthyrning","/vara-leverantorer","/miljo","/miljo/miljopolicy","/aktuellt","/kontakt","/leverans","/integritet","/cookies",...KATEGORIER.map(k=>`/produkter/${k.slug}`),...SUPPLIERS.map(s=>`/vara-leverantorer/${s.slug}`)];
 return [
  ...paths.map(path=>({url:SITE_URL+(path==="/"?"":path),lastModified:CONTENT_UPDATED})),
  ...products.map(p=>({url:SITE_URL+productPath(p),lastModified:p.updatedAt})),
  ...rentals.map(r=>({url:`${SITE_URL}/uthyrning/${r.slug}`,lastModified:r.updatedAt})),
 ];
}
