
import { Request, Response, NextFunction } from "express";

import Monitoring from "./monitoring.model";

export const monitoringMiddleware =
async (
req: Request,
res: Response,
next: NextFunction
) => {

const startTime =
Date.now();

const originalSend =
res.send;

res.send = function (
body?: any
): Response {

const responseTime =
Date.now() - startTime;

const workspaceId =
req.body.workspaceId ||
req.params.workspaceId ||
null;

if (workspaceId) {

  Monitoring.create({

    workspaceId,

    cpuUsage: 0,

    memoryUsage: 0,

    storageUsage: 0,

    activeUsers: 0,

    apiRequests: 1,

    errorCount:
    res.statusCode >= 400
    ? 1
    : 0,

    endpoint:
    req.originalUrl,

    method:
    req.method,

    statusCode:
    res.statusCode,

    responseTime

  })
  .catch(
    (error)=>{

      console.log(
        "Monitoring Error:",
        error
      );

    }
  );

}

return originalSend.call(
  this,
  body
);

};

next();

};



