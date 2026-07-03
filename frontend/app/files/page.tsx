"use client";

import { useEffect, useState } from "react";
import { getFiles } from "@/services/api/file.service";
import { useFileStore } from "@/store/file.store";
import UploadZone from "@/components/files/UploadZone";
import FileCard from "@/components/files/FileCard";

export default function FilesPage() {
  const { files, setFiles } = useFileStore();
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const loadFiles = async () => {
    try {
      const data = await getFiles("6a2c2c86bd54aa6fdf34690a");
      setFiles(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFiles();
  }, []);

  const filteredFiles = files.filter((file: any) =>
    file.fileName?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const recentFiles = filteredFiles.slice(0, 6);
  const allFiles = filteredFiles.slice(6);

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Files</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Upload, organize, and share your files</p>
            </div>
            <button
              onClick={() => document.querySelector<HTMLInputElement>("[type=file]")?.click()}
              className="flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              Upload File
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6 space-y-8">
        <UploadZone onUpload={loadFiles} />

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl">
          <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h2 className="font-semibold text-[var(--text)]">Recent Files</h2>
              <span className="text-xs px-2 py-1 bg-[var(--bg)] rounded-full text-[var(--muted)]">
                {filteredFiles.length} files
              </span>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search files..."
                  className="w-56 h-9 pl-9 pr-4 bg-[var(--bg)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
                />
              </div>
              <div className="flex items-center bg-[var(--bg)] rounded-lg p-1">
                <button
                  onClick={() => setView("grid")}
                  className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)]"}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                </button>
                <button
                  onClick={() => setView("list")}
                  className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-[var(--primary)] text-white" : "text-[var(--muted)]"}`}
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="p-4">
            {loading ? (
              <div className={`grid ${view === "grid" ? "grid-cols-2 md:grid-cols-4" : "grid-cols-1"} gap-3`}>
                {[...Array(8)].map((_, i) => <div key={i} className="h-20 bg-[var(--bg)] rounded-xl animate-pulse" />)}
              </div>
            ) : filteredFiles.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[var(--bg)] flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>
                <p className="text-[var(--muted)]">No files found</p>
              </div>
            ) : view === "grid" ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {filteredFiles.map((file: any) => (
                  <FileCard key={file._id} file={file} />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {filteredFiles.map((file: any) => (
                  <FileCard key={file._id} file={file} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
