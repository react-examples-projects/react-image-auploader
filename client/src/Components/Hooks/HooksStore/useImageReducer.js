import { useReducer, useCallback } from "react";
import InitialState from "../../Store/Store";
// reducers
import ImagesReducer from "../../Store/Reducers/Images/ImagesReducer";
import {
  setImagesAction,
  addImageAction,
  toggleFavoriteImageAction,
  setFavoriteImagesAction,
  removeImageAction,
  removeFavoriteImagesAction,
  updateImageAction,
  addCommentImagesAction,
  removeCommentImagesAction,
  searchImagesAction,
  editCommentImagesAction,
} from "../../Store/Actions/ImagesActions";

export default function useImageReducer() {
  const [state, dispatch] = useReducer(ImagesReducer, InitialState);

  const setImages = useCallback((_images) => {
    dispatch(setImagesAction(_images));
  }, []);

  const setFavoriteImages = useCallback((_images) => {
    dispatch(setFavoriteImagesAction(_images));
  }, []);

  const removeFavoriteImage = useCallback((id) => {
    dispatch(removeFavoriteImagesAction(id));
  }, []);

  const addImage = useCallback((_image) => {
    dispatch(addImageAction(_image));
  }, []);

  const toggleFavoriteImage = useCallback((imageId) => {
    dispatch(toggleFavoriteImageAction(imageId));
  }, []);

  const removeImage = useCallback((id) => {
    dispatch(removeImageAction(id));
  }, []);

  const updateImage = useCallback(({ imageId, title, tags }) => {
    dispatch(updateImageAction({ imageId, title, tags }));
  }, []);

  const searchImages = useCallback((search) => {
    dispatch(searchImagesAction(search));
  }, []);

  const addComment = useCallback((comment) => {
    dispatch(addCommentImagesAction(comment));
  }, []);

  const removeComment = useCallback(({ imageId, commentId }) => {
    dispatch(removeCommentImagesAction({ imageId, commentId }));
  }, []);

  const editComment = useCallback(({ imageId, commentId, commentContent }) => {
    dispatch(editCommentImagesAction({ imageId, commentId, commentContent }));
  }, []);

  return {
    state,
    setImages,
    setFavoriteImages,
    addImage,
    toggleFavoriteImage,
    removeImage,
    removeFavoriteImage,
    updateImage,
    searchImages,
    addComment,
    removeComment,
    editComment,
  };
}
