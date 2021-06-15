import { createComment } from "../../Helpers/api";
import { useMutation } from "react-query";
import { useState } from "react";

export default function useComments(commentsImage) {
  const createCommentImage = useMutation((payload) => createComment(payload));
  const [comments, setComments] = useState(commentsImage);
  const addComment = (comment) => {
    setComments((c) => [comment, ...c]);
  };
  return {
    comments,
    setComments,
    addComment,
    createCommentImage,
  };
}
