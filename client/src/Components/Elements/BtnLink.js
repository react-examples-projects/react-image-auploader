import React from "react";

function BtnLink({
  className = "",
  text = undefined,
  children = undefined,
  ...props
}) {
  return (
    <button {...props} className={"button-link" + className}>
      {text || children}
    </button>
  );
}

export default BtnLink;
