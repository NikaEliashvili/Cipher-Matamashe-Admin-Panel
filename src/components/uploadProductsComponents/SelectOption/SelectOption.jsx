import "./selectOption.css";
import { IoCheckbox } from "react-icons/io5";
import { MdCheckBoxOutlineBlank } from "react-icons/md";
import { FaCheck, FaMinus } from "react-icons/fa6";
import React, { useEffect, useRef, useState } from "react";
import FormInput from "../FormInput/FormInput";

const SelectOption = ({
  handleChange,
  value,
  options,
  name,
  label,
  isMultiple = false,
}) => {
  const selectRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [hasOtherOption, setHasOtherOption] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelectOption = (option) => {
    if (!isMultiple) {
      if (hasOtherOption) {
        setHasOtherOption(false);
      }
      handleChange(option);

      setIsOpen(false);
      setSearchTerm("");
    } else {
      if (option === "") {
        handleChange(name, "none");
        setIsOpen(false);
        setSearchTerm("");
      } else {
        handleChange(name, option);
      }
    }
  };

  const filteredOptions = searchTerm
    ? options.filter((option) =>
        option.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : options;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div className="select-field">
      {label && (
        <label htmlFor={name} className="form-select-label">
          {label}
        </label>
      )}
      <div className="custom-select" ref={selectRef}>
        <div
          className={"select-header " + (isOpen ? "open" : "closed")}
          onClick={toggleDropdown}
        >
          <div className="selected-option">
            {isMultiple
              ? value && value.length > 0
                ? value.join(", ")
                : "არ არის არჩეული"
              : (hasOtherOption && "სხვა") ||
                value ||
                "არ არის არჩეული"}
          </div>
          <div
            className={"select-arrow " + (isOpen ? "open" : "closed")}
          ></div>
        </div>
        {isOpen && (
          <div className="options-container">
            <div className="search-field">
              <img
                width={9}
                src="/icons/search-icon.svg"
                alt="search"
              />
              <input
                type="text"
                className="search-input"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div
              className="option"
              onClick={() => handleSelectOption("")}
            >
              {isMultiple && (
                <div className="checkbox-icon">
                  <span
                    className={
                      value?.length > 0
                        ? "icon unchecked"
                        : "icon checked"
                    }
                  >
                    <FaCheck />
                  </span>
                </div>
              )}
              არ არის არჩეული
            </div>
            {filteredOptions.map((option) => (
              <div
                key={option}
                className="option"
                onClick={() => handleSelectOption(option)}
              >
                {isMultiple && (
                  <div className="checkbox-icon anim">
                    <span
                      className={
                        value?.includes(option)
                          ? "icon checked"
                          : "icon unchecked"
                      }
                    >
                      <FaCheck />
                    </span>
                  </div>
                )}
                {option}
              </div>
            ))}
            {!isMultiple && (
              <div
                className="option"
                onClick={() => {
                  handleSelectOption("");
                  setHasOtherOption(true);
                }}
              >
                სხვა
              </div>
            )}
          </div>
        )}
        {!isMultiple && hasOtherOption && (
          <FormInput
            placeholder="შეიყვანეთ სხვა დეველოპერი "
            value={value}
            handleChange={(e) => handleChange(e.target.value)}
            name="chooseDeveloper"
          />
        )}
      </div>
    </div>
  );
};

export default React.memo(SelectOption);
