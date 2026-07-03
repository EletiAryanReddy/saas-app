import Board from "../board/board.model";
import File from "../file/file.model";
import Member from "../member/member.model";
import Meeting from "../meeting/meeting.model";
import Calendar from "../calendar/calendar.model";

export const globalSearch = async (
  workspaceId: string,
  query: string
) => {

  const regex = new RegExp(query, "i");

  const tasks = await Board.find({
    workspaceId,
    title: regex
  });

  const files = await File.find({
    workspaceId,
    name: regex
  });

  const members = await Member.find({
    workspaceId
  }).populate("userId");

  const meetings = await Meeting.find({
    workspaceId,
    title: regex
  });

  const events = await Calendar.find({
    workspaceId,
    title: regex
  });

  return {
    tasks,
    files,
    members,
    meetings,
    events
  };
};