import Link from "next/link";
import { type CSSProperties } from "react";
import { breadcrumbJsonLd } from "@/lib/structured-data";

export type Crumb = { label: string; href?: string };

export default function Breadcrumb({
  crumbs,
  light = false,
  style,
}: {
  crumbs: Crumb[];
  /** light = ljus text för mörka hero-bakgrunder */
  light?: boolean;
  style?: CSSProperties;
}) {
  const linkColor = light ? "#fff" : "var(--accent)";
  return (
    <nav aria-label="Brödsmulor" className="breadcrumb"
      style={{
        fontSize: 13,
        color: light ? "rgba(253,251,246,0.75)" : "var(--muted)",
        ...style,
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd(crumbs)) }}
      />
      <ol>{crumbs.map((c, i) => (
        <li key={i}>
          {i > 0 && <span className="breadcrumb-separator" aria-hidden="true">/</span>}
          {c.href ? (
            <Link href={c.href} style={{ color: linkColor }}>
              {c.label}
            </Link>
          ) : (
            <span aria-current="page">{c.label}</span>
          )}
        </li>
      ))}</ol>
    </nav>
  );
}
