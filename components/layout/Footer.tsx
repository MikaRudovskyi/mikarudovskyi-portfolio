export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <p className="font-display font-semibold text-text">Mykhailo Rudovskyi</p>
          <p className="text-sm text-muted">Full-Stack Engineer · Support Engineer · Telecom</p>
        </div>
        <div className="flex flex-col md:items-end gap-1">
          <span className="flex items-center gap-2 font-mono text-xs text-muted2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" />
            System status: operational
          </span>
          <p className="font-mono text-xs text-muted2">© 2026 Mykhailo Rudovskyi</p>
        </div>
      </div>
    </footer>
  );
}