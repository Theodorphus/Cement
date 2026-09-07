import type {MetadataRoute} from "next";
import {KATEGORIER} from "@/lib/data";
import {CATALOG,productPath} from "@/lib/catalog";
import {RENTALS} from "@/lib/rental";
import {SUPPLIERS} from "@/lib/suppliers";
import {SITE_URL,CONTENT_UPDATED} from "@/lib/site";
export default function sitemap():MetadataRoute.Sitemap {
 const paths=["/","/produkter","/uthyrning","/vara-leverantorer","/miljo","/miljo/miljopolicy","/miljo/miljodiplom","/aktuellt","/kontakt","/leverans","/integritet","/cookies",...KATEGORIER.map(k=>`/produkter/${k.slug}`),...CATALOG.map(productPath),...RENTALS.map(r=>`/uthyrning/${r.slug}`),...SUPPLIERS.map(s=>`/vara-leverantorer/${s.slug}`)];
 return paths.map(path=>({url:SITE_URL+(path==="/"?"":path),lastModified:CONTENT_UPDATED}));
}

