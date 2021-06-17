import { useContext } from "react";
import ImageContext from "../../Context/Images/ImagesContext";

export default function useImages() {
  const state = useContext(ImageContext);
  return state;
}
