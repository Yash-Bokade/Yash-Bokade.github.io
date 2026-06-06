import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Blinking pixel cursor ─────────────────────────────────────────────────────
export default function PixelBlink({ color = "rgba(255,255,255,0.4)" }) {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" });
  }, []);
  return <span ref={ref} style={{ display: "inline-block", width: "8px", height: "8px", background: color }} />;
}
