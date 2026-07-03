"use client";

const iconMap: Record<string, string> = {
  pdf: "#ef4444",
  doc: "#3b82f6",
  docx: "#3b82f6",
  xls: "#22c55e",
  xlsx: "#22c55e",
  ppt: "#f59e0b",
  pptx: "#f59e0b",
  jpg: "#8b5cf6",
  jpeg: "#8b5cf6",
  png: "#8b5cf6",
  gif: "#8b5cf6",
  mp4: "#ec4899",
  mp3: "#06b6d4",
  zip: "#6366f1",
  default: "#6b7280",
};

export default function FileCard({ file, onDelete }: { file: any; onDelete?: () => void }) {
  const ext = file.fileName?.split(".").pop()?.toLowerCase() || "default";
  const color = iconMap[ext] || iconMap.default;

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  return (
    <div className="group bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--border-hover)] transition-colors">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: color + "20" }}>
          <svg className="w-6 h-6" style={{ color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-[var(--text)] truncate">{file.fileName}</h3>
          <div className="flex items-center gap-3 mt-1">
            <span className="text-xs text-[var(--muted)] uppercase">{ext}</span>
            <span className="text-xs text-[var(--muted)]">{formatSize(file.size || 0)}</span>
            <span className="text-xs text-[var(--muted)]">{formatDate(file.createdAt)}</span>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={file.fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </a>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-[var(--error-muted)] rounded-lg transition-colors"
          >
            <svg className="w-4 h-4 text-[var(--muted)] hover:text-[var(--error)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
