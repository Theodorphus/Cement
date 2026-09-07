import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryCard from "@/components/CategoryCard";
import { KATEGORIER } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/produkter" },
  openGraph: { url: "/produkter" },
  title: "Produkter",
  description:
    "Byggmaterial, markbeläggning, betong, ved och trädgårdsdekoration — allt för husgrund och trädgård i skärgården.",
};

export default function ProdukterPage() {
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb
        crumbs={[{ label: "Startsida", href: "/" }, { label: "Produkter" }]}
        style={{ marginBottom: 14 }}
      />
      <h1 style={{ fontSize: 54, margin: "0 0 12px" }}>Produkter</h1>
      <p
        style={{
          fontSize: 17,
          color: "var(--muted)",
          maxWidth: "60ch",
          lineHeight: 1.55,
          margin: "0 0 40px",
        }}
      >
        Byggmaterial, markbeläggning, betong, ved och trädgårdsdekoration — allt
        för husgrund och trädgård i skärgården.
      </p>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))",
          gap: 20,
        }}
      >
        {KATEGORIER.map((kat) => (
          <CategoryCard
            key={kat.slug}
            href={`/produkter/${kat.slug}`}
            name={kat.name}
            desc={kat.desc}
            img={kat.img}
            showCta
          />
        ))}
      </div>
    </div>
  );
}
