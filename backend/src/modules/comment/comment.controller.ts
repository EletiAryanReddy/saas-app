import { Request, Response }
from "express";

import {
 createComment,
 getComments,
 updateComment,
 deleteComment
}
from "./comment.service";
export const createCommentController =
async (req: Request, res: Response) => {

 try {

  const comment =
   await createComment(req.body);

  res.json({
   success: true,
   comment
  });

 } catch (error: any) {

  console.log("COMMENT ERROR:");
  console.log(error);

  res.status(500).json({
   success: false,
   message: error.message
  });

 }

};

export const getCommentsController =
async(
 req:Request,
 res:Response
)=>{

 const comments =
 await getComments(
  req.params.entityId
 );

 res.json(comments);

};


export const updateCommentController =
async (req, res) => {

  try {

    const updated =
      await updateComment(
        req.params.id,
        req.body.comment
      );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Comment not found"
      });
    }

    res.json({
      success: true,
      comment: updated
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Update failed"
    });

  }

};

export const deleteCommentController =
async(
 req:Request,
 res:Response
)=>{

 await deleteComment(
  req.params.id
 );

 res.json({
  success:true,
  message:"Comment Deleted"
 });

};