import cron from "node-cron";

import Automation from "./automation.model";

import {
runAutomation
}
from "./automation.service";

export const startAutomationScheduler =
()=>{

cron.schedule(
"*/1 * * * *",
async()=>{

const automations =
await Automation.find({
trigger:"SCHEDULE",
isActive:true
});

for(
const automation
of automations
){

try{


await runAutomation(
  automation._id.toString()
);


}catch(error){

console.log(error);

}

}

});

};

