import { useEffect, useMemo } from "react";
import ImagesContext from "./ImagesContext";
import useImageReducer from "../../Hooks/HooksStore/useImageReducer";
import useImages from "../../Hooks/images/useImages";
import useFavoriteImages from "../../Hooks/images/useFavoriteImages";

export default function ImagesProvider({ children }) {
  // it's necessary extract `setImages` to keep the state updated from backend
  const {
    state,
    setImages,
    setFavoriteImages,
    addImage,
    toggleFavoriteImage,
    removeImage,
    searchImages,
    addComment,
    removeComment,
    updateImage,
    editComment,
  } = useImageReducer();

  const { images, isLoading, isError } = useImages();
  const { favoriteImages } = useFavoriteImages();

  const value = useMemo(
    () => ({
      ...state,
      setImages,
      setFavoriteImages,
      addImage,
      toggleFavoriteImage,
      searchImages,
      removeImage,
      updateImage,
      addComment,
      removeComment,
      editComment,
    }),
    [
      state,
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
    ]
  );

  useEffect(() => {
    if (images.length) setImages({ data: images, isLoading, isError });
  }, [images, isLoading, isError, setImages]);

  useEffect(() => {
    if (favoriteImages.length) setFavoriteImages(favoriteImages);
  }, [favoriteImages, setFavoriteImages]);

  return <ImagesContext.Provider {...{ value, children }} />;
}
