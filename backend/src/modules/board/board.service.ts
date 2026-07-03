import Board from "./board.model";

export const createBoard = async (
  data: any
) => {
  return await Board.create(data);
};

export const getBoardsByWorkspace =
  async (workspaceId: string) => {
    return await Board.find({
      workspaceId,
    });
  };

export const createCard = async (
  boardId: string,
  columnTitle: string,
  card: any
) => {
  const board =
    await Board.findById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  const column =
    board.columns.find(
      (c: any) =>
        c.title === columnTitle
    );

  if (!column) {
    throw new Error("Column not found");
  }

  column.cards.push(card);

  await board.save();

  return board;
};

export const moveCard = async (
  boardId: string,
  cardId: string,
  sourceColumn: string,
  targetColumn: string
) => {
  const board =
    await Board.findById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  const source =
    board.columns.find(
      (c: any) =>
        c.title === sourceColumn
    );

  const target =
    board.columns.find(
      (c: any) =>
        c.title === targetColumn
    );

  if (!source || !target) {
    throw new Error("Column missing");
  }

  console.log(
    "Card ID:",
    cardId
  );

  console.log(
    "Available Cards:",
    source.cards.map((c: any) => ({
      id: c._id.toString(),
      title: c.title,
    }))
  );

  const cardIndex =
    source.cards.findIndex(
      (c: any) =>
        c._id.toString() === cardId
    );

  if (cardIndex === -1) {
    throw new Error("Card not found");
  }

  const card =
    source.cards[cardIndex];

  source.cards.splice(
    cardIndex,
    1
  );

  target.cards.push(card);

  await board.save();

  return board;
};

export const deleteCard = async (
  boardId: string,
  cardId: string
) => {
  const board =
    await Board.findById(boardId);

  if (!board) {
    throw new Error("Board not found");
  }

  board.columns.forEach(
    (column: any) => {
      const index =
        column.cards.findIndex(
          (card: any) =>
            card._id.toString() ===
            cardId
        );

      if (index !== -1) {
        column.cards.splice(
          index,
          1
        );
      }
    }
  );

  await board.save();

  return board;
};