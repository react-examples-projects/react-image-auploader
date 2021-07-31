/**
 * It detects when the user searches images.
 * If don't search them then, it shows all images
 * @returns {Array.<Object>} The images for show
 */

export default function useImageFound(foundSearches, allImages, imagesToFilter) {
  const isFoundSearches = foundSearches?.length > 0;
  const joinFoundWithImagesShow = foundSearches?.filter((img) => {
    return imagesToFilter?.some((imgs2) => imgs2._id === img._id);
  });
  const imagesToShowFound =
    isFoundSearches && imagesToFilter ? joinFoundWithImagesShow : imagesToFilter;
  const images = imagesToShowFound || (isFoundSearches ? foundSearches : allImages);
  return images;
}
