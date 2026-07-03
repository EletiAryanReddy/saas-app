"use client";

import { useState, useRef } from "react";
import { uploadFile } from "@/services/api/file.service";

export default function UploadZone({ onUpload }: { onUpload?: () => void }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("workspaceId", "6a2c2c86bd54aa6fdf34690a");
    formData.append("userId", "6a2c2bf8bd54aa6fdf346908");

    try {
      await uploadFile(formData);
      onUpload?.();
    } catch (e) {
      console.error(e);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleUpload(file);
  };

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
        isDragging
          ? "border-[var(--primary)] bg-[var(--primary-muted)]/20"
          : "border-[var(--border)] hover:border-[var(--border-hover)] hover:bg-[var(--card-hover)]"
      } ${uploading ? "pointer-events-none opacity-50" : ""}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleChange}
        className="hidden"
      />
      <div className="w-16 h-16 rounded-2xl bg-[var(--primary-muted)] flex items-center justify-center mx-auto mb-4">
        {uploading ? (
          <svg className="w-8 h-8 text-[var(--primary)] animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        ) : (
          <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        )}
      </div>
      <p className="font-medium text-[var(--text)] mb-2">
        {uploading ? "Uploading..." : "Drop files here or click to upload"}
      </p>
      <p className="text-sm text-[var(--muted)]">
        Supports PDF, DOC, XLS, JPG, PNG and more up to 50MB
      </p>
    </div>
  );
}
