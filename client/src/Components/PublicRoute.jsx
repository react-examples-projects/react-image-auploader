import { Route } from "react-router-dom";
import PropTypes from "prop-types";
import Loader from "./Elements/Loaders/loader";
import useUserInfo from "./Hooks/user/useUserInfo";

function PublicRoute(props) {
  const { isLoading } = useUserInfo();
  if (isLoading) return <Loader />;
  return <Route {...props} />;
}

PublicRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
};

export default PublicRoute;
