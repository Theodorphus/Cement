"use client";

import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

/** Visible by default, including when JavaScript or motion is unavailable. */
export default function Reveal({ children, style, className = "", as: Tag = "section" }: {
  children: ReactNode;
  style?: CSSProperties;
  className?: string;
  as?: "section" | "div";
}) {
  const ref = useRef<HTMLElement & HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || motion.matches || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.dataset.revealed = "true";
        observer.disconnect();
      }
    }, { threshold: 0, rootMargin: "0px 0px -40px 0px" });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={style}>{children}</Tag>;
}
