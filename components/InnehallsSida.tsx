import Link from "next/link";
import Image from "next/image";
import Breadcrumb, { type Crumb } from "@/components/Breadcrumb";
import type { Produkt } from "@/lib/innehall";

/**
 * Renderar en migrerad innehållssida: intro följt av produktkorten som
 * plockats från gamla sajten. Layouten anpassar sig efter vad posterna
 * faktiskt innehåller — vissa har bild och text, andra bara det ena.
 */
export default function InnehallsSida({
  crumbs,
  eyebrow,
  titel,
  intro = [],
  produkter,
  cta = true,
}: {
  crumbs: Crumb[];
  eyebrow?: string;
  titel: string;
  intro?: string[];
  produkter: Produkt[];
  cta?: boolean;
}) {
  const harBilder = produkter.some((p) => p.bilder.some((b) => b.fil));

  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb crumbs={crumbs} style={{ marginBottom: 14 }} />

      {eyebrow && (
        <div
          style={{
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--muted)",
            marginBottom: 10,
          }}
        >
          {eyebrow}
        </div>
      )}

      <h1 style={{ fontSize: 50, lineHeight: 1.06, margin: "0 0 14px", textWrap: "balance" }}>
        {titel}
      </h1>

      {intro.map((t, i) => (
        <p
          key={i}
          style={{
            fontSize: 17,
            color: "var(--muted)",
            maxWidth: "64ch",
            lineHeight: 1.65,
            margin: "0 0 14px",
          }}
        >
          {t}
        </p>
      ))}

      {produkter.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: harBilder
              ? "repeat(auto-fill,minmax(268px,1fr))"
              : "repeat(auto-fill,minmax(320px,1fr))",
            gap: 20,
            marginTop: intro.length ? 34 : 26,
            alignItems: "start",
          }}
        >
          {produkter.map((p, i) => (
            <ProduktKort key={i} produkt={p} />
          ))}
        </div>
      )}

      {cta && (
        <div
          style={{
            marginTop: 44,
            background: "var(--sand)",
            borderRadius: 14,
            padding: "30px 34px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 24,
            flexWrap: "wrap",
          }}
        >
          <div>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>
              Osäker på mängd eller val?
            </div>
            <div style={{ fontSize: 14.5, color: "var(--muted)" }}>
              Ring oss på 031-96 60 66 så hjälper vi dig räkna på ditt projekt.
            </div>
          </div>
          <Link
            href="/kontakt"
            className="btn btn-deep"
            style={{ fontSize: 15, padding: "13px 24px" }}
          >
            Kontakta oss
          </Link>
        </div>
      )}
    </div>
  );
}

function ProduktKort({ produkt }: { produkt: Produkt }) {
  const bild = produkt.bilder.find((b) => b.fil);
  const extra = produkt.bilder.filter((b) => b.fil && b !== bild);

  return (
    <article
      style={{
        background: "var(--paper)",
        border: "1px solid var(--kant)",
        borderRadius: 12,
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {bild?.fil && (
        <div
          style={{
            position: "relative",
            aspectRatio: "4 / 3",
            background: "var(--sand)",
          }}
        >
          <Image
            src={`/assets/produkter/${bild.fil}`}
            alt={bild.alt || produkt.namn}
            fill
            sizes="(max-width: 700px) 100vw, 300px"
            style={{ objectFit: "cover" }}
          />
        </div>
      )}

      <div style={{ padding: "18px 20px 20px", display: "grid", gap: 8 }}>
        {produkt.namn && (
          <h2 style={{ fontSize: 19, lineHeight: 1.2, margin: 0 }}>{produkt.namn}</h2>
        )}

        {produkt.texter.map((t, i) => (
          <p
            key={i}
            style={{
              fontSize: 14.5,
              lineHeight: 1.6,
              color: "#3A484C",
              margin: 0,
              textWrap: "pretty",
            }}
          >
            {t}
          </p>
        ))}

        {bild?.bildtext && !produkt.texter.includes(bild.bildtext) && (
          <p style={{ fontSize: 13.5, lineHeight: 1.55, color: "var(--muted)", margin: 0 }}>
            {bild.bildtext}
          </p>
        )}

        {extra.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${Math.min(extra.length, 4)},1fr)`,
              gap: 6,
              marginTop: 4,
            }}
          >
            {extra.slice(0, 4).map((b, i) => (
              <div
                key={i}
                style={{
                  position: "relative",
                  aspectRatio: "1 / 1",
                  borderRadius: 6,
                  overflow: "hidden",
                  background: "var(--sand)",
                }}
              >
                <Image
                  src={`/assets/produkter/${b.fil}`}
                  alt={b.alt || ""}
                  fill
                  sizes="80px"
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
