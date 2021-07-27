import {
  createComment,
  deleteComment as deleteCommentApi,
  editComment as editCommentApi,
} from "../../../Helpers/api";
import useImages from "../HooksStore/useImages";
import { useMutation } from "react-query";
import { useState } from "react";

/**
 * Manage the comments of a post image
 * @param {Array.<Object>} commentsImage The image comments
 * @returns {Object} The functions to manage the comments
 */
export default function useComments(commentsImage) {
  const createCommentImage = useMutation((payload) => createComment(payload));
  const [comments, setComments] = useState(commentsImage);
  const images = useImages();

  const addComment = (comment, imageId) => {
    setComments((c) => [comment, ...c]);
    // Add the new comment in the global context
    images.addComment({ imageId, ...comment });
  };

  const removeComment = async (imageId, commentId) => {
    //delete from api
    await deleteCommentApi(commentId);

    setComments((c) => c.filter((comment) => comment._id !== commentId));
    // Remove in the comment in the global context
    images.removeComment({ imageId, commentId });
  };

  const editComment = async ({ imageId, commentId, commentContent }) => {
    // edit from api
    await editCommentApi(commentId, commentContent);

    setComments((c) =>
      c.map((comment) => {
        if (comment._id === commentId) {
          comment.content = commentContent;
        }
        return comment;
      })
    );
    // Edit comment of the post image in the global context
    images.editComment({ imageId, commentId, commentContent });
  };
  return {
    comments,
    setComments,
    addComment,
    removeComment,
    createCommentImage,
    editComment,
  };
}
