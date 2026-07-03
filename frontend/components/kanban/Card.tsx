"use client";

import { useState } from "react";
import CardDetailsDrawer from "./CardDetailsDrawer";

export default function Card({
  card,
}: any) {
  const [open, setOpen] =
    useState(false);

  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-zinc-800 p-3 rounded-lg cursor-pointer hover:bg-zinc-700"
      >
        <h4 className="text-white font-semibold">
          {card.title}
        </h4>

        <p className="text-zinc-400 text-sm">
          {card.description}
        </p>

        <div className="mt-2">
          <span className="bg-red-500 text-xs px-2 py-1 rounded">
            {card.priority}
          </span>
        </div>
      </div>

      <CardDetailsDrawer
        card={card}
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}