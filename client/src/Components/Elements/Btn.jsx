import React from "react";
import PropTypes from "prop-types";
function Btn({
  className = "",
  text = undefined,
  children = undefined,
  ...props
}) {
  return (
    <button {...props} className={"button" + className}>
      {text || children}
    </button>
  );
}

Btn.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default Btn;
