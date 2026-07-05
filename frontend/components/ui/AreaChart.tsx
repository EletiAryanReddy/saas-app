export default function AreaChart({
  data,
}: {
  data: { label: string; value: number }[];
}) {
  const max = Math.max(...data.map((d) => d.value), 1);

  const points = data.map((d, i) => {
    const x = (i / Math.max(data.length - 1, 1)) * 100;
    const y = 100 - (d.value / max) * 100;
    return `${x},${y}`;
  });

  const polygonPoints = [`0,100`, ...points, `100,100`].join(" ");

  return (
    <div>
      <svg viewBox="0 0 100 100" className="h-72 w-full overflow-visible">
        <polygon points={polygonPoints} fill="rgba(124,58,237,0.18)" />

        <polyline
          fill="none"
          stroke="var(--primary)"
          strokeWidth="3"
          points={points.join(" ")}
        />
      </svg>

      <div className="mt-3 flex justify-between text-xs text-[var(--muted)]">
        {data.map((d) => (
          <span key={d.label}>{d.label}</span>
        ))}
      </div>
    </div>
  );
}