import { Request, Response }
from "express";

import {
 createProject,
 getWorkspaceProjects,
 getProjectById,
 updateProject,
 deleteProject
}
from "./project.service";

export const createProjectController =
async(req:Request,res:Response)=>{

 const project =
 await createProject(
  req.body
 );

 res.json({
  success:true,
  project
 });

};

export const getProjectsController =
async(req:Request,res:Response)=>{

 const projects =
 await getWorkspaceProjects(
  req.params.workspaceId
 );

 res.json(projects);

};

export const getProjectController =
async(req:Request,res:Response)=>{

 const project =
 await getProjectById(
  req.params.projectId
 );

 res.json(project);

};

export const updateProjectController =
async(req:Request,res:Response)=>{

 const project =
 await updateProject(
  req.params.projectId,
  req.body
 );

 res.json({
  success:true,
  project
 });

};

export const deleteProjectController =
async(req:Request,res:Response)=>{

 await deleteProject(
  req.params.projectId
 );

 res.json({
  success:true,
  message:"Project Deleted"
 });

};