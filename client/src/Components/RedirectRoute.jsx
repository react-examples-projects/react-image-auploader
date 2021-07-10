import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { existsToken } from "../Helpers/token";

function RedirectRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        existsToken() ? <Redirect to="/home" /> : <Component {...props} />
      }
    />
  );
}

RedirectRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

export default RedirectRoute;
