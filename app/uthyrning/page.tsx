import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";
import { UTHYRNING, PLACEHOLDER_STRIPES } from "@/lib/data";

export const metadata: Metadata = {
  title: "Uthyrning",
  description:
    "Hyr maskiner för ditt projekt — kombihammare, kapmaskin, betongslip, jordfräs med mera. Hämta och lämna hos oss på Långesand 7, Öckerö.",
};

export default function UthyrningPage() {
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[{ label: "Startsida", href: "/" }, { label: "Uthyrning" }]}
        style={{ marginBottom: 14 }}
      />
      <h1 style={{ fontSize: 54, margin: "0 0 12px" }}>Uthyrning</h1>
      <p
        style={{
          fontSize: 17,
          color: "var(--muted)",
          maxWidth: "60ch",
          lineHeight: 1.55,
          margin: "0 0 40px",
        }}
      >
        Hyr maskiner för ditt projekt — hämta och lämna hos oss på Långesand 7,
        Öckerö.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))",
          gap: 20,
        }}
      >
        {UTHYRNING.map((mask) => (
          <Link
            key={mask.name}
            href={`/uthyrning/${mask.slug}`}
            className="card"
            style={{ textDecoration: "none", color: "inherit", display: "block" }}
          >
            <div
              className="card-img"
              style={{
                backgroundImage: mask.img
                  ? `url('${mask.img}')`
                  : PLACEHOLDER_STRIPES,
              }}
            >
              {!mask.img && (
                <span
                  style={{
                    fontFamily: "ui-monospace,Menlo,monospace",
                    fontSize: 11,
                    color: "#8A8271",
                    background: "rgba(255,255,255,0.75)",
                    padding: "4px 9px",
                    borderRadius: 5,
                  }}
                >
                  foto: {mask.name}
                </span>
              )}
            </div>
            <div style={{ padding: "18px 20px 20px" }}>
              <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 4 }}>
                {mask.name}
              </div>
              <div
                style={{
                  fontSize: 13.5,
                  color: "var(--muted)",
                  lineHeight: 1.45,
                  marginBottom: 12,
                }}
              >
                {mask.desc}
              </div>
              <span
                style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}
              >
                Läs mer →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
