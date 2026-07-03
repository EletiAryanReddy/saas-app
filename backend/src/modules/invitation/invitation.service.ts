import Invitation from "./invitation.model";

export const createInvitation =
async(data:any)=>{
 return Invitation.create(data);
};

export const getWorkspaceInvitations =
async(workspaceId:string)=>{
 return Invitation.find({
  workspaceId
 }).sort({
  createdAt:-1
 });
};

export const acceptInvitation =
async(id:string)=>{

 return Invitation.findByIdAndUpdate(
  id,
  {
   status:"ACCEPTED"
  },
  {
   new:true
  }
 );

};

export const rejectInvitation =
async(id:string)=>{

 return Invitation.findByIdAndUpdate(
  id,
  {
   status:"REJECTED"
  },
  {
   new:true
  }
 );

};

export const deleteInvitation =
async(id:string)=>{
 return Invitation.findByIdAndDelete(id);
};