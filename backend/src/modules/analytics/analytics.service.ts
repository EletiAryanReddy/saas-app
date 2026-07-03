import Member from "../member/member.model";
import Board from "../board/board.model";
import File from "../file/file.model";
import Meeting from "../meeting/meeting.model";
import Calendar from "../calendar/calendar.model";
import Chat from "../chat/chat.model";

export const getWorkspaceAnalytics =
async (workspaceId: string) => {

  const totalMembers =
    await Member.countDocuments({
      workspaceId
    });

  const totalBoards =
    await Board.countDocuments({
      workspaceId
    });

  const uploadedFiles =
    await File.countDocuments({
      workspaceId
    });

  const totalMeetings =
    await Meeting.countDocuments({
      workspaceId
    });

  const totalEvents =
    await Calendar.countDocuments({
      workspaceId
    });

  const totalMessages =
    await Chat.countDocuments({
      workspaceId
    });

  return {
    totalMembers,
    totalBoards,
    uploadedFiles,
    totalMeetings,
    totalEvents,
    totalMessages
  };
};

export const getTaskAnalytics =
async (workspaceId: string) => {

  const boards =
    await Board.find({
      workspaceId
    });

  let todo = 0;
  let inProgress = 0;
  let done = 0;

  boards.forEach((board: any) => {

    board.columns.forEach(
      (column: any) => {

        if (
          column.title
            .toLowerCase()
            .includes("todo")
        ) {
          todo += column.cards.length;
        }

        if (
          column.title
            .toLowerCase()
            .includes("progress")
        ) {
          inProgress +=
            column.cards.length;
        }

        if (
          column.title
            .toLowerCase()
            .includes("done")
        ) {
          done +=
            column.cards.length;
        }

      }
    );

  });

  return {
    todo,
    inProgress,
    done
  };
};