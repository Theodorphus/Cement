import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import { KONTAKTER, telHref, FORETAG } from "@/lib/data";

import { contactConfigured } from "@/lib/contact-config";
export const dynamic = "force-dynamic";

const BUTIK_IMG = "/assets/Butik.jpg";

export const metadata: Metadata = {
  title: "Kontakta oss",
  alternates: { canonical: "/kontakt" },
  openGraph: { url: "/kontakt" },
  description:
    `Kontakta ${FORETAG.namn} — ${FORETAG.gata}, ${FORETAG.adressRad2}. Telefon ${FORETAG.telefon}. Kontakta oss om material, leverans och uthyrning.`,
};

export default async function KontaktPage({ searchParams }: { searchParams: Promise<{ produkt?: string | string[] }> }) {
  const query = await searchParams;
  const subject = typeof query.produkt === "string" ? query.produkt.slice(0, 150) : "";
  return (
    <div
      className="content-page contact-page"
    >
      <Breadcrumb
        crumbs={[{ label: "Startsida", href: "/" }, { label: "Kontakt" }]}
        style={{ marginBottom: 14 }}
      />
      <header className="catalog-intro contact-intro">
        <div><p className="section-kicker">Personlig service på Öckerö</p><h1>Kontakta oss</h1></div>
        <p>Vi hjälper dig med material, leverans och uthyrning. Ring, mejla eller besök oss på gården.</p>
      </header>

      <div
        className="grid-2 contact-layout"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Vänster: adress, kontaktpersoner, butiksbild */}
        <div>
          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--kant)",
              borderRadius: 14,
              padding: "30px 32px",
              marginBottom: 20,
            }}
          >
            <h2 className="contact-info-title" style={eyebrow}>Besök &amp; post</h2>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>
              {FORETAG.namn}
            </div>
            <div style={{ fontSize: 15.5, lineHeight: 1.6, color: "#3A484C" }}>
              {FORETAG.adressRad1}
              <br />
              {FORETAG.adressRad2}
              <br />
              Telefon <a href={FORETAG.telefonHref}>{FORETAG.telefon}</a>
              <p className="contact-hours"><strong>Öppettider</strong><br />{FORETAG.oppettiderRad1}<br />{FORETAG.oppettiderRad2}</p>
              <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55, margin: "8px 0 0" }}>{FORETAG.oppettiderAvvikelse}</p>
            </div>
            <a
              href={FORETAG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
              style={{ display: "inline-block", marginTop: 14, fontSize: 14.5 }}
            >
              Visa på karta →
            </a>
          </div>

          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--kant)",
              borderRadius: 14,
              padding: "30px 32px",
              marginBottom: 20,
            }}
          >
            <h2 className="contact-info-title" style={{ ...eyebrow, marginBottom: 16 }}>Kontaktpersoner</h2>
            <div style={{ display: "grid", gap: 14 }}>
              {KONTAKTER.map((pers) => (
                <div
                  key={pers.name}
                  className="kontakt-rad"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 14,
                    borderBottom: "1px solid rgba(32,43,46,0.06)",
                    paddingBottom: 14,
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: 15.5 }}>
                      {pers.name}
                    </div>
                    {pers.email && (
                      <a
                        href={`mailto:${pers.email}`}
                        style={{ fontSize: 13.5, wordBreak: "break-word" }}
                      >
                        {pers.email}
                      </a>
                    )}
                  </div>
                  <a
                    href={telHref(pers.phone)}
                    style={{
                      fontWeight: 600,
                      fontSize: 14.5,
                      whiteSpace: "nowrap",
                      flex: "none",
                    }}
                  >
                    {pers.phone}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="visit-pair">
            <a
              href={FORETAG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Öppna vår adress i Google Maps"
              className="visit-photo"
              style={{ backgroundImage: `url('${BUTIK_IMG}')` }}
            />
            <div className="visit-map">
              <iframe
                src={FORETAG.mapsEmbedUrl}
                title={`Karta över ${FORETAG.namn}, ${FORETAG.adressRad1}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
            Vår gård på {FORETAG.gata}, {FORETAG.ort}.{" "}
            <a
              href={FORETAG.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="link-arrow"
            >
              Öppna i Google Maps →
            </a>
          </div>

          <p>Besök gärna vår utställning med marksten och plattor. Ring oss om du vill planera ditt besök.</p>
        </div>

        {/* Höger: formulär (sticky) */}
        <div
          className="contact-form-panel"
          style={{
            background: "var(--deep)",
            borderRadius: 14,
            padding: "38px 40px",
            position: "sticky",
            top: 100,
          }}
        >
          <h2
            style={{
              fontSize: 32,
              color: "var(--ljus)",
              margin: "0 0 6px",
            }}
          >
            Mejla oss
          </h2>
          <p
            style={{
              color: "rgba(253,251,246,0.7)",
              fontSize: 14.5,
              margin: "0 0 24px",
            }}
          >
            Berätta vad du behöver så hjälper vi dig vidare.
          </p>
          {contactConfigured() ? <ContactForm key={subject} subject={subject} /> : <div className="contact-direct">
            <p>Ring oss eller mejla direkt till en kontaktperson så hjälper vi dig med din förfrågan.</p>
            <a className="btn btn-light" href={FORETAG.telefonHref}>Ring {FORETAG.telefon}</a>
            {KONTAKTER.filter(person => person.email).map(person => <a key={person.email} href={"mailto:" + person.email + "?subject=" + encodeURIComponent(subject ? "Förfrågan: " + subject : "Förfrågan från hemsidan")}>Mejla {person.name}<span>{person.email}</span></a>)}
            {subject && <p>Din förfrågan gäller: <strong>{subject}</strong></p>}
            <p>Berätta gärna vad du behöver, mängd, leveransort eller hämtning och önskat datum.</p>
          </div>}
        </div>
      </div>
    </div>
  );
}

const eyebrow: React.CSSProperties = {
  fontSize: 11,
  letterSpacing: "0.14em",
  textTransform: "uppercase",
  color: "var(--muted)",
  marginBottom: 12,
};
