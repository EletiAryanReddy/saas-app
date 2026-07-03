"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "review" | "done";
  priority: "low" | "medium" | "high";
  assignee: { name: string; avatar: string };
  dueDate: string;
}

const mockTasks: Task[] = [
  { id: "1", title: "Implement user authentication", description: "Add OAuth2 login flow", status: "in-progress", priority: "high", assignee: { name: "Aryan Reddy", avatar: "AR" }, dueDate: "2024-07-05" },
  { id: "2", title: "Design system documentation", description: "Create comprehensive docs", status: "todo", priority: "medium", assignee: { name: "Sarah Chen", avatar: "SC" }, dueDate: "2024-07-08" },
  { id: "3", title: "API endpoint optimization", description: "Optimize slow endpoints", status: "review", priority: "high", assignee: { name: "Mike Ross", avatar: "MR" }, dueDate: "2024-07-03" },
  { id: "4", title: "Dashboard widgets", description: "Build real-time widgets", status: "done", priority: "medium", assignee: { name: "Emma Wilson", avatar: "EW" }, dueDate: "2024-07-01" },
  { id: "5", title: "Mobile responsive UI", description: "Make app mobile-friendly", status: "todo", priority: "low", assignee: { name: "John Doe", avatar: "JD" }, dueDate: "2024-07-10" },
];

const priorityColors = {
  low: "bg-[var(--success-muted)] text-[var(--success)]",
  medium: "bg-[var(--warning-muted)] text-[var(--warning)]",
  high: "bg-[var(--error-muted)] text-[var(--error)]",
};

const statusColors = {
  todo: "bg-slate-500",
  "in-progress": "bg-amber-500",
  review: "bg-blue-500",
  done: "bg-emerald-500",
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);
  const [filter, setFilter] = useState<"all" | Task["status"]>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTasks = tasks.filter(
    (task) => (filter === "all" || task.status === filter) && task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const taskCounts = {
    all: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    "in-progress": tasks.filter((t) => t.status === "in-progress").length,
    review: tasks.filter((t) => t.status === "review").length,
    done: tasks.filter((t) => t.status === "done").length,
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Tasks</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Track and manage your personal tasks</p>
            </div>
            <button className="flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add Task
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center bg-[var(--card)] border border-[var(--border)] rounded-xl p-1">
            {(["all", "todo", "in-progress", "review", "done"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  filter === f ? "bg-[var(--primary)] text-white" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
              >
                {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1).replace("-", " ")}
                <span className={`text-xs px-1.5 py-0.5 rounded-full ${filter === f ? "bg-white/20" : "bg-[var(--bg)]"}`}>
                  {taskCounts[f]}
                </span>
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search tasks..."
              className="w-64 h-10 pl-10 pr-4 bg-[var(--card)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
            />
          </div>
        </div>

        <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-[var(--bg)] border-b border-[var(--border)]">
            <div className="col-span-5 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Task</div>
            <div className="col-span-2 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Status</div>
            <div className="col-span-2 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Priority</div>
            <div className="col-span-2 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Assignee</div>
            <div className="col-span-1 text-xs font-medium text-[var(--muted)] uppercase tracking-wider">Due</div>
          </div>

          <div className="divide-y divide-[var(--border)]">
            {filteredTasks.length === 0 ? (
              <div className="px-6 py-12 text-center">
                <p className="text-[var(--muted)]">No tasks found</p>
              </div>
            ) : (
              filteredTasks.map((task) => (
                <div key={task.id} className="grid grid-cols-12 gap-4 px-6 py-4 items-center hover:bg-[var(--card-hover)] transition-colors cursor-pointer">
                  <div className="col-span-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${statusColors[task.status]}`} />
                      <div>
                        <p className="font-medium text-[var(--text)]">{task.title}</p>
                        <p className="text-xs text-[var(--muted)] truncate max-w-xs">{task.description}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[var(--bg)] rounded-lg text-xs text-[var(--text-secondary)]">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusColors[task.status]}`} />
                      {task.status.charAt(0).toUpperCase() + task.status.slice(1).replace("-", " ")}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                        {task.assignee.avatar}
                      </div>
                      <span className="text-sm text-[var(--text-secondary)]">{task.assignee.name}</span>
                    </div>
                  </div>
                  <div className="col-span-1 text-sm text-[var(--muted)]">
                    {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
