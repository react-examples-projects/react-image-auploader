import { useReducer, useCallback } from "react";
import InitialState from "../../Store/Store";
// reducers
import ImagesReducer from "../../Store/Reducers/Images/ImagesReducer";
import {
  setImagesAction,
  addImageAction,
  addCommentImages,
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
    dispatch(addCommentImages(comment));
  }, []);

  return { state, dispatch, setImages, addImage, addComment };
}
