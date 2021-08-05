import { normalizeString } from "../../../../Helpers/utils";
import {
  ADD_IMAGE,
  REMOVE_IMAGE,
  UPDATE_IMAGE,
  SEARCH_IMAGES,
  SET_IMAGES,
  ADD_COMMENT_IMAGES,
  REMOVE_COMMENT_IMAGES,
  EDIT_COMMENT_IMAGES,
} from "../../Actions/Types/Images";

import {
  TOGGLE_FAVORITE_IMAGE,
  SET_FAVORITE_IMAGES,
  REMOVE_FAVORITE_IMAGE,
  UPDATE_FAVORITE_IMAGE,
  ADD_COMMENT_FAVORITE_IMAGES,
  REMOVE_COMMENT_FAVORITE_IMAGES,
  EDIT_COMMENT_FAVORITE_IMAGES,
} from "../../Actions/Types/FavoriteImages";

export default function ImagesReducer(state, { type, payload }) {
  console.log(state);
  const { images } = state;
  const { favorites } = images;
  let favoriteImagesUpdated, imagesUpdated;
  let imageId, commentId;

  switch (type) {
    // IMAGE ACTIONS
    case ADD_IMAGE:
      return {
        ...state,
        images: {
          ...images,
          data: [payload, ...images.data],
        },
      };

    case REMOVE_IMAGE:
      imagesUpdated = images.data.filter((image) => image._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          data: imagesUpdated,
        },
      };

    case UPDATE_IMAGE:
      imagesUpdated = images.data.map((image) => {
        if (image._id === payload.imageId) {
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

    case SEARCH_IMAGES:
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

    case SET_IMAGES:
      return {
        ...state,
        images: {
          ...images,
          ...payload,
        },
      };

    case ADD_COMMENT_IMAGES:
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

    case REMOVE_COMMENT_IMAGES:
      ({ imageId, commentId } = payload);
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

    case EDIT_COMMENT_IMAGES:
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
        images: {
          ...images,
          data: imagesUpdated,
        },
      };

    // FAVORITE IMAGES ACTIONS
    case SET_FAVORITE_IMAGES:
      return {
        ...state,
        images: {
          ...images,
          favorites: payload,
        },
      };

    case TOGGLE_FAVORITE_IMAGE:
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

    case REMOVE_FAVORITE_IMAGE:
      favoriteImagesUpdated = favorites.filter((img) => img._id !== payload);
      return {
        ...state,
        images: {
          ...images,
          favorites: favoriteImagesUpdated,
        },
      };

    case UPDATE_FAVORITE_IMAGE:
      favoriteImagesUpdated = favorites.map((image) => {
        if (image._id === payload.imageId) {
          return { ...image, ...payload };
        }
        return image;
      });
      return {
        ...state,
        images: {
          ...images,
          favorites: favoriteImagesUpdated,
        },
      };

    case ADD_COMMENT_FAVORITE_IMAGES:
      console.log(payload);
      favoriteImagesUpdated = favorites.map((image) => {
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
          favorites: favoriteImagesUpdated,
        },
      };

    case REMOVE_COMMENT_FAVORITE_IMAGES:
      ({ imageId, commentId } = payload);
      favoriteImagesUpdated = favorites.map((image) => {
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
          favorites: favoriteImagesUpdated,
        },
      };

    case EDIT_COMMENT_FAVORITE_IMAGES:
      favoriteImagesUpdated = favorites.map((image) => {
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
        images: {
          ...images,
          favorites: favoriteImagesUpdated,
        },
      };

    default:
      return state;
  }
}
