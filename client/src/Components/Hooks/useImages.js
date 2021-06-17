import { getImages } from "../../Helpers/api";
import { useQuery } from "react-query";

export default function useImages() {
  const { data = [], isLoading, isError } = useQuery("images", getImages);
  return {
    images: data,
    isLoading,
    isError,
  };
}
