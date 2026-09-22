export default function HudCorners() {
  return (
    <>
      <span className="pointer-events-none absolute top-2 left-2 z-20 h-4 w-4 border-t-2 border-l-2 border-signal opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
      <span className="pointer-events-none absolute top-2 right-2 z-20 h-4 w-4 border-t-2 border-r-2 border-magenta opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      <span className="pointer-events-none absolute bottom-2 left-2 z-20 h-4 w-4 border-b-2 border-l-2 border-magenta opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
      <span className="pointer-events-none absolute bottom-2 right-2 z-20 h-4 w-4 border-b-2 border-r-2 border-signal opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
    </>
  );
}