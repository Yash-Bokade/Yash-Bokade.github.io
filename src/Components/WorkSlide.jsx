import { PX10, PX25, PROJECTS } from "./constants";
import PixelBlink from "./PixelBlink";
import ProjectCell from "./ProjectCell";

// ─── Work Slide — horizontal scrolling Nx2 grid ───────────────────────────────
export default function WorkSlide({ workGridRef }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0a0a0a", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      <div className="slide-text" style={{
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        padding: "1.1rem 5vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: PX25, fontSize: "1rem", color: "rgba(255,255,255,0.4)", letterSpacing: "0.2em" }}>&gt; PROJECTS</span>
        <div style={{ display: "flex", alignItems: "center", gap: "0.8rem" }}>
          <span style={{ fontFamily: PX10, fontSize: "0.7rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em" }}>SCROLL →</span>
          <PixelBlink />
        </div>
      </div>

      {/* Nx2 horizontally-scrollable grid */}
      <div
        ref={workGridRef}
        className="slide-text"
        style={{
          flex: 1,
          display: "grid",
          gridTemplateRows: "repeat(2, 1fr)",
          gridAutoFlow: "column",
          gridAutoColumns: "clamp(260px, 50vw, 620px)",
          gap: "1px",
          overflowX: "auto",
          overflowY: "hidden",
          padding: "1px",
          background: "rgba(255,255,255,0.06)",
          scrollbarWidth: "none",
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCell key={i} p={p} idx={i} />
        ))}
      </div>

      <div className="slide-text" style={{
        borderTop: "1px solid rgba(255,255,255,0.06)",
        padding: "0.65rem 5vw",
        display: "flex", justifyContent: "space-between",
        fontFamily: PX10, fontSize: "0.7rem",
        color: "rgba(255,255,255,0.18)", letterSpacing: "0.12em",
        flexShrink: 0,
      }}>
        <span>0{PROJECTS.length} PROJECTS</span>
        <span>HOVER TO REVEAL DETAILS</span>
      </div>
    </div>
  );
}
