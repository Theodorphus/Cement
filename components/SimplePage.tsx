import Breadcrumb, { type Crumb } from "@/components/Breadcrumb";

/** Enkel textsida (intro + valfria stycken) med breadcrumb och H1. */
export default function SimplePage({
  crumbs,
  title,
  intro,
  paragraphs = [],
}: {
  crumbs: Crumb[];
  title: string;
  intro?: string;
  paragraphs?: string[];
}) {
  return (
    <div
      className="page-mount"
      style={{ maxWidth: 1200, margin: "0 auto", padding: "56px 28px 90px" }}
    >
      <Breadcrumb crumbs={crumbs} style={{ marginBottom: 14 }} />
      <h1 style={{ fontSize: 54, margin: "0 0 12px" }}>{title}</h1>
      {intro && (
        <p
          style={{
            fontSize: 17,
            color: "var(--muted)",
            maxWidth: "62ch",
            lineHeight: 1.6,
            margin: "0 0 24px",
          }}
        >
          {intro}
        </p>
      )}
      {paragraphs.map((p, i) => (
        <p
          key={i}
          style={{
            fontSize: 16,
            color: "#3A484C",
            maxWidth: "68ch",
            lineHeight: 1.7,
            margin: "0 0 18px",
          }}
        >
          {p}
        </p>
      ))}
    </div>
  );
}
