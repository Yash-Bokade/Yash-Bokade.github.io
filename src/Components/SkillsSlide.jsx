import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { PX10, PX25, SKILLS } from "./constants";

// ─── Category accent colors ────────────────────────────────────────────────────
const CAT_COLORS = {
  MOTION:   "#a78bfa",
  FRONTEND: "#60a5fa",
  TOOLING:  "#34d399",
  AI:       "#22d3ee",
  LANGUAGE: "#f472b6",
};

const CAT_ORDER = ["LANGUAGE", "FRONTEND", "MOTION", "AI", "TOOLING"];
const HEX = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

// ─── Pulsing center glow ───────────────────────────────────────────────────────
function CenterGlow() {
  const ref = useRef(null);
  useEffect(() => {
    gsap.to(ref.current, {
      scale: 1.4, opacity: 0.05,
      duration: 2.4, repeat: -1, yoyo: true, ease: "sine.inOut",
    });
  }, []);
  return (
    <div ref={ref} style={{
      position: "absolute",
      width: "220px", height: "220px",
      borderRadius: "50%",
      background: "radial-gradient(circle, rgba(100,100,100,0.35) 0%, transparent 70%)",
      pointerEvents: "none",
      left: "50%", top: "50%",
      transform: "translate(-50%, -50%)",
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
      scale:   isActive ? 1.12 : isDimmed ? 0.9 : 1,
      opacity: isDimmed ? 0.2 : 1,
      duration: 0.3,
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
      <div style={{
        width: w, height: h,
        clipPath: HEX,
        background: isActive
          ? `linear-gradient(135deg, ${color}12, ${color}50)`
          : isCenter
          ? "rgba(255,255,255,0.09)"
          : "rgba(255,255,255,0.04)",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        position: "relative",
        transition: "background 0.3s",
      }}>
        {/* Inner hex border ring */}
        <div style={{
          position: "absolute",
          inset: isCenter ? "5px" : "2px",
          clipPath: HEX,
          outline: `1px solid ${isActive ? color : "rgba(255,255,255,0.1)"}`,
          transition: "outline-color 0.3s",
          pointerEvents: "none",
        }} />

        {/* Dot-grid fill for center */}
        {isCenter && (
          <div style={{
            position: "absolute", inset: 0, clipPath: HEX,
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
            backgroundSize: "9px 9px",
            pointerEvents: "none",
          }} />
        )}

        {/* Label */}
        <span style={{
          fontFamily: PX25,
          fontSize: isCenter
            ? "clamp(0.75rem, 1.1vw, 0.95rem)"
            : "clamp(0.46rem, 0.68vw, 0.6rem)",
          color: isActive ? color : "#fff",
          letterSpacing: "0.06em",
          textAlign: "center",
          padding: "0 6px",
          lineHeight: 1.2,
          position: "relative", zIndex: 1,
          transition: "color 0.25s",
        }}>
          {skill.label}
        </span>

        {/* Sub-label */}
        <span style={{
          fontFamily: PX10,
          fontSize: isCenter ? "0.42rem" : "0.34rem",
          color: isActive ? color : "rgba(255,255,255,0.22)",
          letterSpacing: "0.1em",
          marginTop: "2px",
          textAlign: "center",
          padding: "0 4px",
          position: "relative", zIndex: 1,
          transition: "color 0.25s",
        }}>
          {skill.sub}
        </span>

        {/* Center extra decoration */}
        {isCenter && (
          <>
            <div style={{ width: "20px", height: "1px", background: "rgba(255,255,255,0.18)", marginTop: "6px", position: "relative", zIndex: 1 }} />
            <span style={{
              fontFamily: PX10, fontSize: "0.36rem",
              color: "rgba(255,255,255,0.18)", letterSpacing: "0.18em",
              marginTop: "4px", textAlign: "center",
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

// ─── Category column with diagonal hex cascade ────────────────────────────────
function CategoryGroup({ category, skills, color, hexW, hovered, setHovered }) {
  const hexH    = Math.round(hexW * 1.15);
  const xStep   = hexW * 0.38;   // horizontal shift per row (diagonal offset)
  const yStep   = hexH * 0.76;   // vertical spacing between rows
  const colGap  = hexW * 0.76;   // gap between 2 hexes in the same row

  const cols = 2;
  const rows = Math.ceil(skills.length / cols);

  const totalW = (rows > 0 ? (rows - 1) * xStep : 0) + colGap + hexW;
  const totalH = (rows > 0 ? (rows - 1) * yStep : 0) + hexH;

  // Entry animation per group
  const groupRef = useRef(null);
  useEffect(() => {
    if (!groupRef.current) return;
    const hexEls = groupRef.current.querySelectorAll("[data-hex]");
    gsap.fromTo(hexEls,
      { opacity: 0, y: 20, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: "back.out(1.4)", delay: 0.4 }
    );
  }, []);

  return (
    <div ref={groupRef} style={{
      display: "flex", flexDirection: "column",
      alignItems: "center", gap: "0.6rem",
      flexShrink: 0,
    }}>
      {/* Category label */}
      <span style={{
        fontFamily: PX10,
        fontSize: "0.46rem",
        letterSpacing: "0.22em",
        color,
        opacity: 0.5,
        whiteSpace: "nowrap",
      }}>
        {category}
      </span>

      {/* Diagonal hex cascade grid */}
      <div style={{
        position: "relative",
        width: totalW,
        height: totalH,
      }}>
        {skills.map((skill, i) => {
          const row = Math.floor(i / cols);
          const col = i % cols;
          const x = row * xStep + col * colGap;
          const y = row * yStep;

          return (
            <div
              key={skill.label}
              data-hex
              style={{
                position: "absolute",
                left: x,
                top: y,
              }}
            >
              <HexCard
                skill={skill}
                w={hexW}
                h={hexH}
                hovered={hovered}
                setHovered={setHovered}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Skills Slide — diagonal hex cascade grid ─────────────────────────────────
export default function SkillsSlide() {
  const [hovered, setHovered] = useState(null);
  const hoveredSkill = SKILLS.find(s => s.label === hovered);

  const headerRef  = useRef(null);
  const contentRef = useRef(null);
  const footerRef  = useRef(null);

  // Derive center skill + category groups
  const { center, categories } = useMemo(() => {
    const centerSkill = SKILLS.find(s => s.center) || SKILLS[0];
    const nonCenter   = SKILLS.filter(s => s !== centerSkill);

    const catMap = {};
    nonCenter.forEach(s => {
      if (!catMap[s.cat]) catMap[s.cat] = [];
      catMap[s.cat].push(s);
    });

    const sorted = CAT_ORDER
      .filter(cat => catMap[cat])
      .map(cat => ({
        cat,
        skills: catMap[cat],
        color: CAT_COLORS[cat] || "#fff",
      }));

    return { center: centerSkill, categories: sorted };
  }, []);

  const CENTER_W = 140, CENTER_H = 162;
  const HEX_W = 70;

  // Entry animations
  useEffect(() => {
    gsap.fromTo(
      [headerRef.current, footerRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: "power2.out", delay: 0.1 }
    );
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, x: -30 },
      { opacity: 1, x: 0, duration: 1, ease: "expo.out", delay: 0.15 }
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
        background: "radial-gradient(ellipse 50% 55% at 25% 50%, rgba(30,20,60,0.5) 0%, transparent 70%)",
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
          {SKILLS.length} TECHNOLOGIES · {categories.length} CATEGORIES · HOVER TO INSPECT
        </span>
      </div>

      {/* ── Main content — big hex + category cascade columns ── */}
      <div ref={contentRef} style={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        gap: "clamp(1.5rem, 2.8vw, 3rem)",
        padding: "2vw 5vw",
        position: "relative", zIndex: 2,
        overflow: "auto",
      }}>
        {/* Center hex with pulsing glow */}
        <div style={{
          position: "relative", flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CenterGlow />
          <HexCard
            skill={center}
            w={CENTER_W}
            h={CENTER_H}
            isCenter
            hovered={hovered}
            setHovered={setHovered}
          />
        </div>

        {/* Vertical separator */}
        <div style={{
          width: "1px",
          height: "55%",
          background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08), transparent)",
          flexShrink: 0,
        }} />

        {/* Category groups — diagonal hex cascades */}
        {categories.map(({ cat, skills, color }) => (
          <CategoryGroup
            key={cat}
            category={cat}
            skills={skills}
            color={color}
            hexW={HEX_W}
            hovered={hovered}
            setHovered={setHovered}
          />
        ))}
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
