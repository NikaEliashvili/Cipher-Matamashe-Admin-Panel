import React from "react";
import "./categorySelector.css";
const CategorySelector = ({ name, value, checked, handleChange }) => {
  return (
    <>
      <div className="category-selector-div">
        <input
          id={name}
          type="checkbox"
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor={name} className="category-selector">
          <span className="category-selector-text">{name}</span>
        </label>
      </div>
    </>
  );
};

export default React.memo(CategorySelector);
