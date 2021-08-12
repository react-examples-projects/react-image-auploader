import { useMutation } from "react-query";
import { toggleFavoriteImage as _toggleFavoriteImage } from "../../../Helpers/api";
import useFavoriteImage from "../HooksStore/useFavoriteImage";

export default function useToggleFavoritesImages(imageId) {
  const mutation = useMutation(() => _toggleFavoriteImage(imageId));
  const { toggleFavoriteImage } = useFavoriteImage();

  const toggleFavorite = async () => {
    await mutation.mutateAsync();
    // update the image and user context
    toggleFavoriteImage(imageId);
  };
  return { ...mutation, toggleFavorite };
}
