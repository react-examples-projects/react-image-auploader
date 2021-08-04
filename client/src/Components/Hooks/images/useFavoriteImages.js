import { useQuery } from "react-query";
import { getFavoriteImages } from "../../../Helpers/api";

export default function useFavoriteImages() {
  const favoriteImages = useQuery("favoriteImages", getFavoriteImages);
  return favoriteImages;
}
