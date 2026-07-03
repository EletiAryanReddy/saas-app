import Board from "../board/board.model";
import File from "../file/file.model";
import Activity from "../activity/activity.model";
import Notification from "../notification/notification.model";

export const getDashboardStats = async (
  workspaceId: string
) => {

  const boards = await Board.find({
    workspaceId,
  });

  const files = await File.countDocuments({
    workspaceId,
  });

  const activities =
    await Activity.countDocuments({
      workspaceId,
    });

  const notifications =
    await Notification.countDocuments({
      workspaceId,
    });

  let totalCards = 0;

  boards.forEach((board: any) => {
    board.columns.forEach(
      (column: any) => {
        totalCards +=
          column.cards.length;
      }
    );
  });

  return {
    totalBoards:
      boards.length,

    totalCards,

    totalFiles:
      files,

    totalActivities:
      activities,

    totalNotifications:
      notifications,
  };
};