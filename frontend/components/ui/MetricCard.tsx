export default function MetricCard({
  title,
  value,
  change,
  icon,
}: {
  title: string;
  value: string;
  change?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-xl">
      <div className="flex items-center justify-between">
        <p className="text-sm text-[var(--muted)]">{title}</p>
        <div className="text-2xl">{icon}</div>
      </div>

      <h2 className="mt-4 text-3xl font-bold text-[var(--text)]">{value}</h2>

      {change && (
        <p className="mt-2 text-sm text-green-400">{change}</p>
      )}
    </div>
  );
}