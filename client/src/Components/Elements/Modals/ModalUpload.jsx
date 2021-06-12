import { createPortal } from "react-dom";
import { memo, useEffect } from "react";
import ModalUploadComponent from "./Components/ModalUpload";

const container = document.getElementById("modals");

function ModalUpload({ toggleOpen, isOpen, setImagesArray }) {
  useEffect(() => {
    function closeModal(e) {
      if (e.keyCode === 27 && isOpen) toggleOpen();
    }

    window.addEventListener("keyup", closeModal);
    return () => window.removeEventListener("keyup", closeModal);
  }, [isOpen, toggleOpen]);

  return (
    <div className="modal-container center">
      <div className="modal-wrapper">
        <button className="modal-close" onClick={toggleOpen}>
          ✖
        </button>
        <ModalUploadComponent {...{ setImagesArray, toggleOpen }} />
      </div>
    </div>
  );
}

function ModalWrapper(props) {
  return props.isOpen
    ? createPortal(<ModalUpload {...props} />, container)
    : null;
}

export default memo(ModalWrapper);
