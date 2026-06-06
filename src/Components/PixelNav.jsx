import { PX10 } from "./constants";
import { SLIDES } from "./constants";

// ─── Pixel Square Nav ──────────────────────────────────────────────────────────
export default function PixelNav({ active, goTo, onWhite }) {
  const col    = onWhite ? "#000" : "#fff";
  const colDim = onWhite ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.2)";

  return (
    <nav style={{
      position: "fixed", right: "1.8rem", top: "50%",
      transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: "6px",
      zIndex: 9000, alignItems: "center",
    }}>
      {SLIDES.map((sl, i) => (
        <button key={i} onClick={() => goTo(i)} title={sl.name}
          style={{
            width:  i === active ? 14 : 8,
            height: i === active ? 14 : 8,
            background: i === active ? col : "transparent",
            border: `2px solid ${i === active ? col : colDim}`,
            cursor: "pointer", padding: 0,
            transition: "all 0.3s ease",
            imageRendering: "pixelated",
          }}
        />
      ))}
      <span style={{
        fontFamily: PX10, fontSize: "0.7rem",
        color: colDim, letterSpacing: "0.1em",
        marginTop: "6px", writingMode: "vertical-rl",
        transform: "rotate(180deg)",
      }}>
        {SLIDES[active].name}
      </span>
    </nav>
  );
}
