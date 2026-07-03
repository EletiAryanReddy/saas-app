"use client";

import Column from "./Column";

export default function Board({
  board,
  refresh,
}: any) {
  return (
    <div className="mb-10">
      <h2 className="text-2xl text-white mb-4">
        {board.title}
      </h2>

      <div className="grid grid-cols-4 gap-4">
        {board.columns.map(
          (column: any, index: number) => (
            <Column
              key={index}
              boardId={board._id}
              column={column}
              refresh={refresh}
            />
          )
        )}
      </div>
    </div>
  );
}