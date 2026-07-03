export interface AIRequest {
  prompt: string;
  workspaceId?: string;
  userId?: string;
}

export interface AIResponse {
  response: string;
}