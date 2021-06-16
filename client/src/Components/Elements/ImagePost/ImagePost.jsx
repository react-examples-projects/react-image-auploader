import ModalImage from "../Modals/ModalImage";
import Modal from "../Modals/Modal";
import { BiComment } from "react-icons/bi";
import PropTypes from "prop-types";
import css from "../../../Style/Modal.module.scss";
import { useEffect, useRef, memo } from "react";
import ScrollReveal from "scrollreveal";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
function ImagePost({ url_image, name, comments, ...args }) {
  const src = useLazyloadImage(url_image);
  const ref = useRef(null);

  useEffect(() => {
    ScrollReveal().reveal(ref.current);
  }, []);

  const children = (toggleOpen) => (
    <div className="img" onClick={toggleOpen} ref={ref}>
      <div className="img-figure">
        <img src={src} alt={url_image} loading="lazy" />
      </div>
      <div className="img-info">
        <a href={url_image} target="_blank" rel="noreferrer">
          {name}
        </a>

        <span className="comments-count">
          <BiComment /> {comments.length}
        </span>
      </div>
    </div>
  );
  const renderModal = (
    <ModalImage src={url_image} commentsImage={comments} {...args} />
  );

  return (
    <Modal {...{ children, renderModal }} className={css.modalWrapperUpload} />
  );
}

ImagePost.propTypes = {
  url_image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
};

export default memo(ImagePost);
