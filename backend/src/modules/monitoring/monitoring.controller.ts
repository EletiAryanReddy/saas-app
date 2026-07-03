import { Request, Response } from "express";

import {
createMonitoringRecord,
getWorkspaceMonitoring,
getMonitoringById,
updateMonitoring,
deleteMonitoring,
getLatestHealth,
getApiUsage,
getErrorLogs,
getMonitoringStats
} from "./monitoring.service";

export const createMonitoringController =
async (
req: Request,
res: Response
) => {

try {

const monitoring =
await createMonitoringRecord(
  req.body
);

res.json({
  success: true,
  monitoring
});

} catch (error) {

console.log(error);

res.status(500).json({
  success: false,
  message:
  "Failed To Create Monitoring Record"
});

}

};

export const getWorkspaceMonitoringController =
async (
req: Request,
res: Response
) => {

try {

const monitoring =
await getWorkspaceMonitoring(
  req.params.workspaceId
);

res.json(monitoring);

} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Fetch Monitoring Records"
});

}

};

export const getMonitoringController =
async (
req: Request,
res: Response
) => {

try {

const monitoring =
await getMonitoringById(
  req.params.monitoringId
);

if (!monitoring) {

  return res.status(404).json({
    success: false,
    message:
    "Monitoring Record Not Found"
  });

}

res.json(monitoring);


} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Fetch Monitoring Record"
});

}

};

export const updateMonitoringController =
async (
req: Request,
res: Response
) => {

try {

const monitoring =
await updateMonitoring(
  req.params.monitoringId,
  req.body
);

if (!monitoring) {

  return res.status(404).json({
    success: false,
    message:
    "Monitoring Record Not Found"
  });

}

res.json({
  success: true,
  monitoring
});

} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Update Monitoring Record"
});

}

};

export const deleteMonitoringController =
async (
req: Request,
res: Response
) => {

try {

const monitoring =
await deleteMonitoring(
  req.params.monitoringId
);

if (!monitoring) {

  return res.status(404).json({
    success: false,
    message:
    "Monitoring Record Not Found"
  });

}

res.json({
  success: true,
  message:
  "Monitoring Record Deleted Successfully"
});

} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Delete Monitoring Record"
});

}

};

export const getLatestHealthController =
async (
req: Request,
res: Response
) => {

try {

const health =
await getLatestHealth(
  req.params.workspaceId
);

res.json(health);

} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Fetch Health Data"
});

}

};

export const getApiUsageController =
async (
req: Request,
res: Response
) => {

try {

const usage =
await getApiUsage(
  req.params.workspaceId
);

res.json(usage);

} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Fetch API Usage"
});

}

};

export const getErrorLogsController =
async (
req: Request,
res: Response
) => {

try {

const logs =
await getErrorLogs(
  req.params.workspaceId
);

res.json(logs);
} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Fetch Error Logs"
});
}

};

export const getMonitoringStatsController =
async (
req: Request,
res: Response
) => {

try {
const stats =
await getMonitoringStats(
  req.params.workspaceId
);

res.json(stats);


} catch (error) {

res.status(500).json({
  success: false,
  message:
  "Failed To Fetch Monitoring Stats"
});


}

};
