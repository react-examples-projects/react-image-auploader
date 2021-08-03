import { useContext } from "react";
import ImageContext from "../../Context/Images/ImagesContext";

/**
 * Get information from global context about the current images
 * @returns {Object} All information about the images
 */
export default function useImages() {
  const state = useContext(ImageContext);
  return state;
}
