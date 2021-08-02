import useCurrentUser from "./useCurrentUser";
import useImages from "./useImages";

/**
 * Filter all images to just favorite images
 * @returns {Array.<Object>} The favorite images filter
 */
export default function useFavoritesImages() {
  const { favoritesImages = [] } = useCurrentUser().user;
  const { images } = useImages();
  const toObjects = [];

  for (const id of favoritesImages) {
    const favoriteImage = images?.find((img) => img._id === id);
    if (favoriteImage) toObjects.push(favoriteImage);
  }

  return toObjects;
}
