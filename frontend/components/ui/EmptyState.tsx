import GradientButton from "./GradientButton";

export default function EmptyState({
  title,
  description,
  icon = "📭",
  actionLabel,
  onAction,
}: {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--card)] p-10 text-center">
      <div className="mb-4 text-5xl">{icon}</div>

      <h3 className="text-xl font-semibold text-[var(--text)]">{title}</h3>

      {description && (
        <p className="mt-2 max-w-md text-sm text-[var(--muted)]">
          {description}
        </p>
      )}

      {actionLabel && (
        <GradientButton onClick={onAction} className="mt-6">
          {actionLabel}
        </GradientButton>
      )}
    </div>
  );
}