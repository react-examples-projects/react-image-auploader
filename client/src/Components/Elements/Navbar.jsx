import ModalUpload from "./Modals/ModalUpload";
import Btn from "./Btn";
import useCurrentUser from "../Hooks/useCurrentUser";
import { BiUpload, BiUserCircle, BiExit } from "react-icons/bi";
import { Link } from "react-router-dom";
import Modal from "./Modals/Modal";
import { memo } from "react";

function Navbar() {
  const { user, logout } = useCurrentUser();
  const children = (toggleOpen) => (
    <>
      <nav className="nav">
        {user?.isAdmin && (
          <Btn
            onClick={toggleOpen}
            style={{ width: "auto", background: "#0db373" }}
          >
            Subir imagen
            <BiUpload style={{ marginLeft: "5px", fontSize: "1rem" }} />
          </Btn>
        )}
        <Link to="/perfil">
          <Btn style={{ width: "auto" }}>
            Ver mi cuenta
            <BiUserCircle style={{ marginLeft: "5px", fontSize: "1rem" }} />
          </Btn>
        </Link>

        <Btn
          style={{ width: "auto", marginLeft: "auto", background: "#e23450" }}
          onClick={logout}
        >
          Salir de la cuenta
          <BiExit style={{ marginLeft: "5px", fontSize: "1rem" }} />
        </Btn>
      </nav>
    </>
  );
  const renderModal = (toggleOpen) => <ModalUpload toggleOpen={toggleOpen} />;

  return (
    <Modal {...{ children, renderModal }} style={{ alignItems: "center" }} />
  );
}

export default memo(Navbar);
