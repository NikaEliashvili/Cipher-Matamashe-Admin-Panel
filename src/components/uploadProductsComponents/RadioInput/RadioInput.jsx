import "./radioInput.css";
import React from "react";
export default function RadioInput({
  value,
  name,
  checked,
  handleChange,
}) {
  return (
    <div className="radio-item">
      <input
        id={value}
        type="radio"
        name={name}
        value={value}
        onChange={handleChange}
        checked={checked}
      />
      <label htmlFor={value} className="radio-field">
        <div className="radio-input"></div>
        <span>{value}</span>
      </label>
    </div>
  );
}
