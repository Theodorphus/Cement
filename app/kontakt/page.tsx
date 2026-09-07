import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import ContactForm from "@/components/ContactForm";
import { KONTAKTER, telHref, FORETAG } from "@/lib/data";

const BUTIK_IMG = "/assets/Butik.jpg";

export const metadata: Metadata = {
  title: "Kontakta oss",
  alternates: { canonical: "/kontakt" },
  openGraph: { url: "/kontakt" },
  description:
    "Kontakta Öckerö Cementgjuteri AB — Långesand 7, 475 31 Öckerö. Telefon 031-96 60 66. Kontakta oss om material, leverans och uthyrning.",
};

export default async function KontaktPage({ searchParams }: { searchParams: Promise<{ produkt?: string | string[] }> }) {
  const query = await searchParams;
  const subject = typeof query.produkt === "string" ? query.produkt.slice(0, 150) : "";
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[{ label: "Startsida", href: "/" }, { label: "Kontakt" }]}
        style={{ marginBottom: 14 }}
      />
      <h1 style={{ fontSize: 54, margin: "0 0 40px" }}>Kontakta oss</h1>

      <div
        className="grid-2"
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
            <div style={eyebrow}>Besök &amp; post</div>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>
              Öckerö Cementgjuteri AB
            </div>
            <div style={{ fontSize: 15.5, lineHeight: 1.6, color: "#3A484C" }}>
              Långesand 7
              <br />
              475 31 Öckerö
              <br />
              Telefon <a href="tel:031966066">031-96 60 66</a>
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
            <div style={{ ...eyebrow, marginBottom: 16 }}>Kontaktpersoner</div>
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

          <a
            href={FORETAG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Öppna vår adress i Google Maps"
            style={{
              display: "block",
              borderRadius: 14,
              overflow: "hidden",
              height: 220,
              backgroundImage: `url('${BUTIK_IMG}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 10 }}>
            Vår gård på Långesand 7, Öckerö.{" "}
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
          <ContactForm subject={subject} />
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
