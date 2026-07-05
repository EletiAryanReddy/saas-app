const styles: Record<string, string> = {
  active: "bg-green-500/15 text-green-400 border-green-500/30",
  pending: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  danger: "bg-red-500/15 text-red-400 border-red-500/30",
  default: "bg-slate-500/15 text-slate-300 border-slate-500/30",
};

export default function StatusBadge({
  label,
  type = "default",
}: {
  label: string;
  type?: "active" | "pending" | "danger" | "default";
}) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${styles[type]}`}
    >
      {label}
    </span>
  );
}