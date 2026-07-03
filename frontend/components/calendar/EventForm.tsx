"use client";

import { useState } from "react";
import { createEvent, updateEvent } from "@/services/api/calendar.service";

interface Props {
  workspaceId: string;
  event?: any;
  onSuccess?: () => void;
  onClose?: () => void;
}

export default function EventForm({ workspaceId, event, onSuccess, onClose }: Props) {
  const [title, setTitle] = useState(event?.title || "");
  const [description, setDescription] = useState(event?.description || "");
  const [startTime, setStartTime] = useState(event?.startTime ? event.startTime.slice(0, 16) : "");
  const [endTime, setEndTime] = useState(event?.endTime ? event.endTime.slice(0, 16) : "");
  const [reminder, setReminder] = useState(event?.reminder || 15);
  const [color, setColor] = useState(event?.color || "#6366f1");
  const [participants, setParticipants] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const payload = {
      workspaceId,
      title,
      description,
      startTime,
      endTime,
      reminder,
      color,
      participants: participants ? participants.split(",").map((p) => p.trim()) : [],
      createdBy: "6a2c2bf8bd54aa6fdf346908",
    };

    try {
      if (event) {
        await updateEvent(event._id, payload);
      } else {
        await createEvent(payload);
      }
      onSuccess?.();
      onClose?.();
    } catch (error) {
      console.log(error);
    }
  };

  const colors = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#06b6d4", "#8b5cf6"];

  return (
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden">
      <div className="p-4 border-b border-[var(--border)]">
        <h2 className="font-semibold text-[var(--text)]">{event ? "Edit Event" : "Create Event"}</h2>
      </div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4">
        <input
          type="text"
          placeholder="Event title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors"
          required
        />
        <textarea
          placeholder="Event description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] placeholder:text-[var(--muted)] outline-none focus:border-[var(--primary)] transition-colors resize-none"
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-2">Start</label>
            <input
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-2">End</label>
            <input
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-2">Reminder</label>
            <select
              value={reminder}
              onChange={(e) => setReminder(Number(e.target.value))}
              className="w-full h-11 px-4 bg-[var(--bg)] border border-[var(--border)] rounded-xl text-sm text-[var(--text)] outline-none focus:border-[var(--primary)] transition-colors"
            >
              <option value={5}>5 minutes before</option>
              <option value={15}>15 minutes before</option>
              <option value={30}>30 minutes before</option>
              <option value={60}>1 hour before</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-[var(--muted)] mb-2">Color</label>
            <div className="flex items-center gap-2 h-11">
              {colors.map((c) => (
                <button
                  key={c}
                  type="button"
                  onClick={() => setColor(c)}
                  className={`w-8 h-8 rounded-lg transition-transform ${color === c ? "ring-2 ring-offset-2 ring-offset-[var(--card)] ring-white scale-110" : ""}`}
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="w-full h-11 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium text-sm rounded-xl hover:opacity-90 transition-opacity"
        >
          {event ? "Update Event" : "Create Event"}
        </button>
      </form>
    </div>
  );
}
