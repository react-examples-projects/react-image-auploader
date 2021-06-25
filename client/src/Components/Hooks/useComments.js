import { createComment } from "../../Helpers/api";
import { useMutation } from "react-query";
import { useState } from "react";
import useImages from "./HooksStore/useImages";

export default function useComments(commentsImage) {
  const createCommentImage = useMutation((payload) => createComment(payload));
  const [comments, setComments] = useState(commentsImage);
  const { addComment: addCommentInImages } = useImages();
  const addComment = (imageId, comment) => {
    setComments((c) => [comment, ...c]);
    
    // Add the new comment in the global context
    addCommentInImages({ imageId, ...comment });
  };

  return {
    comments,
    setComments,
    addComment,
    createCommentImage,
  };
}
