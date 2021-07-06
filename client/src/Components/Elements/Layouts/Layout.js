import { Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";
import Navbar from "../Navbar";
import FavoritesImages from "../FavoritesImages/FavoritesImages";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import { BiUserCircle, BiCog, BiMoney, BiExit } from "react-icons/bi";
import "react-pro-sidebar/dist/css/styles.css";
function Layout({ children }) {
  return (
    <main className="w-100 d-flex h-100">
      <ProSidebar>
        <SidebarHeader className="p-4">
          <h5 className="m-0 text-muted text-uppercase font-weight-bold">
            Animez
          </h5>
        </SidebarHeader>

        <SidebarContent className="mt-3">
          <Menu iconShape="square">
            <SubMenu
              title="My account"
              className="text-muted mb-2 text-uppercase"
              icon={<BiUserCircle />}
            >
              <MenuItem className="text-muted mb-2 text-uppercase">
                My perfil
              </MenuItem>
              <MenuItem className="text-muted mb-2 text-uppercase">
                Favorites
              </MenuItem>
            </SubMenu>

            <MenuItem
              className="text-muted mb-2 text-uppercase"
              icon={<BiCog />}
            >
              Settings
            </MenuItem>
            <MenuItem
              className="text-muted mb-2 text-uppercase"
              icon={<BiMoney />}
            >
              Donate us
            </MenuItem>
            <MenuItem
              className="text-muted mb-2 text-uppercase"
              icon={<BiExit />}
            >
              Logout
            </MenuItem>
          </Menu>
        </SidebarContent>

        <SidebarFooter className="p-4">
          <p className="m-0 text-muted font-weight-bold">More information</p>
        </SidebarFooter>
      </ProSidebar>

      <section className="content">
        <Navbar />
        <Row className="mt-3 mx-auto">
          <Col lg={8} className="px-3 px-lg-0">
            {children}
          </Col>

          <Col lg={4}>
            <div className="trending mb-5">
              <h3 className="title text-md-left text-lg-center trending-title">
                Tendencia
              </h3>
            </div>

            <div className="favorites">
              <h3 className="title text-md-left text-lg-center favorites-title">
                Favoritas
              </h3>

              <FavoritesImages />
            </div>
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
