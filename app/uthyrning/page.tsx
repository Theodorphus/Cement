import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import Breadcrumb from "@/components/Breadcrumb";
import { RENTALS } from "@/lib/rental";
import { pageMetadata } from "@/lib/site";
export const metadata=pageMetadata("Maskinuthyrning","Hyr maskiner och redskap för mark, trädgård och betongarbete på Öckerö.","/uthyrning");
export default function RentalPage(){return <div className="content-page"><Breadcrumb crumbs={[{label:"Startsida",href:"/"},{label:"Uthyrning"}]}/><h1>Maskinuthyrning</h1><p className="intro">Hitta utrustningen för ditt projekt. Kontakta oss för tillgänglighet, pris och bokning.</p><div className="subcategories">{RENTALS.map(r=><CategoryCard key={r.slug} href={`/uthyrning/${r.slug}`} name={r.name} desc={r.intro} img={r.img} headingLevel={2}/>)}</div><aside className="help-panel"><div><h2>Inför din bokning</h2><p>Beskriv arbetet, önskat datum och hur länge du behöver maskinen. Vi bekräftar pris, tillbehör och hämtning innan bokningen är klar.</p></div><Link href="/kontakt?produkt=Maskinuthyrning" className="btn btn-deep">Fråga om en maskin</Link></aside></div>;}

