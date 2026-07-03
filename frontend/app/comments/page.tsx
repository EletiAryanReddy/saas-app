"use client";

import { useEffect, useState } from "react";

import CommentBox from "@/components/comment/CommentBox";

import {
  getComments,
  createComment,
} from "@/services/api/comment.service";

export default function CommentsPage() {

  const [comments, setComments] =
    useState<any[]>([]);

  const entityId =
    "6a2e74daeecaff530e8d2003";

  const workspaceId =
    "6a2c2c86bd54aa6fdf34690a";

  const userId =
    "6a2c2bf8bd54aa6fdf346908";

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {

    try {

      const res =
        await getComments(
          entityId
        );

      setComments(
        res.data
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleAddComment =
    async (
      commentText: string
    ) => {

      if (!commentText.trim())
        return;

      try {

        await createComment({
          workspaceId,
          userId,
          entityId,
          entityType: "TASK",
          comment: commentText,
        });

        loadComments();

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="p-6">

      <h1 className="text-2xl font-bold mb-4">
        Comments
      </h1>

      <CommentBox
        comments={comments}
        onAdd={handleAddComment}
      />

    </div>

  );

}