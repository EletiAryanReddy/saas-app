export default function DataTable({
  columns,
  rows,
}: {
  columns: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)]">
      <table className="w-full text-sm">
        <thead className="bg-[var(--bg)] text-[var(--muted)]">
          <tr>
            {columns.map((col) => (
              <th key={col} className="px-5 py-4 text-left font-medium">
                {col}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t border-[var(--border)]">
              {row.map((cell, j) => (
                <td key={j} className="px-5 py-4 text-[var(--text)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}