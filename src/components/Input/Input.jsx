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
}) {
  return (
    <div className="input-field">
      <input
        type={type}
        name={name}
        value={value}
        required
        onChange={onChange}
        id={name}
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
  );
}
