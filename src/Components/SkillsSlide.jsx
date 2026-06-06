import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { BEBAS, PX10, PX25, SANS, SKILLS } from "./constants";

// ─── Category accent colors ────────────────────────────────────────────────────
const CAT_COLORS = {
  MOTION:   "#a78bfa",
  FRONTEND: "#60a5fa",
  TOOLING:  "#34d399",
  GRAPHICS: "#f97316",
  LANGUAGE: "#f472b6",
  STYLING:  "#fbbf24",
};

const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// ─── Pulsing center glow ───────────────────────────────────────────────────────
function CenterGlow() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, {
      scale: 1.35, opacity: 0.06,
      duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }, []);
  return (
    <div ref={ref} style={{
      position: "absolute",
      width: "260px", height: "260px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(167,139,250,0.35) 0%, transparent 70%)",
      pointerEvents: "none", zIndex: 0,
    }} />
  );
}

// ─── Single hexagon skill card ─────────────────────────────────────────────────
function HexCard({ skill, w, h, isCenter, hovered, setHovered }) {
  const ref   = useRef(null);
  const color = CAT_COLORS[skill.cat] || "#fff";
  const isActive = hovered === skill.label;
  const isDimmed = hovered && !isActive && !isCenter;

  useEffect(() => {
    if (!ref.current) return;
    gsap.to(ref.current, {
      scale:   isActive ? 1.2 : isDimmed ? 0.85 : 1,
      opacity: isDimmed ? 0.2 : 1,
      duration: 0.35,
      ease: "power2.out",
    });
  }, [isActive, isDimmed]);

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(skill.label)}
      onMouseLeave={() => setHovered(null)}
      style={{ cursor: "crosshair", userSelect: "none" }}
    >
      {/* Hex shape */}
      <div style={{
        width: w, height: h,
        clipPath: HEX,
        background: isActive
          ? `linear-gradient(135deg, ${color}22, ${color}48)`
          : isCenter
          ? "rgba(255,255,255,0.09)"
          : "rgba(255,255,255,0.04)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative",
      }}>
        {/* Dot-grid fill for center */}
        {isCenter && (
          <div style={{
            position: "absolute", inset: 0, clipPath: HEX,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "9px 9px",
            pointerEvents: "none",
          }} />
        )}

        {/* Inner hex border ring */}
        <div style={{
          position: "absolute",
          inset: isCenter ? "5px" : "3px",
          clipPath: HEX,
          outline: `1px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
          transition: "outline-color 0.3s",
          pointerEvents: "none",
        }} />

        {/* Label */}
        <span style={{
          fontFamily: PX25,
          fontSize: isCenter
            ? "clamp(0.8rem, 1.2vw, 1rem)"
            : "clamp(0.58rem, 0.85vw, 0.78rem)",
          color: isActive ? color : "#fff",
          letterSpacing: "0.07em",
          textAlign: "center",
          padding: "0 8px",
          lineHeight: 1.25,
          position: "relative", zIndex: 1,
          transition: "color 0.25s",
        }}>
          {skill.label}
        </span>

        {/* Sub-label */}
        <span style={{
          fontFamily: PX10,
          fontSize: "0.46rem",
          color: isActive ? color : "rgba(255,255,255,0.25)",
          letterSpacing: "0.1em",
          marginTop: "3px",
          textAlign: "center",
          padding: "0 6px",
          position: "relative", zIndex: 1,
          transition: "color 0.25s",
        }}>
          {isCenter ? skill.sub : skill.cat}
        </span>

        {/* Center extra decoration */}
        {isCenter && (
          <>
            <div style={{ width: "22px", height: "1px", background: "rgba(255,255,255,0.18)", marginTop: "7px", position: "relative", zIndex: 1 }} />
            <span style={{
              fontFamily: PX10, fontSize: "0.42rem",
              color: "rgba(255,255,255,0.18)", letterSpacing: "0.18em",
              marginTop: "5px", textAlign: "center",
              position: "relative", zIndex: 1,
            }}>
              CORE SKILL
            </span>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Orbiting ring of hexes ────────────────────────────────────────────────────
function SkillOrbit({ skills, radius, duration, direction, hexW, hexH, hovered, setHovered }) {
  const itemRefs = useRef([]);

  useEffect(() => {
    const n       = skills.length;
    const offsets = skills.map((_, i) => (i / n) * Math.PI * 2 - Math.PI / 2);
    const proxy   = { a: 0 };

    // Set initial positions immediately
    offsets.forEach((off, i) => {
      const el = itemRefs.current[i];
      if (!el) return;
      gsap.set(el, {
        x: Math.cos(off) * radius,
        y: Math.sin(off) * radius,
      });
    });

    const tween = gsap.to(proxy, {
      a: direction * Math.PI * 2,
      duration,
      ease: "none",
      repeat: -1,
      onUpdate: () => {
        offsets.forEach((off, i) => {
          const el = itemRefs.current[i];
          if (!el) return;
          const angle = off + proxy.a;
          gsap.set(el, {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
          });
        });
      },
    });

    return () => tween.kill();
  }, [radius, duration, direction]);

  return (
    <>
      {skills.map((skill, i) => (
        <div
          key={skill.label}
          ref={el => itemRefs.current[i] = el}
          style={{
            position: "absolute",
            left: "50%", top: "50%",
            marginLeft: -hexW / 2,
            marginTop: -hexH / 2,
            zIndex: 5,
          }}
        >
          <HexCard
            skill={skill}
            w={hexW} h={hexH}
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>
      ))}
    </>
  );
}

// ─── Skills Slide — orbital hex grid ──────────────────────────────────────────
export default function SkillsSlide() {
  const [hovered, setHovered] = useState(null);
  const hoveredSkill = SKILLS.find(s => s.label === hovered);

  // Distribution: center / inner ring / outer ring
  const center = SKILLS[0];
  const inner  = SKILLS.slice(1, 5);
  const outer  = SKILLS.slice(5);

  // Sizes (px)
  const INNER_R  = 195, OUTER_R  = 340;
  const CENTER_W = 148, CENTER_H = 172;
  const INNER_W  = 108, INNER_H  = 125;
  const OUTER_W  = 92,  OUTER_H  = 107;

  // Entry animation refs
  const headerRef = useRef(null);
  const orbitRef  = useRef(null);
  const footerRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      [headerRef.current, footerRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", delay: 0.1 }
    );
    gsap.fromTo(
      orbitRef.current,
      { opacity: 0, scale: 0.88 },
      { opacity: 1, scale: 1, duration: 1.1, ease: "expo.out", delay: 0.2 }
    );
  }, []);

  return (
    <div style={{
      width: "100%", height: "100%",
      background: "#060606",
      display: "flex", flexDirection: "column",
      position: "relative", overflow: "hidden",
    }}>

      {/* Subtle radial bg glow */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse 60% 60% at 50% 52%, rgba(30,20,60,0.55) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* ── Header ── */}
      <div ref={headerRef} className="slide-text" style={{
        borderBottom: "1px solid rgba(255,255,255,0.05)",
        padding: "1rem 5vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0, position: "relative", zIndex: 10,
      }}>
        <span style={{ fontFamily: PX25, fontSize: "1rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.2em" }}>
          &gt; SKILLS
        </span>
        <span style={{ fontFamily: PX10, fontSize: "0.65rem", color: "rgba(255,255,255,0.15)", letterSpacing: "0.22em" }}>
          {SKILLS.length} TECHNOLOGIES · HOVER TO INSPECT
        </span>
      </div>

      {/* ── Orbital system ── */}
      <div ref={orbitRef} style={{
        flex: 1, position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 2,
      }}>
        {/* Orbit path rings */}
        {[INNER_R, OUTER_R].map((r, i) => (
          <div key={i} style={{
            position: "absolute",
            width: r * 2, height: r * 2,
            borderRadius: "50%",
            border: `1px ${i === 0 ? "dashed" : "dotted"} rgba(255,255,255,${i === 0 ? "0.07" : "0.04"})`,
            pointerEvents: "none",
          }} />
        ))}

        {/* Center glow */}
        <CenterGlow />

        {/* Center hex */}
        <div style={{ position: "absolute", zIndex: 10 }}>
          <HexCard
            skill={center}
            w={CENTER_W} h={CENTER_H}
            isCenter
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>

        {/* Inner orbit — rotates CW */}
        <SkillOrbit
          skills={inner}
          radius={INNER_R}
          duration={35}
          direction={1}
          hexW={INNER_W}
          hexH={INNER_H}
          hovered={hovered}
          setHovered={setHovered}
        />

        {/* Outer orbit — rotates CCW */}
        <SkillOrbit
          skills={outer}
          radius={OUTER_R}
          duration={55}
          direction={-1}
          hexW={OUTER_W}
          hexH={OUTER_H}
          hovered={hovered}
          setHovered={setHovered}
        />
      </div>

      {/* ── Hover info footer ── */}
      <div ref={footerRef} style={{
        borderTop: "1px solid rgba(255,255,255,0.05)",
        padding: "0.75rem 5vw",
        display: "flex", alignItems: "center", gap: "1.5rem",
        flexShrink: 0, position: "relative", zIndex: 10,
        minHeight: "48px",
      }}>
        {hoveredSkill ? (
          <>
            <span style={{
              fontFamily: PX10, fontSize: "0.6rem",
              color: CAT_COLORS[hoveredSkill.cat],
              letterSpacing: "0.22em",
              border: `1px solid ${CAT_COLORS[hoveredSkill.cat]}55`,
              padding: "2px 8px",
            }}>
              {hoveredSkill.cat}
            </span>
            <span style={{
              fontFamily: PX25, fontSize: "0.9rem",
              color: "#fff", letterSpacing: "0.08em",
            }}>
              {hoveredSkill.label}
            </span>
            <span style={{
              fontFamily: PX10, fontSize: "0.62rem",
              color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em",
            }}>
              {hoveredSkill.sub}
            </span>
          </>
        ) : (
          <span style={{
            fontFamily: PX10, fontSize: "0.62rem",
            color: "rgba(255,255,255,0.18)", letterSpacing: "0.22em",
          }}>
            HOVER A SKILL TO INSPECT
          </span>
        )}
      </div>
    </div>
  );
}
