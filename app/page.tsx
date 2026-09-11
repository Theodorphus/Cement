import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import CategoryCard from "@/components/CategoryCard";
import HeroVideo from "@/components/HeroVideo";
import { KATEGORIER, FORETAG } from "@/lib/data";

export const metadata = { alternates: { canonical: "/" } };

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span className="arrow-icon" aria-hidden="true">{diagonal ? "↗" : "→"}</span>;
}

export default function Home() {
  return (
    <div className="home-page">
      <section className="home-hero" aria-labelledby="home-title">
        <Image src="/assets/Hero5.webp" alt="" fill priority sizes="100vw" className="home-hero-image" />
        <div className="home-hero-shade" />
        <div className="container home-hero-content">
          <div className="hero-eyebrow"><span /> Öckerö Cementgjuteri · Göteborgs skärgård</div>
          <h1 id="home-title">En stadig grund.<br /><em>För livet i skärgården.</em></h1>
          <p className="home-hero-description">Byggmaterial och betong till husgrunder och trädgårdar. Vi hjälper dig från materialval till leverans i Göteborgs skärgård och Torslanda.</p>
          <div className="hero-cta">
            <Link href="/produkter" className="btn btn-light">Se våra produkter <Arrow /></Link>
            <Link href="/kontakt" className="btn btn-glass">Kontakta oss <Arrow diagonal /></Link>
          </div>
          <div className="hero-baseline">
            <span>Byggmaterial <i /> Betong <i /> Maskinuthyrning</span>
            <a href="#sortiment">Upptäck sortimentet <span className="scroll-cue" aria-hidden="true">↓</span></a>
          </div>
        </div>
      </section>

      <section className="home-service-strip" aria-label="Öppettider, leverans och besök">
        <div className="container home-service-grid">
          <div className="service-item">
            <span className="service-index" aria-hidden="true">01</span>
            <div><h2>Välkommen till oss</h2><p>{FORETAG.oppettiderRad1}<br />{FORETAG.oppettiderRad2}</p></div>
          </div>
          <Link href="/leverans" className="service-item">
            <span className="service-index" aria-hidden="true">02</span>
            <div><h2>Hela vägen till ditt projekt</h2><p>Leverans i skärgården och Torslanda.<br />Även färdig betong.</p></div><Arrow diagonal />
          </Link>
          <Link href="/kontakt" className="service-item">
            <span className="service-index" aria-hidden="true">03</span>
            <div><h2>Besök oss på Öckerö</h2><p>{FORETAG.adressRad1}<br />{FORETAG.adressRad2}</p></div><Arrow diagonal />
          </Link>
        </div>
      </section>

      <div id="sortiment" className="home-assortment">
        <Reveal className="container home-section">
          <div className="section-heading">
            <div><p className="section-kicker">01 / Vårt sortiment</p><h2>Det börjar med<br /><em>rätt material.</em></h2></div>
            <div className="section-heading-aside"><p>Från grunden till sista trädgårdsplattan. Upptäck material för ditt nästa projekt.</p><Link href="/produkter" className="editorial-link">Utforska alla produkter <Arrow /></Link></div>
          </div>
          <div className="home-featured-categories">
            {KATEGORIER.slice(0, 2).map((kat, index) => <Link key={kat.slug} href={`/produkter/${kat.slug}`} className="home-category-feature">
              {kat.img && <Image src={kat.img} alt="" fill sizes="(max-width:700px) 100vw, 580px" />}
              <span className="feature-category-number" aria-hidden="true">0{index + 1}</span>
              <div className="feature-category-copy"><h3>{kat.name}</h3><p>{kat.desc}</p><span className="feature-category-action">Utforska sortimentet <Arrow diagonal /></span></div>
            </Link>)}
          </div>
          <div className="home-category-divider"><span>Fler produktområden</span><span aria-hidden="true">03 — 07</span></div>
          <div className="home-category-grid home-secondary-categories">
            {KATEGORIER.slice(2).map((kat) => <CategoryCard key={kat.slug} href={`/produkter/${kat.slug}`} name={kat.name} desc={kat.desc} img={kat.img} />)}
          </div>
        </Reveal>
      </div>

      <Reveal className="container home-rental-wrap">
        <div className="home-rental">
          <div className="rental-heading"><p className="section-kicker">02 / Maskinuthyrning</p><h2>Rätt kraft.<br /><em>När du behöver den.</em></h2></div>
          <div className="rental-details"><p>Hyr kombihammare, kapmaskin, betongslip, jordfräs med mera. Vi hjälper dig med maskinen för jobbet — du hämtar på plats på Öckerö.</p><Link href="/uthyrning" className="btn btn-light">Se våra maskiner <Arrow /></Link><span className="rental-note">Mark · Trädgård · Betongarbete</span></div>
        </div>
      </Reveal>

      <Reveal className="container home-section home-people">
        <div className="home-people-image">
          <Image src="/assets/Personal.webp" alt="Personalen på Öckerö Cementgjuteri utanför butiken på Öckerö" fill sizes="(max-width: 860px) 100vw, 600px" />
          <div className="image-caption"><span>Personlig service. Lokal kunskap.</span><span>Öckerö <Arrow diagonal /></span></div>
        </div>
        <div className="home-people-copy">
          <p className="section-kicker">03 / Vi som jobbar här</p>
          <h2>Material är vår vardag.<br /><em>Ditt projekt är unikt.</em></h2>
          <p className="people-lead">Vi hjälper dig välja rätt material till ditt projekt.</p>
          <p>Berätta vad du ska bygga så går vi igenom mängder, alternativ och leverans tillsammans. Välkommen in på gården eller hör av dig så tar vi det på telefon.</p>
          <div className="actions"><Link href="/kontakt" className="btn btn-deep">Kontakta oss <Arrow /></Link><a href={FORETAG.telefonHref} className="editorial-link">{FORETAG.telefon} <Arrow diagonal /></a></div>
          <div className="home-supporter">
            <Image src="/assets/Barnsupporter.webp" alt="Barncancerfondens märke: Vårt företag är Barnsupporter 2024" width={320} height={268} sizes="76px" />
            <p>Vi är stolta Barnsupporter och stödjer <a href="https://www.barncancerfonden.se/" target="_blank" rel="noopener noreferrer">Barncancerfondens<span aria-hidden="true"> ↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a> arbete för barn med cancer och deras familjer.</p>
          </div>
        </div>
      </Reveal>

      <div className="home-islands">
        <Reveal className="container home-section">
          <div className="section-heading"><div><p className="section-kicker">04 / Ute på öarna</p><h2>Gjutet på Öckerö.<br /><em>En del av skärgården.</em></h2></div><p className="islands-intro">Våra bord, bänkar, krukor och fyr finns hos Tullhuset. Utanför Betel står gigantfyren och bänken med kullersten. På stenpiren ligger våra ejdrar uppradade.</p></div>
          <div className="home-islands-grid">
            <div className="islands-video"><HeroVideo src="/assets/Hero%20vid.mp4" /></div>
            <Link href="/produkter/markbelaggning/ejder" className="ejder-feature" id="ejder">
              <div className="ejder-image"><Image src="/assets/Ejder.jpg" alt="Ejder i betong" fill sizes="(max-width: 860px) 100vw, 420px" /></div>
              <div className="ejder-copy"><div><span className="section-kicker">Form & funktion</span><h3>Ejder 400 kg</h3><p>Den fina trafikavstängaren.</p></div><span className="circle-arrow" aria-hidden="true">↗</span></div>
            </Link>
          </div>
        </Reveal>
      </div>

      <div className="home-suppliers"><div className="container"><p className="section-kicker">Våra leverantörer</p><Link href="/vara-leverantorer">Se våra leverantörer och produktområden <Arrow /></Link></div></div>
    </div>
  );
}
