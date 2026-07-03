"use client";

import { useState } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
  assignee: { name: string; avatar: string };
  dueDate: string;
  tags: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      { id: "1", title: "Design system documentation", description: "Create comprehensive docs for the design system", priority: "high", assignee: { name: "Sarah Chen", avatar: "SC" }, dueDate: "2024-07-05", tags: ["design", "docs"] },
      { id: "2", title: "API endpoint optimization", description: "Optimize slow API endpoints", priority: "medium", assignee: { name: "Mike Ross", avatar: "MR" }, dueDate: "2024-07-08", tags: ["backend"] },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      { id: "3", title: "User authentication flow", description: "Implement OAuth2 login flow", priority: "high", assignee: { name: "Aryan Reddy", avatar: "AR" }, dueDate: "2024-07-03", tags: ["frontend", "auth"] },
      { id: "4", title: "Dashboard widgets", description: "Build real-time dashboard widgets", priority: "medium", assignee: { name: "Emma Wilson", avatar: "EW" }, dueDate: "2024-07-10", tags: ["frontend"] },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      { id: "5", title: "Payment integration", description: "Stripe payment gateway integration", priority: "high", assignee: { name: "John Doe", avatar: "JD" }, dueDate: "2024-07-04", tags: ["backend", "payments"] },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [
      { id: "6", title: "Database schema design", description: "Finalize database schema", priority: "medium", assignee: { name: "Lisa Ray", avatar: "LR" }, dueDate: "2024-07-01", tags: ["database"] },
    ],
  },
];

const priorityColors = {
  low: "bg-[var(--success-muted)] text-[var(--success)]",
  medium: "bg-[var(--warning-muted)] text-[var(--warning)]",
  high: "bg-[var(--error-muted)] text-[var(--error)]",
};

const columnColors: Record<string, string> = {
  todo: "from-slate-400 to-slate-500",
  "in-progress": "from-amber-400 to-amber-500",
  review: "from-blue-400 to-blue-500",
  done: "from-emerald-400 to-emerald-500",
};

export default function BoardPage() {
  const [columns, setColumns] = useState<Column[]>(initialColumns);
  const [draggedTask, setDraggedTask] = useState<Task | null>(null);
  const [draggedFrom, setDraggedFrom] = useState<string | null>(null);
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<string>("todo");

  const handleDragStart = (task: Task, columnId: string) => {
    setDraggedTask(task);
    setDraggedFrom(columnId);
  };

  const handleDrop = (columnId: string) => {
    if (!draggedTask || !draggedFrom || draggedFrom === columnId) return;
    setColumns((prev) => {
      const newColumns = prev.map((col) => ({
        ...col,
        tasks: col.id === draggedFrom ? col.tasks.filter((t) => t.id !== draggedTask.id) :
               col.id === columnId ? [...col.tasks, draggedTask] : col.tasks,
      }));
      return newColumns;
    });
    setDraggedTask(null);
    setDraggedFrom(null);
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <div className="border-b border-[var(--border)] bg-[var(--card)]">
        <div className="max-w-screen-2xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-[var(--text)]">Task Board</h1>
              <p className="text-[var(--muted)] text-sm mt-1">Drag and drop tasks to organize your workflow</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {["AR", "SC", "MR", "EW"].map((avatar, i) => (
                  <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 border-2 border-[var(--card)] flex items-center justify-center text-white text-xs font-medium">
                    {avatar}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full bg-[var(--border)] border-2 border-[var(--card)] flex items-center justify-center text-[var(--muted)] text-xs">
                  +
                </div>
              </div>
              <button
                onClick={() => setShowCreateTask(true)}
                className="flex items-center gap-2 h-10 px-5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add Task
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="flex gap-6 p-6 min-w-max">
          {columns.map((column) => (
            <div
              key={column.id}
              className="w-80 flex-shrink-0"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(column.id)}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full bg-gradient-to-br ${columnColors[column.id]}`} />
                <h3 className="font-semibold text-[var(--text)]">{column.title}</h3>
                <span className="text-sm text-[var(--muted)] ml-auto">{column.tasks.length}</span>
              </div>

              <div className="space-y-3">
                {column.tasks.map((task) => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={() => handleDragStart(task, column.id)}
                    className="bg-[var(--card)] border border-[var(--border)] rounded-xl p-4 cursor-grab active:cursor-grabbing hover:border-[var(--border-hover)] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
                        {task.priority}
                      </span>
                      <svg className="w-4 h-4 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                      </svg>
                    </div>
                    <h4 className="font-medium text-[var(--text)] mb-2">{task.title}</h4>
                    <p className="text-sm text-[var(--muted)] line-clamp-2 mb-3">{task.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {task.tags.map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 bg-[var(--bg)] rounded-md text-[var(--text-secondary)]">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-[var(--border)]">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-medium">
                          {task.assignee.avatar}
                        </div>
                        <span className="text-xs text-[var(--muted)]">{task.assignee.name}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--muted)]">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {new Date(task.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => { setSelectedColumn(column.id); setShowCreateTask(true); }}
                className="w-full mt-3 p-3 border border-dashed border-[var(--border)] rounded-xl text-sm text-[var(--muted)] hover:bg-[var(--card-hover)] hover:border-[var(--border-hover)] transition-colors flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Add task
              </button>
            </div>
          ))}
        </div>
      </div>

      {showCreateTask && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl w-full max-w-lg mx-4 animate-fade-in">
            <div className="flex items-center justify-between p-6 border-b border-[var(--border)]">
              <h2 className="text-lg font-semibold text-[var(--text)]">Create New Task</h2>
              <button onClick={() => setShowCreateTask(false)} className="p-2 hover:bg-[var(--card-hover)] rounded-lg transition-colors">
                <svg className="w-5 h-5 text-[var(--muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter task title"
                  className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-muted)] transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Description</label>
                <textarea
                  placeholder="Enter task description"
                  rows={3}
                  className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary-muted)] transition-all resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Priority</label>
                  <select className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-all">
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">Due Date</label>
                  <input
                    type="date"
                    className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-all"
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-3 p-6 border-t border-[var(--border)]">
              <button onClick={() => setShowCreateTask(false)} className="px-4 py-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text)] transition-colors">
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-sm font-medium rounded-lg hover:opacity-90 transition-all"
              >
                Create Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
