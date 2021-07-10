import { getImages } from "../../Helpers/api";
import { useQuery } from "react-query";

/**
 * Get all images from backend
 * @returns {Object} The object that contains the images
 */
export default function useImages() {
  const { data = [], isLoading, isError } = useQuery("images", getImages);
  return {
    images: data,
    isLoading,
    isError,
  };
}
