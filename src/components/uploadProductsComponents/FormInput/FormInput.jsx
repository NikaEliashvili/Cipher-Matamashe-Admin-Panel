import "./formInput.css";

import React from "react";

const FormInput = ({
  placeholder,
  label,
  value,
  handleChange,
  name,
  pattern,
  error,
}) => {
  return (
    <div className="form-input">
      {label && (
        <label htmlFor={name} className="form-input-label">
          {label}
        </label>
      )}
      <input
        id={name}
        className="form-input-field"
        type="text"
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder || ""}
        pattern={pattern || null}
      />
      {error && <span>{error}</span>}
    </div>
  );
};

export default React.memo(FormInput);