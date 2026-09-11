import type { ProductResource } from "@/lib/resources";

export default function ResourceLinks({ resources }: { resources: ProductResource[] }) {
  if (!resources.length) return null;
  return <section className="resource-links resource-library">
    <div className="resource-library-heading"><span className="section-kicker">Från tillverkaren</span><h2>Anvisningar och produktunderlag</h2></div>
    <ul>{resources.map(r => <li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer"><span className="resource-document-icon" aria-hidden="true"><svg width="22" height="26" viewBox="0 0 22 26" fill="none" stroke="currentColor" strokeWidth="1.3"><path d="M4 2h9l5 5v17H4zM13 2v6h5M7 13h8M7 17h8M7 21h5" /></svg></span><span className="resource-copy"><strong>{r.title}</strong><span>{r.description}</span></span><span className="arrow-icon" aria-hidden="true">↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a></li>)}</ul>
    <p className="resource-note">Kontrollera att anvisningen gäller just din produkt. Fråga oss om du behöver hjälp att hitta rätt underlag.</p>
  </section>;
}
