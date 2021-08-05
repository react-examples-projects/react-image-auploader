import useFavoriteImagesApi from "../images/useFavoriteImages";
import useCurrentUser from "../user/useCurrentUser";
import useImages from "./useImages";

export default function useFavoriteImage() {
  const { favoriteImages, ...args } = useFavoriteImagesApi();
  const {
    toggleFavoriteImage: toggleFavoriteImageContext,
    removeFavoriteImage: removeFavoriteImageContext,
    images,
  } = useImages();

  const { toggleFavoriteImageUser, removeFavoriteImageUser } = useCurrentUser();
  const toggleFavoriteImage = (imageId) => {
    toggleFavoriteImageContext(imageId);
    toggleFavoriteImageUser(imageId);
  };

  const removeFavoriteImage = (imageId) => {
    removeFavoriteImageUser(imageId);
    removeFavoriteImageContext(imageId);
  };
 
  return {
    ...args,
    favoriteImages: images?.favorites,
    toggleFavoriteImage,
    removeFavoriteImage,
  };
}
