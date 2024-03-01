import React from "react";

import "./button.css";
export default function Button({
  classNames,
  type,
  onClick,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={"subsc-btn " + classNames}
      type={type || "button"}
    >
      {children}
    </button>
  );
}
