import Link from "next/link";
import {pageMetadata} from "@/lib/site";
export const metadata=pageMetadata("Aktuellt","Kontakta Öckerö Cementgjuteri om aktuellt sortiment, leveranser och öppettider.","/aktuellt");
export default function News(){return <article className="content-page reading-width"><h1>Aktuellt</h1><p className="intro">Undrar du vad som finns hemma eller planerar du ett besök?</p><p>Kontakta oss för aktuellt sortiment, beställningar och eventuella avvikande öppettider.</p><div className="actions"><Link href="/kontakt" className="btn btn-deep">Kontakta oss</Link><a href="https://www.facebook.com/ockerocementgjuteriab" className="btn btn-outline">Besök oss på Facebook</a></div><h2>Planera ditt projekt</h2><p><Link href="/produkter/ved">Ved och pellets</Link> · <Link href="/produkter/markbelaggning">Markbeläggning</Link> · <Link href="/leverans">Leverans och hämtning</Link></p></article>;}

