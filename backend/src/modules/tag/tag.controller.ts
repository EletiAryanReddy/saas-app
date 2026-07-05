import { Request, Response } from "express";

import {
 createTag,
 getWorkspaceTags,
 getTagById,
 updateTag,
 deleteTag
}
from "./tag.service";

export const createTagController =
async(req:Request,res:Response)=>{

 try{

  const tag =
  await createTag(req.body);

  res.json({
   success:true,
   tag
  });

 }catch(error){

  res.status(500).json({
   success:false,
   message:"Create Tag Failed"
  });

 }

};

export const getTagsController =
async(req:Request,res:Response)=>{

 const tags =
 await getWorkspaceTags(
  String(req.params.workspaceId)
 );

 res.json(tags);

};

export const getTagController =
async(req:Request,res:Response)=>{

 const tag =
 await getTagById(
  String(req.params.tagId)
 );

 res.json(tag);

};

export const updateTagController =
async(req:Request,res:Response)=>{

 const tag =
 await updateTag(
  String(req.params.tagId),
  req.body
 );

 res.json({
  success:true,
  tag
 });

};

export const deleteTagController =
async(req:Request,res:Response)=>{

 await deleteTag(
  String(req.params.tagId)
 );

 res.json({
  success:true,
  message:"Tag Deleted"
 });

};
