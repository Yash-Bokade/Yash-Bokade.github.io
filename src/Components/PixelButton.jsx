import { useRef } from "react";
import gsap from "gsap";
import { PX25 } from "./constants";

// ─── Pixel-fill Button ─────────────────────────────────────────────────────────
const PCOLS = 18, PROWS = 7;

export default function PixelButton({ children, href, onClick, dark = false, style = {} }) {
  const gridRef = useRef(null);

  const flood = () => {
    const cells = Array.from(gridRef.current.children);
    gsap.killTweensOf(cells);
    gsap.to(cells, { opacity: 1, duration: 0.01, stagger: { amount: 0.28, from: "random" }, ease: "none" });
  };
  const drain = () => {
    const cells = Array.from(gridRef.current.children);
    gsap.killTweensOf(cells);
    gsap.to(cells, { opacity: 0, duration: 0.01, stagger: { amount: 0.22, from: "random" }, ease: "none" });
  };

  const Tag = href ? "a" : "button";
  return (
    <Tag href={href} onClick={onClick} onMouseEnter={flood} onMouseLeave={drain}
      style={{
        position: "relative", overflow: "hidden",
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        padding: "0.65rem 1.4rem",
        fontFamily: PX25, fontSize: "1.1rem", letterSpacing: "0.1em",
        cursor: "pointer", textDecoration: "none",
        border: dark ? "2px solid #000" : "2px solid #fff",
        background: dark ? "#000" : "#fff",
        color:      dark ? "#fff" : "#000",
        userSelect: "none", transition: "color 0.15s", ...style,
      }}
    >
      <div ref={gridRef} style={{
        position: "absolute", inset: 0, display: "grid",
        gridTemplateColumns: `repeat(${PCOLS}, 1fr)`,
        gridTemplateRows:    `repeat(${PROWS}, 1fr)`,
        pointerEvents: "none",
      }}>
        {Array.from({ length: PCOLS * PROWS }).map((_, i) => (
          <div key={i} style={{ opacity: 0, background: dark ? "#fff" : "#000" }} />
        ))}
      </div>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </Tag>
  );
}
