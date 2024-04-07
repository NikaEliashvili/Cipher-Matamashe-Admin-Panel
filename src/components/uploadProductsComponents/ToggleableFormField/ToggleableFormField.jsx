import "./toggleableFormField.css";

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import FormInput from "../FormInput/FormInput";
import PRICE_NUM_REGEX from "../../../constants/priceRegex";

const ToggleableFormField = ({
  title,
  inputName,
  inputLabel,
  inputPlaceholder,
  regex = PRICE_NUM_REGEX,
}) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [isOpen, setIsOpen] = useState(false);

  const handleSaleBtn = (e) => {
    const { checked } = e.target;
    if (formData[inputName]) {
      dispatch(
        updateFormField({
          fieldName: inputName,
          value: 0,
        })
      );
    }
    setIsOpen(checked);
  };

  const handleDiscountValue = (e) => {
    if (isOpen) {
      const { value } = e.target;
      if (regex.test(value)) {
        dispatch(updateFormField({ fieldName: inputName, value }));
      }
    }
  };
  return (
    <div className="choose-sale">
      <div className="title-container">
        <h6 className="choose-category-title">{title}</h6>
        <div>
          <label
            htmlFor={`${inputName}-btn`}
            className={"onOff-btn " + (isOpen ? "on" : "off")}
          >
            <input
              id={`${inputName}-btn`}
              name="isDiscount"
              checked={isOpen}
              onChange={handleSaleBtn}
              type="checkbox"
            />
          </label>
        </div>
      </div>
      <div className={"sale-input " + (isOpen && "open")}>
        <FormInput
          placeholder={inputPlaceholder}
          label={inputLabel}
          handleChange={handleDiscountValue}
          name={inputName}
          value={(isOpen && formData[inputName]) || ""}
        />
      </div>
    </div>
  );
};

export default React.memo(ToggleableFormField);
