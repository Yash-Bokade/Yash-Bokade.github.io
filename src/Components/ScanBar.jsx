import { useEffect, useRef } from "react";
import gsap from "gsap";

// ─── Pixel scan bar ────────────────────────────────────────────────────────────
export default function ScanBar({ dark = false }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current,
      { top: "0%", opacity: 0.7 },
      { top: "100%", opacity: 0, duration: 1.6, ease: "power1.inOut", delay: 0.6 }
    );
  }, []);
  return (
    <div ref={ref} style={{
      position: "absolute", left: 0, width: "100%", height: "2px",
      background: dark
        ? "linear-gradient(90deg, transparent, rgba(0,0,0,0.8) 40%, rgba(0,0,0,0.8) 60%, transparent)"
        : "linear-gradient(90deg, transparent, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0.8) 60%, transparent)",
      pointerEvents: "none", zIndex: 20,
    }} />
  );
}
