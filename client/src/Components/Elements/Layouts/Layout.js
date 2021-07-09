import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Navbar from "../Navbars/Navbar";
import FavoritesImages from "../FavoritesImages/FavoritesImages";
import Sidenavbar from "../Navbars/Sidenavbar";
function Layout({ children }) {
  return (
    <main className="w-100 d-flex h-100" role="main">
      <Sidenavbar />
      <section className="content">
        <Navbar />
        <Row className="mt-3 mx-auto">
          <Col lg={8} className="px-3 px-lg-0">
            {children}
          </Col>

          <Col lg={4}>
            <section className="trending mb-5">
              <h3 className="title text-md-left text-lg-center trending-title">
                Tendencia
              </h3>
            </section>

            <section className="favorites">
              <h3 className="title text-md-left text-lg-center favorites-title">
                Favoritas
              </h3>

              <FavoritesImages />
            </section>
          </Col>
        </Row>
      </section>
    </main>
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
