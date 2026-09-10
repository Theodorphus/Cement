import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import { CATALOG, MATERIALS, productPath } from "@/lib/catalog";
import { KATEGORIER, getKategori, FORETAG } from "@/lib/data";
import { pageMetadata } from "@/lib/site";
export const dynamicParams = false;
export function generateStaticParams(){return KATEGORIER.map(k=>({kategori:k.slug}));}
type Props={params:Promise<{kategori:string}>};
export async function generateMetadata({params}:Props){const {kategori}=await params;const k=getKategori(kategori);return k?pageMetadata(k.name,k.desc,`/produkter/${k.slug}`):{};}
export default async function CategoryPage({params}:Props){
 const {kategori}=await params; const kat=getKategori(kategori);if(!kat)notFound();
 const products=CATALOG.filter(p=>p.category===kategori);
 return <div className="page-mount">
  <section className="category-hero" style={{backgroundImage:kat.img ? `linear-gradient(to top,rgba(18,32,38,.82),rgba(18,32,38,.25)),url('${kat.img}')`:undefined}}>
   <div className="container"><Breadcrumb light crumbs={[{label:"Startsida",href:"/"},{label:"Produkter",href:"/produkter"},{label:kat.name}]} /><h1>{kat.name}</h1><p>{kat.desc}</p></div>
  </section>
  <div className="content-page">
   {products.length>0&&<div className="subcategories">{products.map(p=><Link href={productPath(p)} className="sub-card" key={p.slug}><h2>{p.name}</h2><p>{p.intro}</p><span>{p.guide?"Läs guiden":"Visa sortiment"} →</span></Link>)}</div>}
   {kategori==="sand-kross-jord"&&<section className="related"><h2>Material i lösvikt</h2><div className="subcategories">{MATERIALS.map(([name,...items])=><div className="material-group" key={name}><h3>{name}</h3><ul>{items.map(i=><li key={i}>{i}</li>)}</ul></div>)}</div><p>Kontakta oss för mängd, försäljningsenhet och leverans.</p></section>}
   {kategori==="byggmaterial"&&<div className="reading-width"><h2>Material till ditt bygge</h2><p>Beskriv ditt projekt och vilka material du behöver. Vi hjälper dig att kontrollera sortiment och beställningsmöjligheter.</p><p>Du hittar även <Link href="/produkter/betong-cement">betong, bruk och armering</Link> samt <Link href="/produkter/sten-leca-ror">block och sten</Link> i våra produktgrupper.</p></div>}
   {kategori === "tradgardsdekoration-rengoring" && <section className="related"><h2>Ejder 400 kg</h2><p>Den dekorativa trafikavstängaren som också syns på vår startsida.</p><div className="actions"><Link href="/#ejder" className="btn btn-outline">Se Ejder</Link><Link href="/kontakt?produkt=Ejder%20400%20kg" className="btn btn-deep">Fråga om Ejder</Link></div></section>}
   <aside className="help-panel"><div><h2>Hjälp att välja och beställa</h2><p>Berätta vad du ska göra, mängd och om du vill hämta eller få leverans.</p></div><div className="actions"><Link className="btn btn-deep" href={`/kontakt?produkt=${encodeURIComponent(kat.name)}`}>Kontakta oss</Link><a href={FORETAG.telefonHref}>Ring {FORETAG.telefon}</a></div></aside>
  </div>
 </div>;
}
