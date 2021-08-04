import { getImages } from "../../../Helpers/api";
import { useQuery } from "react-query";
import { existsToken } from "../../../Helpers/token";

/**
 * Get all images from backend
 * @returns {Object} The object that contains the images
 */
export default function useImages() {
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery("images", getImages, {
    enabled: existsToken(),
  });
  return {
    images: data,
    isLoading,
    isError,
  };
}
