import { useEffect, useState, useCallback } from "react";
import placeholderImg from "../../Images/image_loading.gif";

/**
 * Show an image loader placeholder and replace when it's been loaded
 * @param {String} src The original source url
 * @param {String} placeholder a loader for the image
 * @returns {String} The image url
 */
export default function useLazyloadImage({
  src,
  placeholder = placeholderImg,
}) {
  const [imgSrc, setSrc] = useState(placeholder || src);

  const onLoad = useCallback(() => {
    setSrc(src);
  }, [src]);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.addEventListener("load", onLoad);

    return () => img.removeEventListener("load", onLoad);
  }, [src, onLoad]);

  return imgSrc;
}
