export default function BarChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex h-72 items-end gap-4">
      {data.map((item) => (
        <div key={item.label} className="flex flex-1 flex-col items-center gap-3">
          <div
            className="w-full rounded-t-xl bg-gradient-to-t from-violet-600 to-blue-500"
            style={{ height: `${(item.value / max) * 100}%` }}
          />
          <span className="text-xs text-[var(--muted)]">{item.label}</span>
        </div>
      ))}
    </div>
  );
}