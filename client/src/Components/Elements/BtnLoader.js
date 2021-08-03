import Button from "react-bootstrap/Button";
import Loader from "react-loader-spinner";
import PropTypes from "prop-types";
import cs from "classnames";

function BtnLoader({ children, text, isLoading, ...args }) {
  const classnames = args.className;
  return (
    <Button
      type="submit"
      disabled={isLoading}
      className={cs(
        "d-flex align-items-center justify-content-center",
        classnames
      )}
      {...args}
    >
      {isLoading ? (
        <Loader height={18} width={18} color="#fff" type="Oval" />
      ) : (
        <span className="d-block text-reset">{text || children}</span>
      )}
    </Button>
  );
}

BtnLoader.propTypes = {
  isLoading: PropTypes.bool,
  text: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.string
  ]),
};

export default BtnLoader;
