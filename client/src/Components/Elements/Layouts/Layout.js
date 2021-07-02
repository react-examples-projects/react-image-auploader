import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Navbar from "../Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Row className="w-100 m-0 mt-5">
        <Col lg={2}>Lista de imagenes favoritas</Col>
        <Col lg={8}>{children}</Col>
        <Col lg={2}>Imagenes con más likes</Col>
      </Row>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
  ]),
};

export default Layout;
