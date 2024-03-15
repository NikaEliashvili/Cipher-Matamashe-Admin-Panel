import MenuItem from "./MenuItem";
import "./menuButton.css";
import React, { useEffect, useRef, useState } from "react";

const MenuButton = ({ chooseFilters, menuItems = [] }) => {
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [showItems, setShowItems] = useState(false);

  const handleClickMenuBtn = () => {
    if (showItems) {
      setIsOpen(true);
      setTimeout(() => {
        setIsOpen(false);
        setShowItems((prevState) => !prevState);
      }, 300);
    } else {
      setShowItems((prevState) => !prevState);
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {
        setIsOpen(true);
        setTimeout(() => {
          setIsOpen(false);
          setShowItems(false);
        }, 300);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const checkedItems = menuItems.filter((item) => item.isChecked);
  const uncheckedItems = menuItems.filter((item) => !item.isChecked);

  if (!menuItems) {
    return null;
  }

  return (
    <div className="dropdown-menu-wrapper" ref={selectRef}>
      <button
        onClick={handleClickMenuBtn}
        className="dropdown-menu-btn"
      >
        <img
          className="menu-icon"
          src="/icons/menu-icon.svg"
          alt="Menu"
          width={24}
        />
      </button>
      {showItems && (
        <div className={"menu-items " + (isOpen ? "close" : "")}>
          {checkedItems.length > 0 && (
            <div className="menu-items-checked">
              <h6 className="menu-items-header">ჩართული სვეტები</h6>
              {checkedItems.map((item) => (
                <MenuItem
                  key={item.id + item.key}
                  item={item}
                  chooseFilters={chooseFilters}
                />
              ))}
            </div>
          )}
          {uncheckedItems.length > 0 && (
            <div className="menu-items-unchecked">
              <h6 className="menu-items-header">გათიშული სვეტები</h6>
              {uncheckedItems.map((item) => (
                <MenuItem
                  key={item.id + item.key}
                  item={item}
                  chooseFilters={chooseFilters}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuButton;
