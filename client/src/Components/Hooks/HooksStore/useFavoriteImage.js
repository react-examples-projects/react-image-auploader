import useFavoriteImagesApi from "../images/useFavoriteImages";
import useCurrentUser from "../user/useCurrentUser";
import useImages from "./useImages";

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
