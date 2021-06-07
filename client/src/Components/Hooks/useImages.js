import { getImages } from "../../Helpers/api";
import { useQuery } from "react-query";

export default function useImages() {
  const { isLoading, isError, data: images = [] } = useQuery(
    "images",
    getImages
  );

  return {
    images,
    isLoading,
    isError,
  };
}
