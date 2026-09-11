import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { SUPPLIERS } from "@/lib/suppliers";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Våra leverantörer", "Leverantörer och produktområden hos Öckerö Cementgjuteri.", "/vara-leverantorer");

export default function Suppliers() {
  return (
    <div className="content-page suppliers-page">
      <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Våra leverantörer" }]} />
      <header className="catalog-intro"><div><p className="section-kicker">Tillverkare & produktområden</p><h1>Våra leverantörer</h1></div><p>Upptäck produktområdena och hitta vidare till tillverkarna. Kontakta oss om vad vi kan ta hem till ditt projekt.</p></header>
      <div className="supplier-directory-heading" aria-hidden="true"><span>Leverantör</span><span>Produktområde</span></div>
      <ul className="supplier-directory">
        {SUPPLIERS.map((s, index) => <li key={s.slug}><Link href={`/vara-leverantorer/${s.slug}`}><span className="supplier-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><h2>{s.name}</h2><p>{s.desc}</p><span className="supplier-directory-arrow" aria-hidden="true">↗</span></Link></li>)}
      </ul>
    </div>
  );
}
