import { FORETAG } from "@/lib/data";
import { getOpeningHours } from "@/lib/content";
import { formatOpeningRow } from "@/lib/oppettider";

export default async function TopBanner() {
  const { rows } = await getOpeningHours();
  return (
    <div
      className="topbanner"
      style={{
        background: "var(--deep)",
        color: "#DCE7E4",
        fontSize: 13.5,
        letterSpacing: "0.02em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: 28,
        padding: "9px 20px",
        flexWrap: "wrap",
      }}
    >
      {rows.length > 0 && <>
        <span style={{ whiteSpace: "nowrap" }}>
          Öppettider: {rows.map(formatOpeningRow).join(" · ")}
        </span>
        <span className="topbanner-sep" style={{ opacity: 0.55 }}>
          |
        </span>
      </>}
      <a
        href={FORETAG.telefonHref}
        style={{ color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}
      >
        {FORETAG.telefon}
      </a>
    </div>
  );
}
