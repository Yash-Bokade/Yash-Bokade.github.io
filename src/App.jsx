import Portfolio from "./Components/Portfolio";

export default function App() {
  return (
    <>
      {/* Static grainy overlay */}
      <div className="grain-overlay" />
      <Portfolio />
    </>
  );
}
