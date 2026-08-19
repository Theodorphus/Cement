import Link from "next/link";
import { FORETAG } from "@/lib/data";

export default function Footer() {
  return (
    <footer
      style={{
        background: "var(--footer)",
        color: "rgba(253,251,246,0.75)",
        marginTop: "auto",
      }}
    >
      <div
        className="container footer-grid"
        style={{
          padding: "56px 28px 30px",
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr 1fr",
          gap: 36,
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 11,
              marginBottom: 14,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                background: "var(--ljus)",
                borderRadius: 7,
                display: "grid",
                placeItems: "center",
                color: "var(--deep)",
                fontFamily: "var(--font-serif), serif",
                fontSize: 19,
              }}
            >
              Ö
            </div>
            <div
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: 19,
                color: "var(--ljus)",
              }}
            >
              {FORETAG.namn}
            </div>
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.65 }}>
            {FORETAG.adressRad1}
            <br />
            {FORETAG.adressRad2}
            <br />
            Tel:{" "}
            <a href={FORETAG.telefonHref} style={{ color: "var(--ljus)" }}>
              031-966066
            </a>
          </div>
          <a
            href={FORETAG.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link"
            style={{ display: "inline-block", marginTop: 12, fontSize: 14 }}
          >
            Visa på karta →
          </a>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(253,251,246,0.45)",
              marginBottom: 12,
            }}
          >
            Sortiment
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: 14.5 }}>
            <Link href="/produkter" className="footer-link">
              Produkter
            </Link>
            <Link href="/produkter/markbelaggning" className="footer-link">
              Markbeläggning
            </Link>
            <Link href="/uthyrning" className="footer-link">
              Uthyrning
            </Link>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(253,251,246,0.45)",
              marginBottom: 12,
            }}
          >
            Företaget
          </div>
          <div style={{ display: "grid", gap: 8, fontSize: 14.5 }}>
            <Link href="/vara-leverantorer" className="footer-link">
              Våra leverantörer
            </Link>
            <Link href="/miljo" className="footer-link">
              Miljö
            </Link>
            <Link href="/aktuellt" className="footer-link">
              Aktuellt
            </Link>
            <Link href="/kontakt" className="footer-link">
              Kontakt
            </Link>
          </div>
        </div>

        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "rgba(253,251,246,0.45)",
              marginBottom: 12,
            }}
          >
            Öppettider
          </div>
          <div style={{ fontSize: 14.5, lineHeight: 1.65 }}>
            {FORETAG.oppettiderRad1}
            <br />
            {FORETAG.oppettiderRad2}
          </div>
        </div>
      </div>

      <div style={{ borderTop: "1px solid rgba(253,251,246,0.12)" }}>
        <div
          className="container"
          style={{
            padding: "18px 28px",
            display: "flex",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
            fontSize: 13,
            color: "rgba(253,251,246,0.5)",
          }}
        >
          <span>© 2026 Öckerö Cementgjuteri AB</span>
          <span>
            <Link href="/integritetspolicy" style={{ color: "rgba(253,251,246,0.7)" }}>
              Integritetspolicy
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
