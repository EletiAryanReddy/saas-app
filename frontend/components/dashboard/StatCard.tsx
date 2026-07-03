"use client";

import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  trend?: { value: number; isUp: boolean };
  color?: "primary" | "success" | "warning" | "error";
}

const colorMap = {
  primary: {
    bg: "bg-[var(--primary-muted)]",
    text: "text-[var(--primary)]",
    gradient: "from-indigo-500 to-purple-600",
  },
  success: {
    bg: "bg-[var(--success-muted)]",
    text: "text-[var(--success)]",
    gradient: "from-emerald-500 to-teal-600",
  },
  warning: {
    bg: "bg-[var(--warning-muted)]",
    text: "text-[var(--warning)]",
    gradient: "from-amber-500 to-orange-600",
  },
  error: {
    bg: "bg-[var(--error-muted)]",
    text: "text-[var(--error)]",
    gradient: "from-rose-500 to-red-600",
  },
};

export default function StatCard({ title, value, icon, trend, color = "primary" }: StatCardProps) {
  const [animatedValue, setAnimatedValue] = useState(0);
  const colors = colorMap[color];

  useEffect(() => {
    const target = typeof value === "number" ? value : parseInt(value) || 0;
    const duration = 1000;
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setAnimatedValue(target);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="group relative bg-[var(--card)] border border-[var(--border)] rounded-2xl p-5 hover:border-[var(--border-hover)] transition-all duration-300 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-[var(--muted)] font-medium">{title}</p>
          <h3 className="text-3xl font-bold mt-2 text-[var(--text)]">
            {typeof value === "number" ? animatedValue.toLocaleString() : value}
          </h3>
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-xs font-medium ${trend.isUp ? "text-[var(--success)]" : "text-[var(--error)]"}`}>
                {trend.isUp ? "+" : ""}{trend.value}%
              </span>
              <svg className={`w-3 h-3 ${trend.isUp ? "text-[var(--success)]" : "text-[var(--error)] rotate-180"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
              <span className="text-xs text-[var(--muted)]">vs last week</span>
            </div>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center ${colors.text}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
