import Project from "./project.model";

export const createProject =
async(data:any)=>{
 return Project.create(data);
};

export const getWorkspaceProjects =
async(workspaceId:string)=>{
 return Project.find({
  workspaceId
 })
 .populate("members");
};

export const getProjectById =
async(id:string)=>{
 return Project.findById(id)
 .populate("members");
};

export const updateProject =
async(
 id:string,
 data:any
)=>{
 return Project.findByIdAndUpdate(
  id,
  data,
  {new:true}
 );
};

export const deleteProject =
async(id:string)=>{
 return Project.findByIdAndDelete(id);
};