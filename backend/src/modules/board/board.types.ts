export interface Card {
  title: string;
  description: string;
  priority: string;
  assignedTo?: string;
}

export interface Column {
  title: string;
  cards: Card[];
}

export interface Board {
  workspaceId: string;
  title: string;
  columns: Column[];
}