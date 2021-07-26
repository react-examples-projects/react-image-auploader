import { useEffect, useMemo } from "react";
import ImagesContext from "./ImagesContext";
import useImageReducer from "../../Hooks/HooksStore/useImageReducer";
import useImages from "../../Hooks/useImages";

export default function ImagesProvider({ children }) {
  // it's necessary extract `setImages` to keep the state updated from backend
  const { state, setImages, addImage, removeImage, addComment, removeComment, editComment } =
    useImageReducer();

  const { images, isLoading, isError } = useImages();

  const value = useMemo(
    () => ({
      ...state,
      setImages,
      addImage,
      removeImage,
      addComment,
      removeComment,
      editComment,
    }),
    [state, setImages, addImage, removeImage, addComment, removeComment, editComment]
  );
  
  useEffect(() => {
    if (images.length) setImages({ data: images, isLoading, isError });
  }, [images, isLoading, isError, setImages]);

  return <ImagesContext.Provider {...{ value, children }} />;
}
