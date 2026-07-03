export interface Card {
  _id: string;
  title: string;
  description: string;
  priority: "Low" | "Medium" | "High";
  assignedTo?: string;
}

export interface Column {
  _id: string;
  title: string;
  cards: Card[];
}

export interface Board {
  _id: string;
  workspaceId: string;
  title: string;
  columns: Column[];
}