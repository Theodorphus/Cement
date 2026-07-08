"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

/**
 * Scroll-reveal via IntersectionObserver (bredare stöd än prototypens
 * animation-timeline: view()). Sektioner fadeUp:ar när de kommer in i vyn.
 */
export default function Reveal({
  children,
  style,
  as: Tag = "section",
}: {
  children: React.ReactNode;
  style?: CSSProperties;
  as?: "section" | "div";
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Om redan i vyn vid mount (t.ex. sektioner ovanför vikningen), visa direkt.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const className = `reveal${visible ? " is-visible" : ""}`;

  if (Tag === "div") {
    return (
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className={className}
        style={style}
      >
        {children}
      </div>
    );
  }
  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className={className}
      style={style}
    >
      {children}
    </section>
  );
}
