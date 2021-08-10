import { useEffect, useMemo } from "react";
import ImagesContext from "./ImagesContext";
import useImageReducer from "../../Hooks/HooksStore/useImageReducer";
import useImages from "../../Hooks/images/useImages";
import useFavoriteImages from "../../Hooks/images/useFavoriteImages";

export default function ImagesProvider({ children }) {
  // it's necessary extract `setImages` to keep the state updated from backend
  const { setFavoriteImages, setImages, ...state } = useImageReducer();
  const { images, isLoading, isError } = useImages();
  const { favoriteImages } = useFavoriteImages();

  const value = useMemo(
    () => ({ setFavoriteImages, setImages, ...state }),
    [setFavoriteImages, setImages, state]
  );

  useEffect(() => {
    setImages({ data: images, isLoading, isError });
  }, [images, isLoading, isError, setImages]);

  useEffect(() => {
    if (favoriteImages.length) setFavoriteImages(favoriteImages);
  }, [favoriteImages, setFavoriteImages]);

  return <ImagesContext.Provider {...{ value, children }} />;
}
