import { useRef } from "react";
import gsap from "gsap";
import { PX10, PX25 } from "./constants";

// ─── Skill Row ─────────────────────────────────────────────────────────────────
export default function SkillRow({ skill, idx }) {
  const ref     = useRef(null);
  const isBlack = idx % 2 === 0;
  const bg      = isBlack ? "#000" : "#f5f5f5";
  const color   = isBlack ? "#fff" : "#000";

  const enter = () => gsap.to(ref.current, { filter: "invert(1)", duration: 0.18, ease: "none" });
  const leave = () => gsap.to(ref.current, { filter: "invert(0)", duration: 0.18, ease: "none" });

  return (
    <div ref={ref} className="slide-text" onMouseEnter={enter} onMouseLeave={leave}
      style={{
        background: bg, color, flex: 1,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 5vw",
        borderBottom: "1px solid rgba(128,128,128,0.12)",
        overflow: "hidden", cursor: "default", userSelect: "none",
      }}
    >
      <span style={{ fontFamily: PX25, fontSize: "clamp(1.6rem, 4.5vw, 5.5rem)", letterSpacing: "0.04em", lineHeight: 1 }}>
        {skill.label}
      </span>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "2px" }}>
        <span style={{ fontFamily: PX10, fontSize: "0.68rem", opacity: 0.35, letterSpacing: "0.15em" }}>{skill.sub}</span>
        <span style={{ fontFamily: PX10, fontSize: "0.6rem",  opacity: 0.2,  letterSpacing: "0.2em"  }}>[{String(idx + 1).padStart(2, "0")}] {skill.cat}</span>
      </div>
    </div>
  );
}
