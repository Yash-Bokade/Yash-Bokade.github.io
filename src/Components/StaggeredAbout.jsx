import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SANS } from "./constants";

// ─── About word stagger (gray → black) ────────────────────────────────────────
const ABOUT_WORDS = "I design and engineer interactive interfaces that command attention through typography rhythm and deliberate motion. Monochromatic palettes zero rounded corners and grainy textures define my visual language.".split(" ");

export default function StaggeredAbout() {
  const containerRef = useRef(null);
  useEffect(() => {
    const spans = containerRef.current?.querySelectorAll("span");
    if (!spans) return;
    gsap.fromTo(spans,
      { color: "rgba(0,0,0,0.15)" },
      {
        color: "rgba(0,0,0,0.85)",
        duration: 0.6,
        stagger: { amount: 1.8, from: "start" },
        ease: "power2.out",
        delay: 0.5,
      }
    );
  }, []);

  return (
    <p ref={containerRef} className="slide-text" style={{
      fontFamily: SANS, fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
      lineHeight: 1.85, maxWidth: "500px",
    }}>
      {ABOUT_WORDS.map((w, i) => (
        <span key={i} style={{ color: "rgba(0,0,0,0.15)", marginRight: "0.28em", display: "inline-block" }}>{w}</span>
      ))}
    </p>
  );
}
