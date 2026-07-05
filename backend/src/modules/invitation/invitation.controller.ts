import { Request,Response }
from "express";

import {
 createInvitation,
 getWorkspaceInvitations,
 acceptInvitation,
 rejectInvitation,
 deleteInvitation
}
from "./invitation.service";

import {
 sendInviteMail
}
from "./invitation.mail";

export const createInvitationController =
async(req:Request,res:Response)=>{

 try{

  const invitation =
  await createInvitation(
   req.body
  );

  await sendInviteMail(
   req.body.email,
   req.body.workspaceId
  );

  res.json({
   success:true,
   invitation
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:"Invitation Failed"
  });

 }

};

export const getInvitationsController =
async(req:Request,res:Response)=>{

 const invitations =
 await getWorkspaceInvitations(
  String(req.params.workspaceId)
 );

 res.json(invitations);

};

export const acceptInvitationController =
async(req:Request,res:Response)=>{

 const invitation =
 await acceptInvitation(
  String(req.params.inviteId)
 );

 res.json({
  success:true,
  invitation
 });

};

export const rejectInvitationController =
async(req:Request,res:Response)=>{

 const invitation =
 await rejectInvitation(
  String(req.params.inviteId)
 );

 res.json({
  success:true,
  invitation
 });

};

export const deleteInvitationController =
async(req:Request,res:Response)=>{

 await deleteInvitation(
  String(req.params.inviteId)
 );

 res.json({
  success:true
 });

};
