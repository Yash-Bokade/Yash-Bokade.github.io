import { BEBAS, SERIF, PX10, bigType } from "./constants";
import ScrollHint from "./ScrollHint";

// ─── Hero Slide ────────────────────────────────────────────────────────────────
export default function HeroSlide() {
  return (
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>

      {/* Stacked name panels */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div style={{
          flex: 1, background: "#0a0a0a",
          display: "flex", alignItems: "flex-end",
          padding: "4vw", paddingBottom: "2vw", overflow: "hidden",
          borderBottom: "1px solid rgba(255,255,255,0.15)",
        }}>
          <h1 className="slide-text" style={bigType("#fff", false)}>YASH</h1>
        </div>
        <div style={{
          flex: 1, background: "#f0f0f0",
          display: "flex", alignItems: "flex-start",
          padding: "4vw", paddingTop: "2vw", overflow: "hidden",
        }}>
          <h1 className="slide-text" style={bigType("#111", true)}>BOKADE</h1>
        </div>
      </div>

      {/* Minimal footer strip */}
      <div className="slide-text" style={{
        background: "#0a0a0a",
        borderTop: "1px solid rgba(255,255,255,0.08)",
        padding: "0.85rem 4vw",
        display: "flex", justifyContent: "space-between", alignItems: "center",
      }}>
        <span style={{ fontFamily: PX10, fontSize: "0.72rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" }}>
          CREATIVE DEVELOPER · INDIA
        </span>
        <ScrollHint />
        <span style={{ fontFamily: PX10, fontSize: "0.72rem", letterSpacing: "0.25em", color: "rgba(255,255,255,0.3)" }}>
          {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
}
