import React from "react";
import { ThreeDots } from "react-loader-spinner";
import "./button.css";
export default function Button({
  classNames,
  type,
  onClick,
  children,
  isLoading,
}) {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={"subsc-btn " + classNames}
      type={type || "button"}
    >
      {!isLoading ? (
        <span>{children}</span>
      ) : (
        <span className="loading-span">
          <span className="loading-text">{children}</span>
          <ThreeDots
            visible={true}
            height="10"
            width="10"
            color="#000"
            radius="9"
            wrapperClass="spinner"
          />
        </span>
      )}
    </button>
  );
}
