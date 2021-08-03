import PropTypes from "prop-types";
import Navbar from "../Navbars/Navbar";
import Sidenavbar from "../Navbars/Sidenavbar";
function Layout({ children }) {
  return (
    <main className="w-100 d-flex h-100" role="main">
      <Sidenavbar />
      <section className="content">
        <Navbar />
        <div className="mt-4 mx-auto px-3">{children}</div>
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
