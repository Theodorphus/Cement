import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import {
  KATEGORIER,
  SUBKATEGORIER,
  getKategori,
  MARKBELAGGNING_HERO,
  PLACEHOLDER_STRIPES,
} from "@/lib/data";

export function generateStaticParams() {
  return KATEGORIER.map((k) => ({ kategori: k.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ kategori: string }>;
}): Promise<Metadata> {
  const { kategori } = await params;
  const kat = getKategori(kategori);
  if (!kat) return {};
  return {
    title: kat.name,
    description: kat.desc,
  };
}

export default async function KategoriPage({
  params,
}: {
  params: Promise<{ kategori: string }>;
}) {
  const { kategori } = await params;
  const kat = getKategori(kategori);
  if (!kat) notFound();

  // Markbeläggning har underkategorier i prototypen; övriga kategorier visar
  // en kort presentation + samma sand-callout.
  const harSubkategorier = kat.slug === "markbelaggning";
  const heroImg =
    kat.slug === "markbelaggning" ? MARKBELAGGNING_HERO : kat.img ?? null;

  return (
    <div className="page-mount">
      {/* Hero-banner */}
      <section
        style={{
          position: "relative",
          minHeight: 300,
          display: "flex",
          alignItems: "flex-end",
          backgroundImage: heroImg
            ? `linear-gradient(to top,rgba(18,32,38,0.72),rgba(18,32,38,0.15)),url('${heroImg}')`
            : PLACEHOLDER_STRIPES,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container"
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "80px 28px 42px",
          }}
        >
          <Breadcrumb
            light
            crumbs={[
              { label: "Startsida", href: "/" },
              { label: "Produkter", href: "/produkter" },
              { label: kat.name },
            ]}
            style={{ marginBottom: 10 }}
          />
          <h1 style={{ fontSize: 52, margin: 0, color: "var(--ljus)" }}>
            {kat.name}
          </h1>
        </div>
      </section>

      <section
        style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 28px 90px" }}
      >
        {harSubkategorier ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
              gap: 18,
            }}
          >
            {SUBKATEGORIER.map((sub) => (
              <Link
                key={sub.slug}
                href={`/produkter/${kat.slug}/${sub.slug}`}
                className="sub-card"
                style={{
                  background: "var(--paper)",
                  border: "1px solid var(--kant)",
                  borderRadius: 12,
                  padding: "22px 24px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 14,
                  textDecoration: "none",
                  color: "inherit",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                <div>
                  <div style={{ fontWeight: 600, fontSize: 16.5, marginBottom: 3 }}>
                    {sub.name}
                  </div>
                  <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
                    {sub.desc}
                  </div>
                </div>
                <div style={{ color: "var(--accent)", fontSize: 18, flex: "none" }}>
                  →
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p
            style={{
              fontSize: 17,
              color: "#3A484C",
              lineHeight: 1.6,
              maxWidth: "60ch",
              margin: 0,
            }}
          >
            {kat.desc} Kontakta oss så hjälper vi dig hitta rätt för ditt projekt
            — ring {""}
            <a href="tel:031966066">031-96 60 66</a> eller mejla via{" "}
            <Link href="/kontakt">kontaktsidan</Link>.
          </p>
        )}

        {/* Sand-callout */}
        <div
          style={{
            marginTop: 40,
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
              Osäker på mängd eller val av sten?
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
      </section>
    </div>
  );
}
