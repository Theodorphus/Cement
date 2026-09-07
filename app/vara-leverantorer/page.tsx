import Link from "next/link";
import {SUPPLIERS} from "@/lib/suppliers";
import {pageMetadata} from "@/lib/site";
export const metadata=pageMetadata("Våra leverantörer","Leverantörer och produktområden hos Öckerö Cementgjuteri.","/vara-leverantorer");
export default function Suppliers(){return <div className="content-page"><h1>Våra leverantörer</h1><p className="intro">Upptäck produktområdena och hitta vidare till tillverkarna. Kontakta oss om vad vi kan ta hem till ditt projekt.</p><div className="subcategories">{SUPPLIERS.map(s=><Link className="sub-card" key={s.slug} href={`/vara-leverantorer/${s.slug}`}><h2>{s.name}</h2><p>{s.desc}</p><span>Läs mer →</span></Link>)}</div></div>;}

