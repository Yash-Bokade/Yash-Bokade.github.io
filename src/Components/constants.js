// ─── Font constants ────────────────────────────────────────────────────────────
export const PX25  = "'Jersey 25', monospace";
export const PX10  = "'Jersey 10', monospace";
export const BEBAS = "'Bebas Neue', sans-serif";
export const SERIF = "'Bodoni Moda', serif";
export const SANS  = "'Khand', sans-serif";

// ─── Slide definitions ─────────────────────────────────────────────────────────
export const SLIDES = [
  { id: "hero",    label: "00", name: "HOME"    },
  { id: "about",   label: "01", name: "ABOUT"   },
  { id: "work",    label: "02", name: "WORK"    },
  { id: "skills",  label: "03", name: "SKILLS"  },
  { id: "contact", label: "04", name: "CONTACT" },
];

// ─── Project data ──────────────────────────────────────────────────────────────
export const PROJECTS = [
  { n: "001", title: "AETHERIUM.OS",  type: "CANVAS · GSAP · WEBGL",      year: "2026", desc: "An experimental browser-based spatial OS built on canvas shaders and reactive data structures." },
  { n: "002", title: "VOIDSCRIPT",    type: "RUST · WASM · COMPILER",     year: "2026", desc: "A visual-node compiler that translates node graphs into optimised WebAssembly binaries." },
  { n: "003", title: "NEURAL.FLOW",   type: "WEBAUDIO · THREE.JS · GSAP", year: "2025", desc: "Real-time generative soundscapes synthesised from cursor position and spatial interaction vectors." },
  { n: "004", title: "SPECTRA.SHD",   type: "GLSL · FRAGMENT SHADERS",    year: "2025", desc: "High-fashion digital lookbook incorporating fluid mechanics and custom fragment shader pipelines." },
  { n: "005", title: "DRIFT.UI",      type: "REACT · GSAP · CSS",         year: "2025", desc: "A design system toolkit for motion-first interfaces, with physics-based spring transitions." },
  { n: "006", title: "HELIX.DB",      type: "RUST · POSTGRESQL · WASM",   year: "2024", desc: "A blazing-fast edge database with WASM runtime, zero-latency query compilation." },
  { n: "007", title: "VOIDSCRIPT",    type: "RUST · WASM · COMPILER",     year: "2026", desc: "A visual-node compiler that translates node graphs into optimised WebAssembly binaries." },
  { n: "008", title: "NEURAL.FLOW",   type: "WEBAUDIO · THREE.JS · GSAP", year: "2025", desc: "Real-time generative soundscapes synthesised from cursor position and spatial interaction vectors." },
  { n: "009", title: "SPECTRA.SHD",   type: "GLSL · FRAGMENT SHADERS",    year: "2025", desc: "High-fashion digital lookbook incorporating fluid mechanics and custom fragment shader pipelines." },
  { n: "010", title: "DRIFT.UI",      type: "REACT · GSAP · CSS",         year: "2025", desc: "A design system toolkit for motion-first interfaces, with physics-based spring transitions." },
  { n: "011", title: "HELIX.DB",      type: "RUST · POSTGRESQL · WASM",   year: "2024", desc: "A blazing-fast edge database with WASM runtime, zero-latency query compilation." },
];

// ─── Skills data ───────────────────────────────────────────────────────────────
export const SKILLS = [
  { label: "GSAP",       sub: "ANIMATION ENGINE",  cat: "MOTION"   },
  { label: "REACT 19",   sub: "UI FRAMEWORK",       cat: "FRONTEND" },
  { label: "VITE",       sub: "BUILD TOOL",         cat: "TOOLING"  },
  { label: "CANVAS API", sub: "2D RENDERING",       cat: "GRAPHICS" },
  { label: "WEBGL",      sub: "3D / GPU SHADER",    cat: "GRAPHICS" },
  { label: "TYPESCRIPT", sub: "TYPE SYSTEM",        cat: "LANGUAGE" },
  { label: "BUN",        sub: "JS RUNTIME",         cat: "TOOLING"  },
  { label: "TAILWIND",   sub: "UTILITY CSS",        cat: "STYLING"  },
  { label: "THREE.JS",   sub: "3D LIBRARY",         cat: "GRAPHICS" },
];

// ─── Shared style helpers ──────────────────────────────────────────────────────
export const slideBase = { position: "absolute", inset: 0, visibility: "hidden" };

export const bigType = (color, italic) => ({
  fontFamily: italic ? SERIF : BEBAS,
  fontSize: "clamp(5rem, 18vw, 22rem)",
  fontWeight: 900,
  fontStyle: italic ? "italic" : "normal",
  color, lineHeight: 0.85, letterSpacing: "0.01em", margin: 0,
});
