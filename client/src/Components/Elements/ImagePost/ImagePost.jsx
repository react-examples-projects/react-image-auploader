import ModalImage from "../Modals/ModalImage";
import Modal from "../Modals/Modal";
import { BiComment } from "react-icons/bi";
import PropTypes from "prop-types";
import css from "../../../Style/Modal.module.scss";
import { memo } from "react";
import useLazyloadImage from "../../Hooks/useLazyloadImage";
function ImagePost({ url_image, name, comments, title, ...args }) {
  const src = useLazyloadImage({ src: url_image });

  const children = (toggleOpen) => (
    <article
      className="img"
      onClick={toggleOpen}
      title="Has click para ver más..."
    >
      <figure className="img-figure mb-0">
        <img src={src} alt={title} loading="lazy" className="lazyload" />
      </figure>
      <div className="img-info">
        <p className="m-0" style={{ maxWidth: "80%" }}>
          <span className="d-block mb-0 mr-2 text-truncate mw-100" rel="author">
            {title}
          </span>
          <a href={url_image} target="_blank" rel="noreferrer">
            <small> {name}</small>
          </a>
        </p>

        <span className="comments-count">
          <BiComment /> {comments.length}
        </span>
      </div>
    </article>
  );
  const renderModal = (
    <ModalImage
      src={url_image}
      commentsImage={comments}
      title={title}
      {...args}
    />
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
