"use client";

import { useState } from "react";
import axios from "axios";

export default function CreateCardModal({
  boardId,
  columnTitle,
  refresh,
}: any) {
  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const createCard = async () => {
    await axios.post(
      `http://localhost:5000/api/boards/${boardId}/card`,
      {
        columnTitle,

        card: {
          title,
          description,
          priority: "Medium",
        },
      }
    );

    refresh();

    setTitle("");
    setDescription("");
  };

  return (
    <div>
      <button
        onClick={createCard}
        className="bg-blue-600 text-white px-3 py-1 rounded"
      >
        + Card
      </button>
    </div>
  );
}