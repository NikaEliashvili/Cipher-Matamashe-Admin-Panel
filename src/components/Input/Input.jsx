import React from "react";
import "./input.css";
export default function Input({
  label,
  type,
  placeholder,
  showPass,
  icon,
  name,
  value,
  onChange,
  errorMessage,
}) {
  return (
    <div className="input-component">
      <div className="input-field">
        <input
          className={errorMessage ? "on-error" : null}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          id={name}
          required
        />
        <div className="label-bg"></div>
        <label htmlFor={name}>{label}</label>
        {showPass
          ? icon && (
              <img
                onClick={showPass}
                className="icon pointer"
                src={icon}
                alt=""
              />
            )
          : icon && <img className="icon" src={icon} alt="" />}
      </div>
      {errorMessage && <p className="error-msg">{errorMessage}</p>}
    </div>
  );
}
