export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold text-[var(--text)]">{title}</h1>
        {subtitle && (
          <p className="mt-2 text-sm text-[var(--muted)]">{subtitle}</p>
        )}
      </div>
      {action}
    </div>
  );
}