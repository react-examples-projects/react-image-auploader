import { useState, useMemo, useMemo } from "react";
import ImagesContext from "./ImagesContext";
import useImages from "../Hooks/useImages";

export default function ImagesProvider({ children }) {
  const { images: imagesArray, ...args } = useImages();
  const [images, setImages] = useState(imagesArray);
  const value = useMemo(
    () => ({ images, setImages, ...args }),
    [images, setImages, args]
  );

  return <ImagesContext.Provider value={value} children={children} />;
}
