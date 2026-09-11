import Image from "next/image";
import Link from "next/link";
import { FORETAG } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-contact">
          <div><p className="section-kicker">Personlig service på Öckerö</p><h2>Vi hjälper dig <em>vidare.</em></h2></div>
          <a href={FORETAG.telefonHref} className="footer-phone"><span className="footer-phone-label">Ring oss och berätta om ditt projekt</span><span>{FORETAG.telefon}<span className="footer-phone-arrow" aria-hidden="true">↗</span></span></a>
        </div>
        <div className="footer-columns">
          <div className="footer-brand">
            <Link href="/" aria-label="Öckerö Cementgjuteri – startsida"><Image src="/assets/Logotyp-ljus.webp" alt={FORETAG.namn} width={713} height={180} sizes="230px" /></Link>
            <p>Byggmaterial och betong.<br />Med skärgården som hemmaplan.</p>
          </div>
          <nav aria-label="Sortiment i sidfoten"><h3>Sortiment</h3><Link href="/produkter">Produkter</Link><Link href="/produkter/markbelaggning">Markbeläggning</Link><Link href="/leverans">Leverans och hämtning</Link><Link href="/uthyrning">Uthyrning</Link></nav>
          <nav aria-label="Företaget i sidfoten"><h3>Företaget</h3><Link href="/vara-leverantorer">Våra leverantörer</Link><Link href="/miljo">Miljö</Link><Link href="/aktuellt">Aktuellt</Link><Link href="/kontakt">Kontakt</Link></nav>
          <div className="footer-visit"><h3>Välkommen hit</h3><address>{FORETAG.adressRad1}<br />{FORETAG.adressRad2}</address><a href={FORETAG.mapsUrl} target="_blank" rel="noopener noreferrer" className="footer-map">Visa på karta <span aria-hidden="true">↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a><h3 className="footer-hours-heading">Öppettider</h3><p>{FORETAG.oppettiderRad1}<br />{FORETAG.oppettiderRad2}</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Öckerö Cementgjuteri AB</span><div><Link href="/cookies">Cookies</Link><Link href="/integritet">Personuppgifter</Link></div></div>
      </div>
    </footer>
  );
}
