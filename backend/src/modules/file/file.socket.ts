import { io }
from "../../services/socket/socket.service";

export const emitFileUpload =
(file: any) => {

  io.to(
    file.workspaceId
  ).emit(
    "file-uploaded",
    file
  );
};