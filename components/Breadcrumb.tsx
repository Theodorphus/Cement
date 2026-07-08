import Link from "next/link";
import { Fragment, type CSSProperties } from "react";

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
    <div
      style={{
        fontSize: 13,
        color: light ? "rgba(253,251,246,0.75)" : "var(--muted)",
        ...style,
      }}
    >
      {crumbs.map((c, i) => (
        <Fragment key={i}>
          {i > 0 && " / "}
          {c.href ? (
            <Link href={c.href} style={{ color: linkColor }}>
              {c.label}
            </Link>
          ) : (
            <span>{c.label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
