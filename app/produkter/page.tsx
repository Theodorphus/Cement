import type { Metadata } from "next";
import Breadcrumb from "@/components/Breadcrumb";
import CategoryCard from "@/components/CategoryCard";
import ProductSearch from "@/components/ProductSearch";
import Reveal from "@/components/Reveal";
import { KATEGORIER } from "@/lib/data";

export const metadata: Metadata = {
  alternates: { canonical: "/produkter" },
  openGraph: { url: "/produkter" },
  title: "Produkter",
  description: "Byggmaterial, markbeläggning, betong, ved och trädgårdsdekoration — allt för husgrund och trädgård i skärgården.",
};

export default function ProdukterPage() {
  return (
    <div className="content-page catalog-page">
      <Breadcrumb crumbs={[{ label: "Startsida", href: "/" }, { label: "Produkter" }]} />
      <header className="catalog-intro">
        <div><p className="section-kicker">Material för husgrund & trädgård</p><h1>Vårt sortiment.<br /><em>Dina möjligheter.</em></h1></div>
        <p>Byggmaterial, markbeläggning, betong, ved och trädgårdsdekoration — allt för husgrund och trädgård i skärgården.</p>
      </header>
      <ProductSearch />
      <div className="catalog-section-label"><h2>Utforska våra produktkategorier</h2><span>{String(KATEGORIER.length).padStart(2, "0")} kategorier</span></div>
      <div className="catalog-grid">
        {KATEGORIER.map((kat, index) => (
          <Reveal key={kat.slug} as="div" className="catalog-card-wrap">
            <CategoryCard href={`/produkter/${kat.slug}`} name={kat.name} desc={kat.desc} img={kat.img} showCta headingLevel={3} index={index + 1} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
