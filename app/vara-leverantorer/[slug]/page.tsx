import Link from "next/link";
import ResourceLinks from "@/components/ResourceLinks";
import {supplierResources} from "@/lib/resources";
import {notFound} from "next/navigation";
import {SUPPLIERS} from "@/lib/suppliers";
import {pageMetadata} from "@/lib/site";
export const dynamicParams=false;
export function generateStaticParams(){return SUPPLIERS.map(s=>({slug:s.slug}));}
type Props={params:Promise<{slug:string}>};
export async function generateMetadata({params}:Props){const {slug}=await params;const s=SUPPLIERS.find(s=>s.slug===slug);return s?pageMetadata(s.name,s.desc,`/vara-leverantorer/${s.slug}`):{};}
export default async function Supplier({params}:Props){const {slug}=await params;const s=SUPPLIERS.find(s=>s.slug===slug);if(!s)notFound();return <article className="content-page reading-width"><Link href="/vara-leverantorer">← Våra leverantörer</Link><h1>{s.name}</h1><p className="intro">{s.desc}</p><p>Hos tillverkaren hittar du produktinformation och anvisningar. Fråga oss om aktuellt sortiment och beställningsmöjligheter.</p><div className="actions"><a className="btn btn-deep" href={s.url} target="_blank" rel="noopener noreferrer">Besök {s.name}<span aria-hidden="true"> ↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a><Link className="btn btn-outline" href={`/kontakt?produkt=${encodeURIComponent(s.name)}`}>Fråga oss om sortimentet</Link></div><ResourceLinks resources={supplierResources(s.slug)} /></article>;}

