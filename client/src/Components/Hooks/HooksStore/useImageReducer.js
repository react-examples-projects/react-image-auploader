import { useReducer, useCallback } from "react";
import InitialState from "../../Store/Store";
// reducers
import ImagesReducer from "../../Store/Reducers/Images/ImagesReducer";
import {
  setImagesAction,
  addImageAction,
  addCommentImagesAction,
  removeCommentImagesAction,
  editCommentImagesAction,
} from "../../Store/Actions/ImagesActions";

export default function useImageReducer() {
  const [state, dispatch] = useReducer(ImagesReducer, InitialState);

  const setImages = useCallback((_images) => {
    dispatch(setImagesAction(_images));
  }, []);

  const addImage = useCallback((_image) => {
    dispatch(addImageAction(_image));
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
    dispatch,
    setImages,
    addImage,
    addComment,
    removeComment,
    editComment,
  };
}
