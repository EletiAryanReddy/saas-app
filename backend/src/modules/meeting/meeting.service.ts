import Meeting from "./meeting.model";

export const createMeeting = async (
  data: any
) => {
  return await Meeting.create(data);
};

export const getWorkspaceMeetings =
async (workspaceId: string) => {
  return await Meeting.find({
    workspaceId,
  });
};

export const joinMeeting = async (
  meetingId: string,
  userId: string
) => {
  return await Meeting.findByIdAndUpdate(
    meetingId,
    {
      $addToSet: {
        participants: userId,
      },
    },
    { new: true }
  );
};