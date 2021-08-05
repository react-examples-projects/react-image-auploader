import useCurrentUser from "../user/useCurrentUser";
import useImages from "./useImages";

export default function useRemoveFavoriteImage() {
  const { removeFavoriteImageUser } = useCurrentUser();
  const { removeFavoriteImage } = useImages();
  const removeFavoriteImage = (imageId) => {
    removeFavoriteImageUser(imageId);
    removeFavoriteImage(imageId);
  };
  
  return removeFavoriteImage;
}
