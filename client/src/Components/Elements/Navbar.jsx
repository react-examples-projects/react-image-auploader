import ModalUpload from "./Modals/ModalUpload";
import useCurrentUser from "../Hooks/useCurrentUser";
import Modal from "./Modals/Modal";

import { BiUpload, BiUserCircle, BiExit } from "react-icons/bi";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Control from "react-bootstrap/FormControl";
import { Link } from "react-router-dom";
import { memo } from "react";

function NavbarPage() {
  const { user, logout } = useCurrentUser();
  const cssIcon = { marginLeft: "5px", fontSize: "1rem" };
  const children = (toggleOpen) => (
    <>
      <Navbar className="nav" expand="md">
        <Navbar.Toggle aria-controls="navbar" className="ml-auto mb-2" />
        <Navbar.Collapse id="navbar">
          <Nav className="w-100">
            {user?.isAdmin && (
              <Nav.Item className="mb-md-0 mb-2">
                <Button onClick={toggleOpen} variant="outline-success">
                  Subir imagen
                  <BiUpload style={cssIcon} />
                </Button>
              </Nav.Item>
            )}

            <Nav.Item className="ml-md-auto mr-2 mb-md-0 mb-2">
              <Control
                type="search"
                placeholder="Buscar imágenes..."
                style={{
                  maxWidth: "300px",
                }}
              />
            </Nav.Item>

            <Nav.Item className="mb-md-0 mb-2">
              <Link to="/perfil" className="btn btn-outline-success mr-2">
                Mi cuenta
                <BiUserCircle style={cssIcon} />
              </Link>
            </Nav.Item>

            <Nav.Item>
              <Button onClick={logout} variant="outline-danger">
                Salir
                <BiExit style={cssIcon} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  );
  const renderModal = (toggleOpen) => <ModalUpload toggleOpen={toggleOpen} />;
  return (
    <Modal {...{ children, renderModal }} style={{ alignItems: "center" }} />
  );
}

export default memo(NavbarPage);
