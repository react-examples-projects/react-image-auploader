import { useQuery } from "react-query";
import { getFavoriteImages } from "../../../Helpers/api";
import useCurrentUser from "../user/useCurrentUser";

export default function useFavoriteImages() {
  const { user } = useCurrentUser();
  const { data = [], ...args } = useQuery("favoriteImages", getFavoriteImages, {
    enabled: !!user,
  });
  return {
    favoriteImages: data,
    ...args,
  };
}
