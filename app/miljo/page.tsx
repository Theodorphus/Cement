import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb";

export const metadata: Metadata = {
  alternates: { canonical: "/miljo" },
  openGraph: { url: "/miljo" },
  title: "Miljö",
  description:
    "Vårt miljöarbete på Öckerö Cementgjuteri — läs vår miljöpolicy. Vi tar ansvar för närmiljön i skärgården.",
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

      {/* Miljöpolicyn är kort och konkret, så den står här i sin helhet i
          stället för bakom ännu ett klick. Egen sida finns kvar för den som
          länkat dit. */}
      <div
        style={{
          background: "var(--paper)",
          border: "1px solid var(--kant)",
          borderRadius: 14,
          padding: "32px 34px",
          maxWidth: 760,
        }}
      >
        <h2 style={{ fontSize: 28, margin: "0 0 10px" }}>Miljöpolicy</h2>
        <p
          style={{
            fontSize: 16,
            color: "var(--muted)",
            lineHeight: 1.6,
            margin: "0 0 18px",
          }}
        >
          Vår inriktning är att minska verksamhetens miljöbelastning och arbeta
          för ständiga förbättringar.
        </p>
        <ul className="product-details" style={{ margin: "0 0 20px" }}>
          <li>Minska resursförbrukning och främja återanvändning och återvinning.</li>
          <li>Väga in miljöpåverkan vid inköp av varor och tjänster.</li>
          <li>Samordna transporter när det är möjligt.</li>
          <li>Följa miljökrav som berör verksamheten.</li>
        </ul>
        <Link href="/kontakt?produkt=Milj%C3%B6policy" className="link-arrow">
          Fråga om vår fullständiga miljöpolicy →
        </Link>
      </div>
    </div>
  );
}
