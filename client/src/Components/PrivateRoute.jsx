import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Components/Loaders/loader";
import useVerifyToken from "./Hooks/useVerifyToken";
import { existsToken } from "../Helpers/token";
function PrivateRoute({ component: Component, ...rest }) {
  const { isValidToken, isLoading } = useVerifyToken();
  if (isLoading) return <Loader />;

  return (
    <Route {...rest}>
      {(props) =>
        existsToken() && isValidToken ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    </Route>
  );
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

export default PrivateRoute;
