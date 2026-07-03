import Report from "./report.model";

import Board from "../board/board.model";
import File from "../file/file.model";
import Member from "../member/member.model";
import Meeting from "../meeting/meeting.model";

export const generateWorkspaceReport = async (
  workspaceId: string,
  type: string,
  userId: string
) => {
  let reportData: any = {};

  switch (type) {

    case "TASK":
      reportData = await Board.find({ workspaceId });
      break;

    case "FILE":
      reportData = await File.find({ workspaceId });
      break;

    case "MEMBER":
      reportData = await Member.find({ workspaceId });
      break;

    case "MEETING":
      reportData = await Meeting.find({ workspaceId });
      break;

    default:
      reportData = {};
  }

  const report = await Report.create({
    workspaceId,
    generatedBy: userId,
    type,
    data: reportData,
  });

  return report;
};


export const getReportById = async (
  id: string
) => {
  return await Report.findById(id);
};

export const updateReport = async (
  reportId: string,
  updateData: any
) => {

  return await Report.findByIdAndUpdate(
    reportId,
    updateData,
    {
      new: true
    }
  );

};

export const deleteReport = async (
  reportId: string
) => {
  return await Report.findByIdAndDelete(
    reportId
  );
};

export const getWorkspaceReports = async (
  workspaceId: string
) => {
  return Report.find({ workspaceId })
    .sort({ createdAt: -1 });
};