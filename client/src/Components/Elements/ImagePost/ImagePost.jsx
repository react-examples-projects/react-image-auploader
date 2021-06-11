import { memo, useState, useCallback } from "react";
import ModalImage from "../Modals/ModalImage";
import useComments from "../../Hooks/useComments";

function ImagePost({ url_image, name, comments: commentsImage, ...args }) {
  const { comments, addComment } = useComments({ commentsImage });
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
        {...{ toggleOpen, isOpen, comments, addComment }}
        {...args}
      />
    </>
  );
}

export default memo(ImagePost);
 