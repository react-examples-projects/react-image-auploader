import { normalizeString } from "../../../../Helpers/utils";
import Types from "../../Actions/Types/Images";

export default function ImagesReducer(state, { type, payload }) {
  const { images } = state;
  let imagesUpdated;

  switch (type) {
    case Types.ADD_IMAGE:
      return {
        ...state,
        images: {
          ...images,
          data: [payload, ...images.data],
        },
      };

    case Types.REMOVE_IMAGE:
      imagesUpdated = images.data.filter((image) => image._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          data: imagesUpdated,
        },
      };

    case Types.SEARCH_IMAGES: {
      const searchText = normalizeString(payload.toLowerCase());
      const foundImages = images.data.filter((imgs) =>
        normalizeString(imgs.title.toLowerCase()).includes(searchText)
      );
      return {
        ...state,
        images: {
          ...images,
          foundSearches: searchText.length > 0 ? foundImages : [],
        },
      };
    }

    case Types.SET_IMAGES:
      return {
        ...state,
        images: payload,
      };

    case Types.ADD_COMMENT_IMAGES:
      imagesUpdated = images.data.map((image) => {
        // search the post image to add the comment
        if (payload.imageId === image._id) {
          // Add comment to the specific image
          delete payload.imageId;
          image.comments = [...image.comments, payload];
        }
        return image;
      });
      return {
        ...state,
        images: {
          ...images,
          data: imagesUpdated,
        },
      };

    case Types.REMOVE_COMMENT_IMAGES:
      const { imageId, commentId } = payload;
      imagesUpdated = images.data.map((image) => {
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
          ...images,
          data: imagesUpdated,
        },
      };

    case Types.EDIT_COMMENT_IMAGES:
      imagesUpdated = images.data.map((image) => {
        // search the post image to remove the comment
        if (payload.imageId === image._id) {
          // Remove comment to the specific image
          delete payload.imageId;
          image.comments = image.comments.map((comment) => {
            // search the comment to modify the content
            if (comment._id === payload.commentId) {
              comment.content = payload.commentContent;
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
