import Chat from "./chat.model";

export const createMessage =
async (data: any) => {

  return Chat.create(data);
};

export const getMessages =
async (
  workspaceId: string
) => {

  return Chat.find({
    workspaceId,
  })
  .populate("senderId")
  .sort({
    createdAt: 1,
  });
};