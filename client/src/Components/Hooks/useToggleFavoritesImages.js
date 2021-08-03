import { useMutation } from "react-query";
import { toggleFavoriteImage as _toggleFavoriteImage } from "../../Helpers/api";
import useCurrentUser from "./useCurrentUser";

export default function useToggleFavoritesImages(imageId) {
  const { toggleFavoriteImage } = useCurrentUser();
  const mutation = useMutation(() => _toggleFavoriteImage(imageId));
  const toggleFavorite = async () => {
    await mutation.mutateAsync();
    // update the user context
    toggleFavoriteImage(imageId);
  };
  return { ...mutation, toggleFavorite };
}
