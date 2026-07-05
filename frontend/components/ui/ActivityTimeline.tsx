export default function ActivityTimeline({
  items,
}: {
  items: {
    title: string;
    time: string;
    description?: string;
  }[];
}) {
  return (
    <div className="space-y-5">
      {items.map((item, i) => (
        <div key={i} className="flex gap-4">
          <div className="flex flex-col items-center">
            <div className="h-3 w-3 rounded-full bg-[var(--primary)]" />
            {i !== items.length - 1 && (
              <div className="mt-2 h-full w-px bg-[var(--border)]" />
            )}
          </div>

          <div>
            <h4 className="font-semibold text-[var(--text)]">{item.title}</h4>
            <p className="text-xs text-[var(--muted)]">{item.time}</p>
            {item.description && (
              <p className="mt-2 text-sm text-[var(--muted)]">
                {item.description}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}