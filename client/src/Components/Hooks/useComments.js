import { createComment } from "../../Helpers/api";
import { useMutation } from "react-query";
import { useState } from "react";
import useImages from "./HooksStore/useImages";

/**
 * Manage the comments of a post image
 * @param {Array.<Object>} commentsImage The image comments
 * @returns {Object} The functions to manage the comments
 */
export default function useComments(commentsImage) {
  const createCommentImage = useMutation((payload) => createComment(payload));
  const [comments, setComments] = useState(commentsImage);
  const {
    addComment: _addComment,
    removeComment: _removeComment,
    editComment: _editComment,
  } = useImages();

  const addComment = (imageId, comment) => {
    setComments((c) => [comment, ...c]);

    // Add the new comment in the global context
    _addComment({ imageId, ...comment });
  };

  const removeComment = (imageId, commentId) => {
    setComments((c) => c.filter((comment) => comment._id !== commentId));

    // Remove in the comment in the global context
    _removeComment({ imageId, commentId });
  };

  const editComment = ({ imageId, commentId, commentContent }) => {
    setComments((c) =>
      c.map((comment) => {
        if (comment._id === commentId) {
          comment.content = commentContent;
        }
        return comment;
      })
    );
    // Edit comment of the post image in the global context
    _editComment({ imageId, commentId, commentContent });
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
