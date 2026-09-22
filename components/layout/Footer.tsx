export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-mono font-bold text-text">MYKHAILO RUDOVSKYI</p>
          <p className="text-sm text-muted">
            Full-Stack Engineer · Support Engineer · Telecom
          </p>
        </div>
        <p className="font-mono text-xs text-muted2">
          © 2026 Mykhailo Rudovskyi
        </p>
      </div>
    </footer>
  );
}