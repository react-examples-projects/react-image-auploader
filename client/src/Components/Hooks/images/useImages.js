import { getImages } from "../../../Helpers/api";
import { useMutation } from "react-query";
import { useEffect } from "react";
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
    mutateAsync,
  } = useMutation(getImages, {});

  useEffect(() => {
    if (user?._id) mutateAsync();
  }, [mutateAsync, user?._id]);

  return {
    images: data,
    isLoading,
    isError,
  };
}
