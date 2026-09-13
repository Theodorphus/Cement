import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { pageMetadata } from "@/lib/site";
import { FORETAG } from "@/lib/data";
export const metadata = pageMetadata("Aktuellt", "Kontakta Öckerö Cementgjuteri om aktuellt sortiment, leveranser och öppettider.", "/aktuellt");

export default function News() {
  return <article className="content-page news-page">
    <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Aktuellt" }]} />
    <header className="catalog-intro"><div><p className="section-kicker">Inför ditt nästa besök</p><h1>Aktuellt</h1></div><p>Undrar du vad som finns hemma eller planerar du ett besök? Kontakta oss för aktuellt sortiment, beställningar och eventuella avvikande öppettider.</p></header>
    <section className="news-fuel" aria-labelledby="news-fuel-title">
      <div className="news-fuel-image"><Image src="/assets/Ved.webp" alt="Ved" fill sizes="(max-width:760px) 100vw, 480px" /></div>
      <div className="news-fuel-copy"><p className="section-kicker">Ved · Pellets · Värmeloggs</p><h2 id="news-fuel-title">Bränsle för kaminen</h2>
        <ul><li><Link href="/produkter/ved/ved">Björkved<span aria-hidden="true">↗</span></Link></li><li><Link href="/produkter/ved/pellets">Fågelfors pellets<span aria-hidden="true">↗</span></Link></li><li><Link href="/produkter/ved/varmeloggs">Fågelfors värmeloggs<span aria-hidden="true">↗</span></Link></li></ul>
        <p>Kontakta oss för aktuella priser, tillgänglighet och leverans.</p>
      </div>
    </section>
    <div className="news-panels">
      <section className="news-hours"><p className="section-kicker">Välkommen till gården</p><h2>Öppettider och helger</h2><div className="news-hours-rows"><p>{FORETAG.oppettiderRad1}</p><p>{FORETAG.oppettiderRad2}</p></div><p>{FORETAG.oppettiderAvvikelse}</p><Link href="/kontakt" className="btn btn-deep">Kontakta oss <span className="arrow-icon" aria-hidden="true">↗</span></Link></section>
      <section className="news-social"><p className="section-kicker">Följ oss</p><h2>Öckerö Cementgjuteri<br />på Facebook</h2><a href="https://www.facebook.com/ockerocementgjuteriab" target="_blank" rel="noopener noreferrer" className="btn btn-light">Besök oss på Facebook<span className="arrow-icon" aria-hidden="true">↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a></section>
    </div>
    <section className="news-projects"><h2>Planera ditt projekt</h2><div><Link href="/produkter/ved">Ved och pellets<span className="arrow-icon" aria-hidden="true">↗</span></Link><Link href="/produkter/markbelaggning">Markbeläggning<span className="arrow-icon" aria-hidden="true">↗</span></Link><Link href="/leverans">Leverans och hämtning<span className="arrow-icon" aria-hidden="true">↗</span></Link></div></section>
  </article>;
}
