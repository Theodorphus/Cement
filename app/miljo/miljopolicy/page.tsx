import Link from "next/link";
import {pageMetadata} from "@/lib/site";
export const metadata=pageMetadata("Miljöpolicy","Öckerö Cementgjuteris inriktning för miljöarbetet.","/miljo/miljopolicy");
export default function Policy(){return <article className="content-page reading-width"><h1>Miljöpolicy</h1><p className="intro">Vår inriktning är att minska verksamhetens miljöbelastning och arbeta för ständiga förbättringar.</p><ul className="product-details"><li>Minska resursförbrukning och främja återanvändning och återvinning.</li><li>Väga in miljöpåverkan vid inköp av varor och tjänster.</li><li>Samordna transporter när det är möjligt.</li><li>Följa miljökrav som berör verksamheten.</li></ul><p><Link href="/kontakt?produkt=Milj%C3%B6policy">Kontakta oss för den fullständiga, aktuella miljöpolicyn.</Link></p></article>;}

