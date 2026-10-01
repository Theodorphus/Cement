import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import Image from "next/image";
import { pageMetadata } from "@/lib/site";
import { getNews, getOpeningHours, type NewsItem } from "@/lib/content";
import { formatOpeningRow } from "@/lib/oppettider";
export const metadata = pageMetadata("Aktuellt", "Kontakta Öckerö Cementgjuteri om aktuellt sortiment, leveranser och öppettider.", "/aktuellt");

/** Länkar i inlägg: egna sidor via next/link, externa i ny flik. */
function NewsLink({ link }: { link: NewsItem["links"][number] }) {
  const arrow = <span aria-hidden="true">↗</span>;
  if (link.href.startsWith("/")) return <Link href={link.href}>{link.text}{arrow}</Link>;
  if (/^https?:/.test(link.href)) return <a href={link.href} target="_blank" rel="noopener noreferrer">{link.text}{arrow}<span className="visually-hidden"> (öppnas i ny flik)</span></a>;
  if (/^(mailto|tel):/.test(link.href)) return <a href={link.href}>{link.text}{arrow}</a>;
  return null;
}

export default async function News() {
  const [news, hours] = await Promise.all([getNews(), getOpeningHours()]);
  return <article className="content-page news-page">
    <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Aktuellt" }]} />
    <header className="catalog-intro"><div><p className="section-kicker">Inför ditt nästa besök</p><h1>Aktuellt</h1></div><p>Undrar du vad som finns hemma eller planerar du ett besök? Kontakta oss för aktuellt sortiment, beställningar och eventuella avvikande öppettider.</p></header>
    {news.map((item, index) => <section className={item.image ? "news-fuel" : "news-fuel news-fuel-text-only"} aria-labelledby={`nyhet-${index}`} key={item.id}>
      {item.image && <div className="news-fuel-image"><Image src={item.image.src} alt={item.image.alt} fill sizes="(max-width:760px) 100vw, 480px" style={{ objectPosition: item.image.objectPosition }} priority={index === 0} /></div>}
      <div className="news-fuel-copy">{item.kicker && <p className="section-kicker">{item.kicker}</p>}<h2 id={`nyhet-${index}`}>{item.title}</h2>
        {item.text?.split(/\n\s*\n/).map(paragraph => paragraph.trim()).filter(Boolean).map((paragraph, i) => <p className="news-text" key={i}>{paragraph}</p>)}
        {item.links.length > 0 && <ul>{item.links.map(link => <li key={link.key}><NewsLink link={link} /></li>)}</ul>}
      </div>
    </section>)}
    <div className="news-panels">
      <section className="news-hours"><p className="section-kicker">Välkommen till gården</p><h2>Öppettider och helger</h2><div className="news-hours-rows">{hours.rows.map((row, i) => <p key={i}>{formatOpeningRow(row)}</p>)}</div>{hours.exceptions && <p>{hours.exceptions}</p>}<Link href="/kontakt" className="btn btn-deep">Kontakta oss <span className="arrow-icon" aria-hidden="true">↗</span></Link></section>
      <section className="news-social"><p className="section-kicker">Följ oss</p><h2>Öckerö Cementgjuteri<br />på Facebook</h2><a href="https://www.facebook.com/ockerocementgjuteriab" target="_blank" rel="noopener noreferrer" className="btn btn-light">Besök oss på Facebook<span className="arrow-icon" aria-hidden="true">↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a></section>
    </div>
    <section className="news-projects"><h2>Planera ditt projekt</h2><div><Link href="/produkter/ved">Ved och pellets<span className="arrow-icon" aria-hidden="true">↗</span></Link><Link href="/produkter/markbelaggning">Markbeläggning<span className="arrow-icon" aria-hidden="true">↗</span></Link><Link href="/leverans">Leverans och hämtning<span className="arrow-icon" aria-hidden="true">↗</span></Link></div></section>
  </article>;
}
