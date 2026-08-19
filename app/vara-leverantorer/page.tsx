import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { LEVERANTORER } from "@/lib/data";

export const metadata: Metadata = {
  title: "Våra leverantörer",
  description:
    "Vi samarbetar med ledande leverantörer som S:T Eriks, Benders, Weber, Jackon, BE-Group, Wienerberger och Vedums Gräs.",
};

export default function LeverantorerPage() {
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[
          { label: "Startsida", href: "/" },
          { label: "Våra leverantörer" },
        ]}
        style={{ marginBottom: 14 }}
      />
      <h1 style={{ fontSize: 54, margin: "0 0 40px" }}>Våra leverantörer</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 18,
        }}
      >
        {LEVERANTORER.map((lev) => (
          <Link
            key={lev.name}
            href={`/vara-leverantorer/${lev.slug}`}
            className="lev-card"
            style={{
              textDecoration: "none",
              color: "inherit",
              background: "var(--paper)",
              border: "1px solid var(--kant)",
              borderRadius: 12,
              padding: "28px 26px",
              transition: "box-shadow 0.2s ease",
            }}
          >
            <div
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: 26,
                marginBottom: 6,
              }}
            >
              {lev.name}
            </div>
            <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.5 }}>
              {lev.desc}
            </div>
            <div style={{ color: "var(--accent)", fontSize: 14, fontWeight: 600, marginTop: 12 }}>
              Läs mer →
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
