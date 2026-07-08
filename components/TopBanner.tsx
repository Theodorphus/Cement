import { FORETAG } from "@/lib/data";

export default function TopBanner() {
  return (
    <div
      style={{
        background: "var(--deep)",
        color: "#DCE7E4",
        fontSize: 13.5,
        letterSpacing: "0.02em",
        display: "flex",
        justifyContent: "center",
        gap: 28,
        padding: "9px 20px",
        flexWrap: "wrap",
      }}
    >
      <span style={{ whiteSpace: "nowrap" }}>
        Öppettider: Mån–fre 7–16 · Lördagar 9–13
      </span>
      <span style={{ opacity: 0.55 }}>|</span>
      <a
        href={FORETAG.telefonHref}
        style={{ color: "#fff", fontWeight: 600, whiteSpace: "nowrap" }}
      >
        {FORETAG.telefon}
      </a>
    </div>
  );
}
