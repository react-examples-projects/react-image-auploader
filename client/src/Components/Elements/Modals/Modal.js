import { createPortal } from "react-dom";
import useToggle from "../../Hooks/useToggle";
import cls from "classnames";
import PropTypes from "prop-types";

const container = document.getElementById("modals");

function Modal({ children, renderModal, className, ...args }) {
  const [isOpen, toggleOpen] = useToggle();
  const render = isOpen ? (
    <div className="modal-container" {...args}>
      <div className={cls("modal-wrapper", className)}>
        <button className="modal-close" onClick={toggleOpen}>
          ✖
        </button>
        {typeof renderModal === "function"
          ? renderModal(toggleOpen)
          : renderModal}
      </div>
    </div>
  ) : null;

  return (
    <>
      {children(toggleOpen)}
      {createPortal(render, container)}
    </>
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  renderModal: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.func,
  ]).isRequired,
};

export default Modal;
