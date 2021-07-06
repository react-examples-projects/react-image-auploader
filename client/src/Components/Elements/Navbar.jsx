import ModalUpload from "./Modals/ModalUpload";
import useCurrentUser from "../Hooks/useCurrentUser";
import Modal from "./Modals/Modal";

import { BiUpload } from "react-icons/bi";
import {
  Button,
  Image,
  Navbar,
  Nav,
  FormControl,
  Dropdown,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { memo } from "react";

function NavbarPage() {
  const { user, logout } = useCurrentUser();
  const cssIcon = { marginLeft: "5px", fontSize: "1rem" };
  const children = (toggleOpen) => (
    <>
      <Navbar className="nav" expand="lg">
        <Navbar.Toggle aria-controls="navbar" className="ml-auto mb-2" />
        <Navbar.Collapse id="navbar">
          <Nav className="w-100">
            {user?.isAdmin && (
              <Nav.Item className="mb-md-0 mb-2 d-flex align-items-center">
                <Button onClick={toggleOpen} variant="outline-success">
                  Subir imagen
                  <BiUpload style={cssIcon} />
                </Button>
              </Nav.Item>
            )}

            <Nav.Item className="flex-lg-grow-1 mb-md-0 mb-2 d-flex align-items-center">
              <FormControl
                type="search"
                placeholder="Buscar imágenes..."
                className="ml-md-auto mx-0 mx-sm-2"
                style={{
                  maxWidth: "500px",
                }}
              />
            </Nav.Item>

            <Nav.Item className="mb-md-0 mb-2 d-flex align-items-center">
              <Dropdown size="sm" drop="left">
                <Dropdown.Toggle
                  id="dropdown-basic"
                  className="bg-transparent border-0 btn-sm"
                >
                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      <Tooltip>
                        Ver más opciones
                      </Tooltip>
                    }
                  >
                    <Image
                      src={user.perfil_photo}
                      fluid
                      roundedCircle
                      width="50"
                      height="50"
                    />
                  </OverlayTrigger>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item as={Link} to="/perfil">
                    Mi perfil
                  </Dropdown.Item>
                  <Dropdown.Item href="/perfil#subidas">
                    Mis imágenes
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>Salir</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
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
