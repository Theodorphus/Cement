import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  alternates: { canonical: "/miljo" },
  openGraph: { url: "/miljo" },
  title: "Miljö",
  description:
    "Vårt miljöarbete på Öckerö Cementgjuteri — miljöpolicy och dokumentation. Vi tar ansvar för närmiljön i skärgården.",
};

export default function MiljoPage() {
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[{ label: "Startsida", href: "/" }, { label: "Miljö" }]}
        style={{ marginBottom: 14 }}
      />
      <h1 style={{ fontSize: 54, margin: "0 0 12px" }}>Miljö</h1>
      <p
        style={{
          fontSize: 17,
          color: "var(--muted)",
          maxWidth: "62ch",
          lineHeight: 1.6,
          margin: "0 0 40px",
        }}
      >
        Vi bor och verkar mitt i Göteborgs skärgård — närmiljön är vår vardag.
        Därför arbetar vi löpande med att minska vår miljöpåverkan, sortera avfall
        och välja material och transporter med omsorg.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
          gap: 18,
        }}
      >
        <Link href="/miljo/miljopolicy" className="sub-card" style={subCardStyle}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16.5, marginBottom: 3 }}>
              Miljöpolicy
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
              Så tar vi ansvar för miljön i vår verksamhet.
            </div>
          </div>
          <div style={{ color: "var(--accent)", fontSize: 18, flex: "none" }}>→</div>
        </Link>
        <Link href="/miljo/miljodiplom" className="sub-card" style={subCardStyle}>
          <div>
            <div style={{ fontWeight: 600, fontSize: 16.5, marginBottom: 3 }}>
              Miljödiplom
            </div>
            <div style={{ fontSize: 13.5, color: "var(--muted)" }}>
              Kontakta oss för aktuella handlingar.
            </div>
          </div>
          <div style={{ color: "var(--accent)", fontSize: 18, flex: "none" }}>→</div>
        </Link>
      </div>
    </div>
  );
}

const subCardStyle: React.CSSProperties = {
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
};
