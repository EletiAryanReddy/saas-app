import { Request, Response } from "express";

import {
createAutomation,
getWorkspaceAutomations,
getAutomationById,
updateAutomation,
deleteAutomation,
runAutomation,
getAutomationLogs
} from "./automation.service";

export const createAutomationController =
async(req:Request,res:Response)=>{

try{

const automation =
await createAutomation(
  req.body
);

res.json({
  success:true,
  automation
});

}catch(error){

res.status(500).json({
  success:false,
  message:"Automation Creation Failed"
});

}

};

export const getWorkspaceAutomationsController =
async(req:Request,res:Response)=>{

const automations =
await getWorkspaceAutomations(
req.params.workspaceId
);

res.json(automations);

};

export const getAutomationController =
async(req:Request,res:Response)=>{

const automation =
await getAutomationById(
req.params.automationId
);

res.json(automation);

};

export const updateAutomationController =
async(req:Request,res:Response)=>{

const automation =
await updateAutomation(
req.params.automationId,
req.body
);

res.json({
success:true,
automation
});

};

export const deleteAutomationController =
async(req:Request,res:Response)=>{

await deleteAutomation(
req.params.automationId
);

res.json({
success:true
});

};

export const runAutomationController =
async(req:Request,res:Response)=>{

const result =
await runAutomation(
req.params.automationId
);

res.json(result);

};

export const getAutomationLogsController =
async(req:Request,res:Response)=>{

const logs =
await getAutomationLogs(
req.params.automationId
);

res.json(logs);

};

