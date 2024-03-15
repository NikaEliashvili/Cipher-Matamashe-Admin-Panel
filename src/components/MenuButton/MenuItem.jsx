import React, { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const MenuItems = ({ item, chooseFilters }) => {
  const handleSelectOption = () => {
    chooseFilters(item.id);
  };

  if (!item) {
    return null;
  }

  return (
    <div
      key={item.id}
      className="option"
      onClick={() => handleSelectOption()}
    >
      <div
        className={
          "checkbox-icon anims " +
          (item.isChecked ? "checked" : "unchecked")
        }
      >
        <span className="icon">
          <FaCheck />
        </span>
      </div>

      {item.title}
    </div>
  );
};

export default MenuItems;
