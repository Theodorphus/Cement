import type { ProductResource } from "@/lib/resources";
export default function ResourceLinks({resources}: {resources: ProductResource[]}) {
 if (!resources.length) return null;
 return <section className="resource-links"><h2>Anvisningar och produktunderlag</h2><ul>{resources.map(r=><li key={r.url}><a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}<span aria-hidden="true"> ↗</span><span className="visually-hidden"> (öppnas i ny flik)</span></a><p>{r.description}</p></li>)}</ul><p>Kontrollera att anvisningen gäller just din produkt. Fråga oss om du behöver hjälp att hitta rätt underlag.</p></section>;
}
