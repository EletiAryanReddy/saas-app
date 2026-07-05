export default function SaaSCard({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl transition hover:bg-[var(--card-hover)] ${className}`}
    >
      {children}
    </div>
  );
}