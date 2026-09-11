import Link from "next/link";
import CategoryCard from "@/components/CategoryCard";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { RENTALS } from "@/lib/rental";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Maskinuthyrning", "Hyr maskiner och redskap för mark, trädgård och betongarbete på Öckerö.", "/uthyrning");

export default function RentalPage() {
  return (
    <div className="content-page catalog-page rental-page">
      <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Uthyrning" }]} />
      <header className="catalog-intro">
        <div><p className="section-kicker">Hyr på Öckerö</p><h1>Maskinuthyrning.<br /><em>För jobbet framför dig.</em></h1></div>
        <p>Hitta utrustningen för ditt projekt. Kontakta oss för tillgänglighet, pris och bokning.</p>
      </header>
      <div className="catalog-grid rental-catalog-grid">
        {RENTALS.map((r, index) => <Reveal key={r.slug} as="div" className="catalog-card-wrap"><CategoryCard href={`/uthyrning/${r.slug}`} name={r.name} desc={r.intro} img={r.img} headingLevel={2} index={index + 1} /></Reveal>)}
      </div>
      <aside className="rental-booking">
        <div className="booking-title"><p className="section-kicker">Inför din bokning</p><h2>Berätta om jobbet.<br /><em>Vi hjälper dig välja.</em></h2></div>
        <div className="booking-details"><p>Beskriv arbetet, önskat datum och hur länge du behöver maskinen. Vi bekräftar pris, tillbehör och hämtning innan bokningen är klar.</p><Link href="/kontakt?produkt=Maskinuthyrning" className="btn btn-light">Fråga om en maskin <span className="arrow-icon" aria-hidden="true">↗</span></Link></div>
      </aside>
    </div>
  );
}
