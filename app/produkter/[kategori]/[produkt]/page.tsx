import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import ProductGallery from "@/components/ProductGallery";
import { CATALOG, getProduct, productPath } from "@/lib/catalog";
import { getKategori, FORETAG } from "@/lib/data";
import { pageMetadata } from "@/lib/site";
import imageMap from "@/lib/catalog-images.json";
export const dynamicParams = false;
export function generateStaticParams() { return CATALOG.map(p=>({kategori:p.category,produkt:p.slug})); }
type Props = {params:Promise<{kategori:string;produkt:string}>};
export async function generateMetadata({params}:Props) {
 const {kategori,produkt}=await params;const item=getProduct(kategori,produkt);
 return item ? pageMetadata(item.name,item.intro,productPath(item)) : {};
}
export default async function ProductPage({params}:Props) {
 const {kategori,produkt}=await params;const item=getProduct(kategori,produkt);const category=getKategori(kategori);
 if(!item||!category) notFound();
 const images = (imageMap as Record<string,{src:string;alt:string}[]>)[item.oldPath] ?? [];
 const related=CATALOG.filter(p=>p.category===kategori&&p.slug!==produkt);
 return <article className="content-page">
  <Breadcrumb crumbs={[{label:"Startsida",href:"/"},{label:"Produkter",href:"/produkter"},{label:category.name,href:`/produkter/${kategori}`},{label:item.name}]} />
  <div className={images.length&&!item.guide ? "product-layout" : "reading-width"}>
   {!item.guide && <ProductGallery images={images} />}
   <div><p className="eyebrow">{item.guide ? "Guide" : category.name}</p><h1>{item.name}</h1><p className="intro">{item.intro}</p>
   {item.guide ? <ol className="guide-steps">{item.details.map(detail=><li key={detail}>{detail}</li>)}</ol> : <ul className="product-details">{item.details.map(detail=><li key={detail}>{detail}</li>)}</ul>}
   {!item.guide && <dl className="product-facts"><div><dt>Tillgänglighet</dt><dd>{item.slug==="fardig-grasmatta" ? "På beställning" : "Kontakta oss för lagerstatus"}</dd></div><div><dt>Pris och leverans</dt><dd>Bekräftas vid förfrågan</dd></div></dl>}
   <div className="actions"><Link className="btn btn-deep" href={`/kontakt?produkt=${encodeURIComponent(item.name)}`}>{item.guide ? "Få hjälp med material" : "Fråga om produkten"}</Link><a className="btn btn-outline" href={FORETAG.telefonHref}>Ring {FORETAG.telefon}</a></div>
   <p><Link href="/leverans">Läs om hämtning och leverans →</Link></p>
   </div>
  </div>
  {related.length>0&&<section className="related"><h2>Mer inom {category.name.toLowerCase()}</h2><div className="subcategories">{related.map(p=><Link className="sub-card" href={productPath(p)} key={p.slug}>{p.name}<span aria-hidden="true"> →</span></Link>)}</div></section>}
 </article>;
}

