import useFavoriteImagesApi from "../images/useFavoriteImages";
import useCurrentUser from "../user/useCurrentUser";
import useImages from "./useImages";

/**
 * Manage the global state for the favorite images
 * @returns {Object} The object state for the favorite images
 */
export default function useFavoriteImage() {
  const { favoriteImages, ...args } = useFavoriteImagesApi();
  const { toggleFavoriteImage: toggleFavoriteImageContext, images } =
    useImages();

  const { toggleFavoriteImageUser } = useCurrentUser();
  const toggleFavoriteImage = (imageId) => {
    toggleFavoriteImageContext(imageId);
    toggleFavoriteImageUser(imageId);
  };

  return {
    ...args,
    favoriteImages: images?.favorites,
    toggleFavoriteImage,
  };
}
