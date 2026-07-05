export default function DoughnutChart({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  const radius = 46;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative h-48 w-48">
        <svg className="h-48 w-48 -rotate-90">
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="var(--border)"
            strokeWidth="14"
            fill="none"
          />
          <circle
            cx="96"
            cy="96"
            r={radius}
            stroke="var(--primary)"
            strokeWidth="14"
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold">{value}%</span>
          <span className="text-sm text-[var(--muted)]">{label}</span>
        </div>
      </div>
    </div>
  );
}