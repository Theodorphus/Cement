import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { getKategori, getSubkategori, SUBKATEGORIER } from "@/lib/data";

// Endast Markbeläggning har produktsidor i prototypen.
export function generateStaticParams() {
  return SUBKATEGORIER.map((s) => ({
    kategori: "markbelaggning",
    produkt: s.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string; produkt: string }>;
}): Promise<Metadata> {
  const { produkt } = await params;
  const sub = getSubkategori(produkt);
  if (!sub) return {};
  return {
    title: `${sub.name} — Markbeläggning`,
    description: `${sub.name}. ${sub.desc}. Finns på gården i Öckerö — leverans i skärgården och Torslanda.`,
  };
}

export default async function ProduktPage({
  params,
}: {
  params: Promise<{ kategori: string; produkt: string }>;
}) {
  const { kategori, produkt } = await params;
  const kat = getKategori(kategori);
  const sub = getSubkategori(produkt);
  if (!kat || !sub || kategori !== "markbelaggning") notFound();

  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[
          { label: "Startsida", href: "/" },
          { label: "Produkter", href: "/produkter" },
          { label: kat.name, href: `/produkter/${kat.slug}` },
          { label: sub.name },
        ]}
        style={{ marginBottom: 26 }}
      />
      <div
        className="grid-2"
        style={{
          display: "grid",
          gridTemplateColumns: "1.05fr 0.95fr",
          gap: 48,
          alignItems: "start",
        }}
      >
        {/* Bild + miniatyrer */}
        <div>
          <div
            style={{
              borderRadius: 14,
              height: 440,
              backgroundImage: "url('/assets/Produktsida.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4,1fr)",
              gap: 12,
              marginTop: 12,
            }}
          >
            <div style={{ ...thumbStyle, backgroundImage: "url('/assets/Produktsida.png')" }} />
            <div style={{ ...thumbStyle, backgroundImage: "url('/assets/Miniatyr.png')" }} />
            <div
              style={{
                ...thumbStyle,
                backgroundImage: "url('/assets/Miniatyr.png')",
                backgroundPosition: "left center",
              }}
            />
            <div style={{ ...thumbStyle, backgroundImage: "url('/assets/Hero.png')" }} />
          </div>
        </div>

        {/* Text + spec + CTA */}
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--muted)",
              marginBottom: 10,
            }}
          >
            {kat.name}
          </div>
          <h1
            style={{
              fontSize: 44,
              lineHeight: 1.06,
              margin: "0 0 16px",
            }}
          >
            {sub.name}
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.6,
              color: "#3A484C",
              margin: "0 0 26px",
              textWrap: "pretty",
            }}
          >
            {sub.text}
          </p>

          <div
            style={{
              background: "var(--paper)",
              border: "1px solid var(--kant)",
              borderRadius: 12,
              padding: "22px 24px",
              marginBottom: 22,
              display: "grid",
              gap: 12,
            }}
          >
            <SpecRow label="Lager" value="Finns på gården" valueColor="var(--gron)" />
            <SpecRow label="Leverans" value="Skärgården & Torslanda" />
            <SpecRow label="Pris" value="Ring för offert" />
          </div>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href="/kontakt"
              className="btn btn-deep"
              style={{ fontSize: 15.5, padding: "14px 26px" }}
            >
              Begär offert
            </Link>
            <a
              href="tel:031966066"
              className="btn btn-outline"
              style={{
                border: "1px solid rgba(32,43,46,0.2)",
                color: "var(--ink)",
                fontSize: 15.5,
                padding: "14px 26px",
              }}
            >
              Ring 031-96 60 66
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function SpecRow({
  label,
  value,
  valueColor,
}: {
  label: string;
  value: string;
  valueColor?: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        fontSize: 14.5,
      }}
    >
      <span style={{ color: "var(--muted)" }}>{label}</span>
      <span
        style={{
          fontWeight: 600,
          textAlign: "right",
          maxWidth: "60%",
          color: valueColor,
        }}
      >
        {value}
      </span>
    </div>
  );
}

const thumbStyle: React.CSSProperties = {
  height: 84,
  borderRadius: 9,
  backgroundSize: "cover",
  backgroundPosition: "center",
};
