import Image from "next/image";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Reveal from "@/components/Reveal";
import { pageMetadata } from "@/lib/site";
import { FORETAG } from "@/lib/data";

export const metadata = pageMetadata("Leverans och hämtning", "Beställ byggmaterial och betong för leverans i Göteborgs skärgård och Torslanda, eller hämta på Öckerö.", "/leverans");

export default function Delivery() {
  return (
    <article className="content-page delivery-page">
      <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Leverans och hämtning" }]} />
      <header className="catalog-intro">
        <div><p className="section-kicker">Skärgården & Torslanda</p><h1>Leverans<br />och hämtning</h1></div>
        <p>Vi säljer och levererar material till husgrunder och trädgårdar främst i Göteborgs skärgård och Torslanda.</p>
      </header>
      <div className="delivery-planning">
        <figure className="delivery-photo"><Image src="/assets/Leverans.webp" alt="Träpallar med marksten och betongplattor förberedda för transport" fill sizes="(max-width:860px) 100vw, 580px" priority /><figcaption>Från vår gård till ditt projekt.</figcaption></figure>
        <section className="delivery-steps"><p className="section-kicker">Så går det till</p><h2>Planera din leverans</h2><ol>
          <li><h3>Material & mängd</h3><p>Berätta vilket material och vilken mängd du behöver.</p></li>
          <li><h3>Plats & tid</h3><p>Ange adress, önskat datum och hur platsen går att nå. Berätta om det finns begränsat utrymme för fordon eller lossning.</p></li>
          <li><h3>Vi bekräftar upplägget</h3><p>Vi bekräftar material, transportkostnad och leveransupplägg innan beställningen är klar.</p></li>
        </ol><Link href="/kontakt?produkt=Leverans" className="btn btn-deep">Fråga om leverans <span className="arrow-icon" aria-hidden="true">↗</span></Link></section>
      </div>
      <Reveal className="delivery-options">
        <section className="delivery-option"><p className="section-kicker">Inför gjutningen</p><h2>Färdig betong</h2><p>Kontakta oss i god tid inför gjutningen. Beskriv vad du ska gjuta, beräknad volym, plats och önskat datum så går vi igenom möjligheterna tillsammans.</p></section>
        <section className="delivery-option"><p className="section-kicker">Välkommen till Öckerö</p><h2>Hämta på gården</h2><p>{FORETAG.adressRad1}, {FORETAG.adressRad2}. Kontakta oss i förväg för att kontrollera tillgänglighet och förbereda din hämtning.</p><div className="delivery-visit"><p>{FORETAG.oppettiderRad1}<br />{FORETAG.oppettiderRad2}</p><a href={FORETAG.mapsUrl} target="_blank" rel="noopener noreferrer" className="editorial-link">Hitta hit <span className="arrow-icon" aria-hidden="true">↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a></div></section>
      </Reveal>
    </article>
  );
}
