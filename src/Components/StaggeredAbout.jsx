import { useEffect, useRef } from "react";
import gsap from "gsap";
import { SANS } from "./constants";

// ─── About word stagger (gray → black) ────────────────────────────────────────
const ABOUT_WORDS = "A Computer Engineering student aiming to be a skilled Developer while enhancing skills in modern Frameworks to become a proficient developer with the ability to create efficient Applications. I build interactive web experiences with React Next.js and animation libraries like GSAP and Motion.dev.".split(" ");

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
