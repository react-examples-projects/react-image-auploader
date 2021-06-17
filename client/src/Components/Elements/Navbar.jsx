import ModalUpload from "./Modals/ModalUpload";
import useCurrentUser from "../Hooks/useCurrentUser";
import Modal from "./Modals/Modal";

import { BiUpload, BiUserCircle, BiExit } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { memo } from "react";

function Navbar() {
  const { user, logout } = useCurrentUser();
  const children = (toggleOpen) => (
    <>
      <nav className="nav">
        {user?.isAdmin && (
          <Button onClick={toggleOpen} variant="success">
            Subir imagen
            <BiUpload style={{ marginLeft: "5px", fontSize: "1rem" }} />
          </Button>
        )}
        <Link to="/perfil" className="btn btn-success ml-auto mr-2">
          Ver mi cuenta
          <BiUserCircle style={{ marginLeft: "5px", fontSize: "1rem" }} />
        </Link>

        <Button onClick={logout} variant="danger">
          Salir de la cuenta
          <BiExit style={{ marginLeft: "5px", fontSize: "1rem" }} />
        </Button>
      </nav>
    </>
  );
  const renderModal = (toggleOpen) => <ModalUpload toggleOpen={toggleOpen} />;
  return (
    <Modal {...{ children, renderModal }} style={{ alignItems: "center" }} />
  );
}

export default memo(Navbar);
