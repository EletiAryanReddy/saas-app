import {
  getWorkspaceAnalytics,
  getTaskAnalytics
} from "./analytics.service";

export const workspaceAnalytics =
async (req, res) => {

  try {

    const data =
      await getWorkspaceAnalytics(
        req.params.workspaceId
      );

    res.json(data);

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Workspace Analytics Error"
    });

  }

};

export const taskAnalytics =
async (req, res) => {

  try {

    const data =
      await getTaskAnalytics(
        req.params.workspaceId
      );

    res.json(data);

  } catch (error) {

    res.status(500).json({
      success: false,
      message:
        "Task Analytics Error"
    });

  }

};