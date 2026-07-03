export default function MetricCard({
  title,
  value,
  icon,
}: any) {
  return (
    <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 shadow-xl">
      <div className="flex justify-between">
        <div>
          <p className="text-slate-400 text-sm">
            {title}
          </p>
          <h2 className="text-3xl font-bold mt-2">
            {value}
          </h2>
        </div>

        <div className="text-4xl">{icon}</div>
      </div>
    </div>
  );
}