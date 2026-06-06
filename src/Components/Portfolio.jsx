import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";

import { SLIDES, slideBase, PX25 } from "./constants";
import PixelNav    from "./PixelNav";
import HeroSlide   from "./HeroSlide";
import AboutSlide  from "./AboutSlide";
import WorkSlide   from "./WorkSlide";
import SkillsSlide from "./SkillsSlide";
import ContactSlide from "./ContactSlide";

// ─── Main Portfolio Orchestrator ───────────────────────────────────────────────
export default function Portfolio() {
  const [active, setActive] = useState(0);
  const slideRefs   = useRef([]);
  const isAnimating = useRef(false);
  const root        = useRef(null);
  const workGridRef = useRef(null); // passed down to WorkSlide

  const onWhite = active === 1;

  // ─── Slide transition ────────────────────────────────────────────────────────
  const goTo = useCallback((next) => {
    if (isAnimating.current || next === active || next < 0 || next >= SLIDES.length) return;
    isAnimating.current = true;

    const dir   = next > active ? 1 : -1;
    const outEl = slideRefs.current[active];
    const inEl  = slideRefs.current[next];

    gsap.set(inEl,  { yPercent: dir * 100, visibility: "visible", zIndex: 2 });
    gsap.set(outEl, { zIndex: 1 });

    gsap.to(outEl.querySelectorAll(".slide-text"), {
      y: -40 * dir, opacity: 0, duration: 0.35, stagger: 0.03, ease: "power2.in",
    });

    gsap.timeline({
      onComplete: () => {
        gsap.set(outEl, { visibility: "hidden", zIndex: 0 });
        isAnimating.current = false;
        setActive(next);
      },
    })
      .to(outEl, { yPercent: -dir * 100, duration: 0.82, ease: "expo.inOut" }, 0)
      .to(inEl,  { yPercent: 0,          duration: 0.82, ease: "expo.inOut" }, 0);

    gsap.fromTo(
      inEl.querySelectorAll(".slide-text"),
      { y: 50 * dir, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: "power3.out", delay: 0.38 }
    );
  }, [active]);

  // ─── Wheel + keyboard navigation ────────────────────────────────────────────
  useEffect(() => {
    const onWheel = (() => {
      let last = 0;
      return (e) => {
        // Slide 2: work grid — scroll horizontally first
        if (active === 2 && workGridRef.current) {
          const grid   = workGridRef.current;
          const atEnd  = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
          const atLeft = grid.scrollLeft <= 2;

          if (e.deltaY > 25) {
            if (atEnd) {
              const now = Date.now();
              if (now - last < 950) return;
              last = now;
              goTo(active + 1);
            } else {
              grid.scrollLeft += Math.abs(e.deltaY) * 1.5;
            }
          } else if (e.deltaY < -25) {
            if (atLeft) {
              const now = Date.now();
              if (now - last < 950) return;
              last = now;
              goTo(active - 1);
            } else {
              grid.scrollLeft -= Math.abs(e.deltaY) * 1.5;
            }
          }
          return;
        }

        // All other slides: normal throttled navigation
        const now = Date.now();
        if (now - last < 950) return;
        last = now;
        if (e.deltaY >  25) goTo(active + 1);
        if (e.deltaY < -25) goTo(active - 1);
      };
    })();

    const onKey = (e) => {
      if (active === 2 && workGridRef.current) {
        const grid   = workGridRef.current;
        const atEnd  = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
        const atLeft = grid.scrollLeft <= 2;
        if ((e.key === "ArrowDown" || e.key === " ") && atEnd) goTo(active + 1);
        if (e.key === "ArrowUp" && atLeft)                     goTo(active - 1);
        return;
      }
      if (e.key === "ArrowDown" || e.key === " ") goTo(active + 1);
      if (e.key === "ArrowUp")                    goTo(active - 1);
    };

    window.addEventListener("wheel",   onWheel, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("wheel",   onWheel);
      window.removeEventListener("keydown", onKey);
    };
  }, [active, goTo]);

  // ─── Initial mount animation ─────────────────────────────────────────────────
  useEffect(() => {
    slideRefs.current.forEach((el, i) => {
      if (el) gsap.set(el, { visibility: i === 0 ? "visible" : "hidden", yPercent: 0 });
    });
    const texts = slideRefs.current[0]?.querySelectorAll(".slide-text");
    if (texts?.length) {
      gsap.fromTo(texts,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.2 }
      );
    }
  }, []);

  // ─── Reset work grid scroll when slide 2 becomes active ─────────────────────
  useEffect(() => {
    if (active === 2 && workGridRef.current) {
      workGridRef.current.scrollLeft = 0;
    }
  }, [active]);

  const setRef = (i) => (el) => { slideRefs.current[i] = el; };

  return (
    <div ref={root} style={{ width: "100%", height: "100vh", overflow: "hidden", background: "#090909", position: "relative" }}>

      {/* ── SLIDE 0 : HERO ──────────────────────────────────────────────── */}
      <div ref={setRef(0)} style={slideBase}>
        <HeroSlide />
      </div>

      {/* ── SLIDE 1 : ABOUT ─────────────────────────────────────────────── */}
      <div ref={setRef(1)} style={slideBase}>
        <AboutSlide />
      </div>

      {/* ── SLIDE 2 : WORK ──────────────────────────────────────────────── */}
      <div ref={setRef(2)} style={slideBase}>
        <WorkSlide workGridRef={workGridRef} />
      </div>

      {/* ── SLIDE 3 : SKILLS ────────────────────────────────────────────── */}
      <div ref={setRef(3)} style={slideBase}>
        <SkillsSlide />
      </div>

      {/* ── SLIDE 4 : CONTACT ───────────────────────────────────────────── */}
      <div ref={setRef(4)} style={slideBase}>
        <ContactSlide />
      </div>

      {/* ── Fixed UI: nav dots + slide counter ──────────────────────────── */}
      <PixelNav active={active} goTo={goTo} onWhite={onWhite} />

      <div style={{
        position: "fixed", left: "1.5rem", bottom: "1.5rem", zIndex: 9000,
        fontFamily: PX25, fontSize: "1rem", letterSpacing: "0.15em",
        color: (onWhite | active == 4) ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.28)",
        transition: "color 0.5s",
      }}>
        {String(active + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
      </div>
    </div>
  );
}
