import { memo, useState, useCallback } from "react";
import ModalImage from "../Modals/ModalImage";

function Image({ url_image, name, ...args }) {
  const [isOpen, setOpen] = useState(false);
  const toggleOpen = useCallback(() => {
    setOpen((open) => !open);
  }, []);

  return (
    <>
      <div className="img" onClick={toggleOpen}>
        <div className="img-figure">
          <img src={url_image} alt={url_image} loading="lazy" />
        </div>
        <div className="img-info">
          <a href={url_image} target="_blank" rel="noreferrer">
            {name}
          </a>
        </div>
      </div>
      <ModalImage
        src={url_image}
        toggleOpen={toggleOpen}
        isOpen={isOpen}
        {...args}
      />
    </>
  );
}

export default memo(Image);
