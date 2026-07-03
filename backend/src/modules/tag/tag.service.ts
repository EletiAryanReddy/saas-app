import Tag from "./tag.model";

export const createTag =
async(data:any)=>{
 return Tag.create(data);
};

export const getWorkspaceTags =
async(workspaceId:string)=>{
 return Tag.find({
  workspaceId
 }).sort({
  createdAt:-1
 });
};

export const getTagById =
async(id:string)=>{
 return Tag.findById(id);
};

export const updateTag =
async(
 id:string,
 data:any
)=>{
 return Tag.findByIdAndUpdate(
  id,
  data,
  {
   new:true
  }
 );
};

export const deleteTag =
async(id:string)=>{
 return Tag.findByIdAndDelete(id);
};