import { Suspense } from "react";
import Loader from "./Loaders/loader";
import PropTypes from "prop-types";

export function LazyComponent({
  component: Component,
  loader = "Loading page...",
}) {
  return (
    <Suspense fallback={loader}>
      <Component />
    </Suspense>
  );
}

function Async(component, loader = <Loader />) {
  return () => <LazyComponent component={component} loader={loader} />;
}

Async.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
  ]).isRequired,
  loader: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.node,
    PropTypes.string,
  ]),
};

export default Async;
