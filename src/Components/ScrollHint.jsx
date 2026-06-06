import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Scroll hint with bouncing pixel arrow ─────────────────────────────────────
export default function ScrollHint() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, { y: 5, duration: 0.7, repeat: -1, yoyo: true, ease: "power1.inOut" });
  }, []);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "3px" }}>
      <span style={{ fontFamily: "'Jersey 10', monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(255,255,255,0.35)" }}>SCROLL</span>
      {/* Pixel-art chevron made of 3 lines */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "2px" }}>
        {[12, 8, 4].map((w, i) => (
          <div key={i} style={{ width: w, height: 1, background: "rgba(255,255,255,0.35)" }} />
        ))}
      </div>
    </div>
  );
}
