import { Request, Response } from "express";

import {
  generateWorkspaceReport,
  getWorkspaceReports,
  getReportById,
  updateReport,
  deleteReport
} from "./report.service";

export const generateReportController = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      workspaceId,
      type,
      generatedBy
    } = req.body;

    const report =
      await generateWorkspaceReport(
        workspaceId,
        type,
        generatedBy
      );

    res.json({
      success: true,
      report
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Report Generation Failed"
    });

  }
};

export const getReportsController = async (
  req: Request,
  res: Response
) => {
  try {

    const reports =
      await getWorkspaceReports(
        String(req.params.workspaceId)
      );

    res.json(reports);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed To Fetch Reports"
    });

  }
};

export const getReportController = async (
  req: Request,
  res: Response
) => {

  const report =
    await getReportById(
      String(req.params.reportId)
    );

  res.json(report);

};

export const updateReportController = async (
  req: Request,
  res: Response
) => {

  const report =
    await updateReport(
      String(req.params.reportId),
      req.body
    );

  res.json({
    success: true,
    report
  });

};

export const deleteReportController = async (
  req: Request,
  res: Response
) => {

  await deleteReport(
    String(req.params.reportId)
  );

  res.json({
    success: true,
    message:
      "Report deleted successfully"
  });

};
