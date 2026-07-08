"use client";

import { useEffect, useRef } from "react";

/**
 * Autoplay-video med korrekt muted-hantering. React sätter bara JS-property för
 * `muted`, vilket Chrome kan blockera — därför sätter vi DOM-attributet i en
 * effect och kallar play().catch() (se handoff).
 */
export default function HeroVideo({ src }: { src: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    v.muted = true;
    v.setAttribute("muted", "");
    const p = v.play();
    if (p) p.catch(() => {});
  }, []);

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      src={src}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
      }}
    />
  );
}
