"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/lib/data";

function isActive(pathname: string, href: string, matchPrefix?: string[]): boolean {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  return (matchPrefix ?? []).some((p) => pathname.startsWith(p));
}

export default function Header() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(246,243,236,0.92)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(32,43,46,0.1)",
      }}
    >
      <div
        className="container"
        style={{
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 52,
          gap: 24,
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 13,
            flex: "none",
            textDecoration: "none",
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              flex: "none",
              background: "var(--deep)",
              borderRadius: 8,
              display: "grid",
              placeItems: "center",
              color: "var(--bg)",
              fontFamily: "var(--font-serif), serif",
              fontSize: 22,
              lineHeight: 1,
            }}
          >
            Ö
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: 21,
                lineHeight: 1.1,
                color: "var(--ink)",
                whiteSpace: "nowrap",
              }}
            >
              Öckerö Cementgjuteri
            </div>
            <div
              style={{
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--muted)",
                whiteSpace: "nowrap",
              }}
            >
              Byggmaterial i skärgården
            </div>
          </div>
        </Link>

        <nav style={{ display: "flex", gap: 4, alignItems: "center", flexWrap: "wrap" }}>
          {NAV_ITEMS.map((nv) => {
            const active = isActive(pathname, nv.href, nv.matchPrefix);
            return (
              <Link
                key={nv.href}
                href={nv.href}
                className="nav-link"
                data-active={active ? "true" : undefined}
                style={{
                  cursor: "pointer",
                  fontSize: 14.5,
                  padding: "9px 13px",
                  borderRadius: 7,
                  fontWeight: active ? 600 : 500,
                  color: active ? "var(--deep)" : "var(--muted)",
                  background: active ? "rgba(36,64,76,0.08)" : "transparent",
                  whiteSpace: "nowrap",
                  textDecoration: "none",
                }}
              >
                {nv.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
