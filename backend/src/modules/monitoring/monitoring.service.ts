
import Monitoring from "./monitoring.model";

export const createMonitoringRecord =
async(data:any)=>{

return await Monitoring.create(
data
);

};

export const getWorkspaceMonitoring =
async(workspaceId:string)=>{

return await Monitoring.find({
workspaceId
})
.sort({
createdAt:-1
});

};

export const getMonitoringById =
async(id:string)=>{

return await Monitoring.findById(
id
);

};

export const updateMonitoring =
async(
monitoringId:string,
updateData:any
)=>{

return await Monitoring.findByIdAndUpdate(
monitoringId,
updateData,
{
returnDocument:"after"
}
);

};

export const deleteMonitoring =
async(id:string)=>{

return await Monitoring.findByIdAndDelete(
id
);

};

export const getLatestHealth =
async(workspaceId:string)=>{

const latest =
await Monitoring.findOne({
workspaceId
})
.sort({
createdAt:-1
});

return latest;

};

export const getApiUsage =
async(workspaceId:string)=>{

const records =
await Monitoring.find({
workspaceId
})
.select(
"apiRequests createdAt"
)
.sort({
createdAt:-1
});

return records;

};

export const getErrorLogs =
async(workspaceId:string)=>{

const records =
await Monitoring.find({
workspaceId,
errorCount:{
$gt:0
}
})
.select(
"errorCount createdAt"
)
.sort({
createdAt:-1
});

return records;

};

export const getMonitoringStats =
async(workspaceId:string)=>{

const records =
await Monitoring.find({
workspaceId
});

const totalRecords =
records.length;

const avgCpuUsage =
totalRecords > 0
?
records.reduce(
(sum:number,item:any)=>
sum + item.cpuUsage,
0
) / totalRecords
: 0;

const avgMemoryUsage =
totalRecords > 0
?
records.reduce(
(sum:number,item:any)=>
sum + item.memoryUsage,
0
) / totalRecords
: 0;

const avgStorageUsage =
totalRecords > 0
?
records.reduce(
(sum:number,item:any)=>
sum + item.storageUsage,
0
) / totalRecords
: 0;

const totalApiRequests =
records.reduce(
(sum:number,item:any)=>
sum + item.apiRequests,
0
);

const totalErrors =
records.reduce(
(sum:number,item:any)=>
sum + item.errorCount,
0
);

return {

totalRecords,

avgCpuUsage:
Number(
  avgCpuUsage.toFixed(2)
),

avgMemoryUsage:
Number(
  avgMemoryUsage.toFixed(2)
),

avgStorageUsage:
Number(
  avgStorageUsage.toFixed(2)
),

totalApiRequests,

totalErrors


};

};
