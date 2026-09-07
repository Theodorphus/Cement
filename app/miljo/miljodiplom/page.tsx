import Link from "next/link";
import {pageMetadata} from "@/lib/site";
export const metadata=pageMetadata("Miljödiplom","Kontakta Öckerö Cementgjuteri för aktuella handlingar om miljöarbetet.","/miljo/miljodiplom");
export default function Diploma(){return <article className="content-page reading-width"><h1>Miljödiplom</h1><p className="intro">Behöver du aktuella handlingar om vårt miljöarbete inför ett inköp eller projekt?</p><p>Kontakta oss så hjälper vi dig med rätt underlag.</p><Link className="btn btn-deep" href="/kontakt?produkt=Milj%C3%B6dokumentation">Fråga om miljödokumentation</Link></article>;}

