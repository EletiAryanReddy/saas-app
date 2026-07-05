export default function SearchBox({
  placeholder = "Search...",
}: {
  placeholder?: string;
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-xl border border-[var(--border)] bg-[var(--bg)] px-4 py-3 text-sm text-[var(--text)] outline-none placeholder:text-[var(--muted)] focus:ring-2 focus:ring-[var(--primary)]"
    />
  );
}