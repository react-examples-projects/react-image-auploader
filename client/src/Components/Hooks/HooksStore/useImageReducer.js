import { useReducer, useCallback } from "react";
import InitialState from "../../Store/Store";
import ImagesReducer from "../../Store/Reducers/Images/ImagesReducer";
import {
  setImagesAction,
  addImageAction,
  toggleFavoriteImageAction,
  setFavoriteImagesAction,
  removeImageAction,
  removeFavoriteImagesAction,
  updateImageAction,
  updateFavoriteImagesAction,
  addCommentImagesAction,
  addCommentFavoriteImagesAction,
  removeCommentImagesAction,
  removeCommentFavoriteImagesAction,
  searchImagesAction,
  editCommentImagesAction,
  editCommentFavoriteImagesAction,
} from "../../Store/Actions/ImagesActions";

/**
 * Manage the global state for the images
 * @returns {Object} The object state for the images
 */
export default function useImageReducer() {
  const [state, dispatch] = useReducer(ImagesReducer, InitialState);

  const setImages = useCallback((_images) => {
    dispatch(setImagesAction(_images));
  }, []);

  const setFavoriteImages = useCallback((_images) => {
    dispatch(setFavoriteImagesAction(_images));
  }, []);

  const updateImage = useCallback(({ imageId, title, tags }) => {
    dispatch(updateImageAction({ imageId, title, tags }));
    dispatch(updateFavoriteImagesAction({ imageId, title, tags }));
  }, []);

  const addImage = useCallback((_image) => {
    dispatch(addImageAction(_image));
  }, []);

  const toggleFavoriteImage = useCallback((imageId) => {
    dispatch(toggleFavoriteImageAction(imageId));
  }, []);

  const removeImage = useCallback((id) => {
    dispatch(removeFavoriteImagesAction(id));
    dispatch(removeImageAction(id));
  }, []);

  const searchImages = useCallback((search) => {
    dispatch(searchImagesAction(search));
  }, []);

  const addComment = useCallback(({ content, image_id, user }) => {
    const comment = { content, imageId: image_id, user };
    dispatch(addCommentFavoriteImagesAction(comment));
    dispatch(addCommentImagesAction(comment));
  }, []);

  const removeComment = useCallback(({ imageId, commentId }) => {
    const image = { imageId, commentId };
    dispatch(removeCommentImagesAction(image));
    dispatch(removeCommentFavoriteImagesAction(image));
  }, []);

  const editComment = useCallback(({ imageId, commentId, commentContent }) => {
    const comment = { imageId, commentId, commentContent };
    dispatch(editCommentImagesAction(comment));
    dispatch(editCommentFavoriteImagesAction(comment));
  }, []);

  return {
    ...state,
    setImages,
    setFavoriteImages,
    addImage,
    toggleFavoriteImage,
    removeImage,
    updateImage,
    searchImages,
    addComment,
    removeComment,
    editComment,
  };
}
