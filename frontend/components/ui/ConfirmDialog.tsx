"use client";

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 shadow-2xl">
        <h2 className="text-xl font-bold text-[var(--text)]">{title}</h2>

        {description && (
          <p className="mt-2 text-sm text-[var(--muted)]">{description}</p>
        )}

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-[var(--text)] hover:bg-[var(--card-hover)]"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className="rounded-xl bg-red-600 px-4 py-2 text-white hover:bg-red-700"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}