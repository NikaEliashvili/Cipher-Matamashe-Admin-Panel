import React from "react";
import "./formTextArea.css";
const FormTextArea = ({
  placeholder,
  label,
  value,
  handleChange,
  name,
  error,
}) => {
  return (
    <div className="form-textarea">
      {label && (
        <label htmlFor={name} className="form-textarea-label">
          {label}
        </label>
      )}
      <textarea
        name={name}
        id={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="form-textarea-field"
      />

      {error && <span className="err-msg">{error}</span>}
    </div>
  );
};

export default React.memo(FormTextArea);
