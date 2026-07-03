export interface CreateNotificationDTO {
  userId: string;
  workspaceId: string;

  title: string;
  message: string;

  type:
    | "task"
    | "chat"
    | "meeting"
    | "file"
    | "mention"
    | "system";
}