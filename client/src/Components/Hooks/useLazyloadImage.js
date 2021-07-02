import { useEffect, useState, useCallback } from "react";
import placeholderImg from "../../Images/image_loading.gif";

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
