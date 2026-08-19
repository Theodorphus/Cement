import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import { FORETAG } from "@/lib/data";

/**
 * Texten är avskriven ordagrant från kundens GDPR-sida på den gamla sajten,
 * där hela policyn låg som en bild (och därmed var osökbar och oläsbar för
 * skärmläsare). Innehållet är från 2018 och handlar bara om kundregistret —
 * det säger ingenting om kontaktformuläret eller den inbäddade kartan på den
 * här sajten. Se README: kunden behöver komplettera innan lansering.
 */

export const metadata: Metadata = {
  title: "Integritetspolicy",
  description:
    "Så hanterar Öckerö Cementgjuteri AB dina personuppgifter. Vi lämnar aldrig ut dina uppgifter till någon annan.",
};

export default function IntegritetspolicyPage() {
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[{ label: "Startsida", href: "/" }, { label: "Integritetspolicy" }]}
        style={{ marginBottom: 14 }}
      />

      <h1 style={{ fontSize: 50, margin: "0 0 12px" }}>Integritetspolicy</h1>
      <p style={{ ...ingress }}>För din trygghet.</p>

      <div style={{ maxWidth: "68ch", display: "grid", gap: 18 }}>
        <p style={brod}>
          Med anledning av Dataskyddsförordningen (GDPR) vill vi informera våra kunder om att
          de kunduppgifter vi har använder vi endast till:
        </p>

        <ul style={{ ...brod, margin: 0, paddingLeft: "1.3em", display: "grid", gap: 6 }}>
          <li>Utskick av fakturor</li>
          <li>Leverans av varor</li>
          <li>Kontakt för info om leverans/varor</li>
          <li>Eventuellt nyhetsbrev</li>
        </ul>

        <p style={brod}>
          Kunduppgifterna innefattar namn, adress, telefonnummer och ev. mejladress.
        </p>

        <p style={brod}>
          Har du inte handlat hos oss på över ett år är vi skyldiga att ta bort dig som kund i
          vårt register. Om du samtycker vill vi gärna ha dig kvar i kundregistret och lättast
          meddelar du oss via mejl <a href="mailto:info@ockerocement.se">info@ockerocement.se</a>{" "}
          eller via telefon <a href={FORETAG.telefonHref}>{FORETAG.telefon}</a>. Annars får vi
          skriva in dig på nytt vid köp med faktura.
        </p>

        <p style={brod}>
          Du väljer själv om du inte längre vill att vi har dina kunduppgifter kvar. Då vill vi
          att du skickar ett mejl till{" "}
          <a href="mailto:info@ockerocement.se">info@ockerocement.se</a> eller ringer oss på{" "}
          <a href={FORETAG.telefonHref}>{FORETAG.telefon}</a> och meddelar detta.
        </p>

        <p style={{ ...brod, fontWeight: 600, color: "var(--ink)" }}>
          Vi lämnar aldrig ut dina personuppgifter till någon annan.
        </p>

        <h2 style={rubrik}>Cookies och besöksstatistik</h2>

        <p style={brod}>
          Den här webbplatsen använder inga cookies. Vi mäter inte antalet
          besökare, använder ingen besöksstatistik och har inga annonsverktyg
          eller spårning från tredje part. Kartan till oss är en vanlig länk
          till Google Maps — inget kartfönster laddas in på sidan, så inget
          spåras förrän du själv väljer att klicka dig vidare.
        </p>

        <h2 style={rubrik}>När du mejlar oss via formuläret</h2>

        <p style={brod}>
          Skickar du ett meddelande via kontaktformuläret använder vi namnet,
          e-postadressen och meddelandet enbart för att svara dig. Uppgifterna
          skickas till vår e-post och sparas inte i någon separat databas på
          webbplatsen.
        </p>

        <div
          style={{
            background: "var(--paper)",
            border: "1px solid var(--kant)",
            borderRadius: 12,
            padding: "24px 26px",
            marginTop: 8,
          }}
        >
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 12,
            }}
          >
            Personuppgiftsansvarig
          </div>
          <div style={{ fontSize: 15.5, lineHeight: 1.65, color: "#3A484C" }}>
            {FORETAG.namn}
            <br />
            {FORETAG.adressRad1}
            <br />
            {FORETAG.adressRad2}
            <br />
            <a href={FORETAG.telefonHref}>{FORETAG.telefon}</a>
            <br />
            <a href="mailto:info@ockerocement.se">info@ockerocement.se</a>
          </div>
        </div>
      </div>
    </div>
  );
}

const ingress: React.CSSProperties = {
  fontSize: 17,
  color: "var(--muted)",
  maxWidth: "62ch",
  lineHeight: 1.6,
  margin: "0 0 30px",
};

const rubrik: React.CSSProperties = {
  fontSize: 26,
  margin: "14px 0 -4px",
};

const brod: React.CSSProperties = {
  fontSize: 16,
  color: "#3A484C",
  lineHeight: 1.7,
  margin: 0,
  textWrap: "pretty",
};
