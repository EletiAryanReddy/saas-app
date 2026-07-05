export default function StatChart({
  data,
}: {
  data: number[];
}) {
  const max = Math.max(...data, 1);

  return (
    <div className="flex h-16 items-end gap-1">
      {data.map((value, i) => (
        <div
          key={i}
          className="w-2 rounded-t bg-[var(--primary)]"
          style={{ height: `${(value / max) * 100}%` }}
        />
      ))}
    </div>
  );
}