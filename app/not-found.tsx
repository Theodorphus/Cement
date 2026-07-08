import Link from "next/link";

export default function NotFound() {
  return (
    <div
      className="page-mount"
      style={{
        maxWidth: 1200,
        margin: "0 auto",
        padding: "90px 28px 120px",
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 11.5,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "#8A968F",
          marginBottom: 10,
        }}
      >
        404
      </div>
      <h1 style={{ fontSize: 54, margin: "0 0 16px" }}>Sidan kunde inte hittas</h1>
      <p
        style={{
          fontSize: 17,
          color: "var(--muted)",
          maxWidth: "48ch",
          lineHeight: 1.6,
          margin: "0 auto 32px",
        }}
      >
        Sidan du letar efter finns inte längre eller har flyttat. Gå tillbaka till
        startsidan eller titta i vårt sortiment.
      </p>
      <div
        style={{
          display: "flex",
          gap: 12,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          className="btn btn-deep"
          style={{ fontSize: 15.5, padding: "14px 26px" }}
        >
          Till startsidan
        </Link>
        <Link
          href="/produkter"
          className="btn btn-outline"
          style={{
            border: "1px solid rgba(32,43,46,0.2)",
            color: "var(--ink)",
            fontSize: 15.5,
            padding: "14px 26px",
          }}
        >
          Se produkter
        </Link>
      </div>
    </div>
  );
}
