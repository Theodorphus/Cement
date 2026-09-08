import {pageMetadata} from "@/lib/site";
import {FORETAG} from "@/lib/data";
export const metadata=pageMetadata("Cookies","Information om cookies och externa länkar på Öckerö Cementgjuteris webbplats.","/cookies");
export default function Cookies(){return <article className="content-page reading-width"><h1>Cookies</h1><p className="intro">Webbplatsen använder inga analys- eller marknadsföringskakor i sin egen funktionalitet.</p><p>Produktbilder och typsnitt laddas från webbplatsen. Kartor och sociala medier är vanliga länkar och laddas först när du följer länken till den externa tjänsten. Där gäller tjänstens egna inställningar och integritetsinformation.</p><p>Du kan hantera och ta bort kakor i din webbläsare. Det finns inga val för marknadsföringskakor att ändra på den här sidan.</p><p>Frågor? Kontakta oss på <a href={FORETAG.telefonHref}>{FORETAG.telefon}</a>.</p></article>;}

