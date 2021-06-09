import { createPortal } from "react-dom";
import { memo, useEffect } from "react";

const container = document.getElementById("modals");

function ModalImage({ src, toggleOpen, isOpen }) {
  useEffect(() => {
    function closeModal(e) {
      if (e.keyCode === 27 && isOpen) toggleOpen();
    }

    window.addEventListener("keyup", closeModal);
    return () => window.removeEventListener("keyup", closeModal);
  }, [isOpen, toggleOpen]);

  return (
    <div className="modal-container">
      <div className="modal-wrapper">
        <button className="modal-close" onClick={toggleOpen}>
          ✖
        </button>
        <img src={src} className="modal-img" alt="Preview" />
        <hr />
        <h3>Deja un comentario</h3>
        <form>
          <div className="group">
            <textarea
              name="comment"
              rows="4"
              placeholder="¡Di lo que opinas!"
              required
            />
          </div>
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
