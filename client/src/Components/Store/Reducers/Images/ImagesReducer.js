import { normalizeString } from "../../../../Helpers/utils";
import Types from "../../Actions/Types/Images";

export default function ImagesReducer(state, { type, payload }) {
  const { images } = state;
  const { favorites } = images;
  let imagesUpdated, favoriteImagesUpdated;

  switch (type) {
    case Types.ADD_IMAGE:
      return {
        ...state,
        images: {
          ...images,
          data: [payload, ...images.data],
        },
      };

    case Types.TOGGLE_FAVORITE_IMAGE:
      const isFavorite = favorites.some((img) => img._id === payload);
      const favoriteImage = images.data.find((img) => img._id === payload);
      favoriteImagesUpdated = favorites.filter((img) => img._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          favorites: isFavorite
            ? favoriteImagesUpdated
            : [favoriteImage, ...favorites],
        },
      };

    case Types.REMOVE_FAVORITE_IMAGE:
      favoriteImagesUpdated = favorites.filter((img) => img._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          favorites: favoriteImagesUpdated,
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

    case Types.UPDATE_IMAGE:
      imagesUpdated = images.data.map((image) => {
        if (image._id === payload.imageId) {
          console.log(payload);
          delete payload.imageId;
          return {
            ...image,
            ...payload,
          };
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

    case Types.SEARCH_IMAGES:
      const searchText = normalizeString(payload.toLowerCase());
      const foundImages = images.data.filter((imgs) =>
        normalizeString(imgs.title.toLowerCase()).includes(searchText)
      );
      return {
        ...state,
        images: {
          ...images,
          foundSearches: searchText.length > 0 ? foundImages : [],
          searchText,
        },
      };

    case Types.SET_IMAGES:
      return {
        ...state,
        images: {
          ...images,
          ...payload,
        },
      };

    case Types.SET_FAVORITE_IMAGES:
      return {
        ...state,
        images: {
          ...images,
          favorites: payload,
        },
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
