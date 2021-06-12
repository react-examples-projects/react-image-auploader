import ModalImage from "../Modals/ModalImage";
import useComments from "../../Hooks/useComments";
import Modal from "../Modals/Modal";

function ImagePost({ url_image, name, comments: commentsImage, ...args }) {
  const { comments, addComment } = useComments({ commentsImage });
  const children = (toggleOpen) => (
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
  );
  const renderModal = (
    <ModalImage src={url_image} {...{ comments, addComment }} {...args} />
  );

  return <Modal {...{ children, renderModal }} />;
}

export default ImagePost;
