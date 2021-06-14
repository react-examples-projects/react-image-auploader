import React from "react";
import PropTypes from "prop-types";
import cls from "classnames";
function BtnLink({
  className = "",
  text = undefined,
  children = undefined,
  ...props
}) {
  return (
    <button {...props} className={cls("button-link", className)}>
      {text || children}
    </button>
  );
}

BtnLink.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.element]),
};

export default BtnLink;
