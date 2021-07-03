import { Row, Col, Container } from "react-bootstrap";
import PropTypes from "prop-types";
import Navbar from "../Navbar";

function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <Row className="row-wrapper w-100 mx-auto mt-5">
        <Col
          sm={{ span: 12, order: 1 }}
          md={{ span: 12, order: 1 }}
          lg={{ span: 3, order: "first" }}
        >
          <h3 className="title mb-3 text-md-left text-lg-center favorites">Favoritas</h3>
        </Col>

        <Col lg={6}>{children}</Col>

        <Col sm={{ span: 12, order: 2 }} md={{ span: 12, order: 2 }} lg={3}>
          <h3 className="title mb-3 text-md-left text-lg-center trending">Tendencia</h3>
        </Col>
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
