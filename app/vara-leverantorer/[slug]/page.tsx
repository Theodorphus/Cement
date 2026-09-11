import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import ResourceLinks from "@/components/ResourceLinks";
import { supplierResources } from "@/lib/resources";
import { notFound } from "next/navigation";
import { SUPPLIERS } from "@/lib/suppliers";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return SUPPLIERS.map(s => ({ slug: s.slug })); }
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = SUPPLIERS.find(s => s.slug === slug);
  return s ? pageMetadata(s.name, s.desc, `/vara-leverantorer/${s.slug}`) : {};
}
export default async function Supplier({ params }: Props) {
  const { slug } = await params;
  const s = SUPPLIERS.find(s => s.slug === slug);
  if (!s) notFound();
  return <article className="content-page supplier-detail-page">
    <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Våra leverantörer", href: "/vara-leverantorer" }, { label: s.name }]} />
    <div className="supplier-profile">
      <div className="supplier-profile-copy"><p className="section-kicker">Leverantör & produktområde</p><h1>{s.name}</h1><p className="intro">{s.desc}</p><p>Hos tillverkaren hittar du produktinformation och anvisningar. Fråga oss om aktuellt sortiment och beställningsmöjligheter.</p><a className="editorial-link" href={s.url} target="_blank" rel="noopener noreferrer">Besök {s.name}<span className="arrow-icon" aria-hidden="true">↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a></div>
      <aside className="supplier-enquiry"><p className="section-kicker">Personlig hjälp på Öckerö</p><h2>Rätt material<br />för ditt projekt.</h2><p>Fråga oss om aktuellt sortiment och vad vi kan beställa hem.</p><Link className="btn btn-light" href={`/kontakt?produkt=${encodeURIComponent(s.name)}`}>Fråga oss om sortimentet <span className="arrow-icon" aria-hidden="true">↗</span></Link></aside>
    </div>
    <ResourceLinks resources={supplierResources(s.slug)} />
    <div className="supplier-return"><Link href="/vara-leverantorer" className="editorial-link">← Alla leverantörer</Link></div>
  </article>;
}
