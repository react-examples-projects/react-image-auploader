import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "../Components/Loaders/loader";
import { existsToken } from "../Helpers/token";
import useUserInfo from "./Hooks/user/useUserInfo";
function PrivateRoute({ component: Component, ...rest }) {
  const { data, isLoading } = useUserInfo();
  if (isLoading) return <Loader />;

  return (
    <Route {...rest}>
      {(props) =>
        existsToken() && data ? <Component {...props} /> : <Redirect to="/" />
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
