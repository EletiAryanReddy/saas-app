"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

interface Project {
  _id: string;
  name: string;
  description: string;
  status: string;
  members: any[];
  createdBy: any;
  createdAt: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");

  const workspaceId = "6a2c2c86bd54aa6fdf34690a";
  const createdBy = "6a2c2bf8bd54aa6fdf346908";

  const loadProjects = async () => {
    try {
      const res = await fetch(`${API}/projects/workspace/${workspaceId}`);
      const data = await res.json();
      setProjects(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
    if (!name.trim()) return;
    await fetch(`${API}/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workspaceId, name, description, createdBy, members: [createdBy] }),
    });
    setName("");
    setDescription("");
    setShowCreate(false);
    loadProjects();
  };

  const filteredProjects = projects.filter((p) => filter === "all" || p.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "bg-[var(--success-muted)] text-[var(--success)]";
      case "completed": return "bg-[var(--primary-muted)] text-[var(--primary)]";
      case "on-hold": return "bg-[var(--warning-muted)] text-[var(--warning)]";
      default: return "bg-[var(--card-hover)] text-[var(--muted)]";
    }
  };

  const getProjectGradient = (index: number) => {
    const gradients = [
      "from-indigo-500 to-purple-600",
      "from-emerald-500 to-teal-600",
      "from-amber-500 to-orange-600",
      "from-rose-500 to-red-600",
      "from-cyan-500 to-blue-600",
    ];
    return gradients[index % gradients.length];
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Projects</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Manage and track all your projects</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Project
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1">
            {["all", "active", "completed", "on-hold"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  filter === f ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
              >
                {f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
              </button>
            ))}
          </div>
          <div className="flex-1" />
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search projects..."
              className="w-64 h-10 pl-10 pr-4 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 animate-pulse">
                <div className="h-32 bg-[var(--bg)] rounded-xl mb-4" />
                <div className="h-5 w-32 bg-[var(--bg)] rounded mb-2" />
                <div className="h-4 w-full bg-[var(--bg)] rounded" />
              </div>
            ))}
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-16 h-16 rounded-full bg-[var(--primary-muted)] flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-[var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text)] mb-2">No projects found</h3>
            <p className="text-[var(--muted)] text-sm mb-4">Get started by creating your first project</p>
            <button
              onClick={() => setShowCreate(true)}
              className="px-4 py-2 bg-[var(--primary)] text-white text-sm font-medium rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
            >
              Create Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, i) => (
              <Link
                key={project._id}
                href={`/projects/${project._id}`}
                className="group bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--border-hover)] transition-all"
              >
                <div className={`h-32 bg-gradient-to-br ${getProjectGradient(i)} relative`}>
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                      {project.status || "Planning"}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-semibold text-[var(--text)] group-hover:text-[var(--primary)] transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-sm text-[var(--muted)] mt-2 line-clamp-2">
                    {project.description || "No description provided"}
                  </p>
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-[var(--border)]">
                    <div className="flex -space-x-2">
                      {(project.members || []).slice(0, 4).map((member: any, j: number) => (
                        <div
                          key={j}
                          className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[var(--card)] flex items-center justify-center text-white text-xs font-medium"
                        >
                          {typeof member === "string" ? member.charAt(0).toUpperCase() : member.name?.charAt(0) || "?"}
                        </div>
                      ))}
                      {(project.members?.length || 0) > 4 && (
                        <div className="w-7 h-7 rounded-full bg-[var(--border)] border-2 border-[var(--card)] flex items-center justify-center text-[var(--muted)] text-xs font-medium">
                          +{project.members.length - 4}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-[var(--muted)]">
                      {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {showCreate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-lg mx-4 animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--text)]">Create New Project</h2>
              <button onClick={() => setShowCreate(false)} className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
                <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Project Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter project name"
                  className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-muted)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter project description"
                  rows={4}
                  className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-muted)] transition-all resize-none"
                />
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border)]">
              <button
                onClick={() => setShowCreate(false)}
                className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={createProject}
                disabled={!name.trim()}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Create Project
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
