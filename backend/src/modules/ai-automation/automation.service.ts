import Automation from "./automation.model";

import Report from "../report/report.model";
import Notification from "../notification/notification.model";
import Calendar from "../calendar/calendar.model";

export const createAutomation =
async(data:any)=>{

return await Automation.create(
data
);

};

export const getWorkspaceAutomations =
async(workspaceId:string)=>{

return await Automation.find({
workspaceId
}).sort({
createdAt:-1
});

};

export const getAutomationById =
async(id:string)=>{

return await Automation.findById(
id
);

};

export const updateAutomation =
async(
automationId:string,
updateData:any
)=>{

return await Automation.findByIdAndUpdate(
automationId,
updateData,
{
returnDocument:"after"
}
);

};

export const deleteAutomation =
async(id:string)=>{

return await Automation.findByIdAndDelete(
id
);

};

export const runAutomation =
async(id:string)=>{

const automation =
await Automation.findById(id);

if(!automation){

throw new Error(
  "Automation not found"
);
}

switch(
automation.action
){

case "GENERATE_REPORT":

  await Report.create({

    workspaceId:
    automation.workspaceId,

    type:"TASK",

    data:{
      generatedBy:
      "AUTOMATION"
    }

  });

  break;

case "SEND_NOTIFICATION":

  await Notification.create({

    workspaceId:
    automation.workspaceId,

    title:
    "Automation Notification",

    message:
    automation.name

  });

  break;

case "CREATE_EVENT":

  await Calendar.create({

    workspaceId:
    automation.workspaceId,

    title:
    "Automated Event",

    description:
    automation.name,

    startDate:
    new Date(),

    endDate:
    new Date()

  });

  break;

default:

  console.log(
    "No Action Executed"
  );
}

return {
success:true,
message:
"Automation Executed"
};

};

export const getAutomationLogs =
async(id:string)=>{

return [

{
  automationId:id,
  status:"SUCCESS",
  message:
  "Executed Successfully",
  executedAt:
  new Date()
}
];

};
