import type { CSSProperties, ReactNode } from "react";
/** Content remains visible without JavaScript. */
export default function Reveal({ children, style, as: Tag = "section" }: { children: ReactNode; style?: CSSProperties; as?: "section" | "div" }) {
  return <Tag style={style}>{children}</Tag>;
}

