import Types from "../../Actions/Types/Images";

export default function ImagesReducer(state, action) {
  let imagesUpdated;

  switch (action.type) {
    case Types.ADD_IMAGE:
      return {
        ...state,
        images: {
          ...state.images,
          data: [action.payload, ...state.images.data],
        },
      };

    case Types.REMOVE_IMAGE:
      imagesUpdated = state.images.data.filter(
        (image) => image._id !== action.payload
      );
      return {
        ...state,
        images: {
          ...state.images,
          data: imagesUpdated,
        },
      };

    case Types.SET_IMAGES:
      return {
        ...state,
        images: action.payload,
      };

    case Types.ADD_COMMENT_IMAGES:
      imagesUpdated = state.images.data.map((image) => {
        // search the post image to add the comment
        if (action.payload.imageId === image._id) {
          // Add comment to the specific image
          delete action.payload.imageId;
          image.comments = [...image.comments, action.payload];
        }
        return image;
      });
      return {
        ...state,
        images: {
          ...state.images,
          data: imagesUpdated,
        },
      };

    case Types.REMOVE_COMMENT_IMAGES:
      const { imageId, commentId } = action.payload;
      imagesUpdated = state.images.data.map((image) => {
        // search the post image to edit the comments
        if (imageId === image._id) {
          // Save all comments except the comment to delete
          image.comments = image.comments.filter(
            (comment) => commentId !== comment._id
          );
        }
        return image;
      });
      return {
        ...state,
        images: {
          ...state.images,
          data: imagesUpdated,
        },
      };

    case Types.EDIT_COMMENT_IMAGES:
      imagesUpdated = state.images.data.map((image) => {
        // search the post image to remove the comment
        if (action.payload.imageId === image._id) {
          // Remove comment to the specific image
          delete action.payload.imageId;
          image.comments = image.comments.map((comment) => {
            // search the comment to modify the content
            if (comment._id === action.payload.commentId) {
              comment.content = action.payload.commentContent;
            }
            return comment;
          });
        }
        return image;
      });
      return {
        ...state,
      };

    default:
      return state;
  }
}
