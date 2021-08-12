import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "./Elements/Loaders/loader";
import { existsToken } from "../Helpers/token";
import useUserInfo from "./Hooks/user/useUserInfo";

function RedirectRoute({ component: Component, ...rest }) {
  const { data, isLoading } = useUserInfo();
  if (isLoading) return <Loader />;

  return (
    <Route
      {...rest}
      render={(props) =>
        existsToken() && data ? (
          <Redirect to="/home" />
        ) : (
          <Component {...props} />
        )
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
