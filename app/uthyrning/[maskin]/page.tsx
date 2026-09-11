import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { RENTALS } from "@/lib/rental";
import { FORETAG } from "@/lib/data";
import { pageMetadata } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() { return RENTALS.map(r => ({ maskin: r.slug })); }
type Props = { params: Promise<{ maskin: string }> };
export async function generateMetadata({ params }: Props) {
  const { maskin } = await params;
  const r = RENTALS.find(r => r.slug === maskin);
  return r ? pageMetadata(r.name, r.intro, `/uthyrning/${r.slug}`) : {};
}
export default async function MachinePage({ params }: Props) {
  const { maskin } = await params;
  const r = RENTALS.find(r => r.slug === maskin);
  if (!r) notFound();
  return <article className="content-page product-page machine-page">
    <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Uthyrning", href: "/uthyrning" }, { label: r.name }]} />
    <div className="product-layout">
      <div className="machine-visual"><div className="machine-image"><Image src={r.img} alt={r.name} fill priority sizes="(max-width:860px) 100vw, 580px" /></div><div className="machine-image-caption"><span>Maskinuthyrning</span><span>Hämtas på Öckerö</span></div></div>
      <div className="product-copy"><p className="eyebrow">Utrustning för ditt projekt</p><h1>{r.name}</h1><p className="intro">{r.intro}</p><ul className="product-details">{r.details.map(d => <li key={d}>{d}</li>)}</ul>
        <section className="machine-booking"><p className="section-kicker">Bokning & hämtning</p><h2>Så bokar du</h2><p>Kontakta oss med önskat datum och hyrestid. Vi går igenom rätt maskin, tillbehör, pris och villkor samt när du kan hämta och lämna på {FORETAG.gata}.</p><div className="actions"><Link className="btn btn-deep" href={`/kontakt?produkt=${encodeURIComponent(r.name)}`}>Skicka bokningsförfrågan <span className="arrow-icon" aria-hidden="true">↗</span></Link><a href={FORETAG.telefonHref} className="editorial-link">Ring {FORETAG.telefon}</a></div></section>
      </div>
    </div>
    <div className="supplier-return"><Link href="/uthyrning" className="editorial-link">← Alla maskiner och redskap</Link></div>
  </article>;
}
