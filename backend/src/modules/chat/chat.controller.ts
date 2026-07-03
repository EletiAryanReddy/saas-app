import {
  createMessage,
  getMessages,
} from "./chat.service";

import {
  getIO,
} from "../../services/socket/socket.service";

export const sendMessageController =
async (req: any, res: any) => {

  const message =
    await createMessage(
      req.body
    );

  getIO()
    .to(req.body.workspaceId)
    .emit(
      "new-message",
      message
    );

  res.json(message);
};

export const getMessagesController =
async (req: any, res: any) => {

  const messages =
    await getMessages(
      req.params.workspaceId
    );

  res.json(messages);
};