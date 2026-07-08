"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { NAV_ITEMS } from "@/lib/data";

function isActive(pathname: string, href: string, matchPrefix?: string[]): boolean {
  if (href === "/") return pathname === "/";
  if (pathname === href) return true;
  return (matchPrefix ?? []).some((p) => pathname.startsWith(p));
}

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Stäng menyn vid sidbyte.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lås scroll när mobilmenyn är öppen.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

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
        className="container header-inner"
        style={{
          padding: "12px 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 52,
          gap: 16,
        }}
      >
        <Link
          href="/"
          className="brand"
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 13,
            flex: "none",
            textDecoration: "none",
            minWidth: 0,
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
          <div style={{ minWidth: 0 }}>
            <div
              className="brand-name"
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
              className="brand-tag"
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

        {/* Desktop-nav */}
        <nav className="nav-desktop" style={{ display: "flex", gap: 4, alignItems: "center" }}>
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

        {/* Hamburgerknapp (endast mobil) */}
        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Stäng meny" : "Öppna meny"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span className={`nav-toggle-bar${open ? " is-open-1" : ""}`} />
          <span className={`nav-toggle-bar${open ? " is-open-2" : ""}`} />
          <span className={`nav-toggle-bar${open ? " is-open-3" : ""}`} />
        </button>
      </div>

      {/* Mobilmeny (fälls ut under headern) */}
      <div className={`nav-mobile${open ? " is-open" : ""}`}>
        <nav>
          {NAV_ITEMS.map((nv) => {
            const active = isActive(pathname, nv.href, nv.matchPrefix);
            return (
              <Link
                key={nv.href}
                href={nv.href}
                className="nav-mobile-link"
                data-active={active ? "true" : undefined}
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
