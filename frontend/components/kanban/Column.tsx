"use client";

import Card from "./Card";
import CreateCardModal from "./CreateCardModal";

export default function Column({
  boardId,
  column,
  refresh,
}: any) {
  return (
    <div className="bg-zinc-900 rounded-xl p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-bold">
          {column.title}
        </h3>

        <CreateCardModal
          boardId={boardId}
          columnTitle={column.title}
          refresh={refresh}
        />
      </div>

      <div className="space-y-3">
        {column.cards.map((card: any) => (
          <Card
            key={card._id}
            card={card}
          />
        ))}
      </div>
    </div>
  );
}