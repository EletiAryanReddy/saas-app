import { Request, Response } from "express";
import Meeting from "./meeting.model";

export const createMeeting = async (
  req: Request,
  res: Response
) => {
  try {
    const meeting =
      await Meeting.create(req.body);

    res.status(201).json(meeting);
  } catch (err) {
    res.status(500).json({
      message: "Meeting creation failed",
    });
  }
};

export const getWorkspaceMeetings =
  async (
    req: Request,
    res: Response
  ) => {
    const meetings =
      await Meeting.find({
        workspaceId:
          req.params.workspaceId,
      });

    res.json(meetings);
  };

export const getMeetingById =
  async (
    req: Request,
    res: Response
  ) => {
    const meeting =
      await Meeting.findById(
        req.params.meetingId
      );

    res.json(meeting);
  };