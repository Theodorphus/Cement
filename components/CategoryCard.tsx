import Link from "next/link";
import { PLACEHOLDER_STRIPES } from "@/lib/data";

/**
 * Kategorikort (start- och produktsidan). Med `showCta` visas "Visa kategori →"
 * och lite större padding, som på produktöversikten.
 */
export default function CategoryCard({
  href,
  name,
  desc,
  img,
  showCta = false,
}: {
  href: string;
  name: string;
  desc: string;
  img: string | null;
  showCta?: boolean;
}) {
  return (
    <Link
      href={href}
      className="card"
      style={{ display: "block", textDecoration: "none", color: "inherit" }}
    >
      <div
        className="card-img"
        style={{
          backgroundImage: img
            ? `url('${img}')`
            : PLACEHOLDER_STRIPES,
        }}
      >
        {!img && (
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
            foto: {name}
          </span>
        )}
      </div>
      <div style={{ padding: showCta ? "20px 22px 22px" : "18px 20px 20px" }}>
        <div
          style={{
            fontWeight: 600,
            fontSize: showCta ? 18 : 17,
            marginBottom: showCta ? 5 : 4,
          }}
        >
          {name}
        </div>
        <div
          style={{
            fontSize: showCta ? 14 : 13.5,
            color: "var(--muted)",
            lineHeight: showCta ? 1.5 : 1.45,
            marginBottom: showCta ? 12 : 0,
          }}
        >
          {desc}
        </div>
        {showCta && (
          <div style={{ color: "var(--accent)", fontWeight: 600, fontSize: 14 }}>
            Visa kategori →
          </div>
        )}
      </div>
    </Link>
  );
}
