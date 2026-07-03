"use client";

export default function CardDetailsDrawer({
  card,
  open,
  setOpen,
}: any) {
  if (!open) return null;

  return (
    <div className="fixed right-0 top-0 h-screen w-[400px] bg-zinc-900 border-l border-zinc-700 p-6 z-50">

      <button
        onClick={() =>
          setOpen(false)
        }
        className="text-white mb-4"
      >
        Close
      </button>

      <h2 className="text-2xl text-white font-bold">
        {card.title}
      </h2>

      <p className="text-zinc-400 mt-3">
        {card.description}
      </p>

      <div className="mt-6">
        <span className="bg-red-500 px-3 py-1 rounded text-white">
          {card.priority}
        </span>
      </div>
    </div>
  );
}