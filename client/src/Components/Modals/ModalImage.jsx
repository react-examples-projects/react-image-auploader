import { createPortal } from "react-dom";
import { memo, useEffect } from "react";
import useComments from "../Hooks/useComments";
import Btn from "../Elements/Btn";
const container = document.getElementById("modals");

function ModalImage({ _id, src, toggleOpen, isOpen }) {
  const { createCommentImage } = useComments();
  useEffect(() => {
    function closeModal(e) {
      if (e.keyCode === 27 && isOpen) toggleOpen();
    }

    window.addEventListener("keyup", closeModal);
    return () => window.removeEventListener("keyup", closeModal);
  }, [isOpen, toggleOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    fd.append("image_id", _id);
    const data = await createCommentImage.mutateAsync(fd);
    console.log(data);
  };

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <button className="modal-close" onClick={toggleOpen}>
          ✖
        </button>
        <img src={src} className="modal-img" alt="Preview" />
        <hr />
        <h3>Deja un comentario</h3>
        <form onSubmit={handleSubmit}>
          <div className="group">
            <input type="text" name="name" placeholder="Nombre" required />
          </div>

          <div className="group">
            <textarea
              name="content"
              rows="4"
              placeholder="¡Di lo que opinas!"
              required
            />
          </div>
          <Btn text="Comentar" />
        </form>
      </div>
    </div>
  );
}

function ModalWrapper(props) {
  return props.isOpen
    ? createPortal(<ModalImage {...props} />, container)
    : null;
}

export default memo(ModalWrapper);
