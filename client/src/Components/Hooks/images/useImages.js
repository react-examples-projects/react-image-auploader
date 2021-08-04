import { getImages } from "../../../Helpers/api";
import { useQuery } from "react-query";
import useCurrentUser from "../user/useCurrentUser";

/**
 * Get all images from backend
 * @returns {Object} The object that contains the images
 */
export default function useImages() {
  const { user } = useCurrentUser();
  const {
    data = [],
    isLoading,
    isError,
  } = useQuery("images", getImages, {
    enabled: !!user,
  });
  return {
    images: data,
    isLoading,
    isError,
  };
}
