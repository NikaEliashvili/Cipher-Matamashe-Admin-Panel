import { useDispatch, useSelector } from "react-redux";
import FormInput from "../FormInput/FormInput";
import "./choosePriceForm.css";
import React from "react";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";

const ChoosePriceForm = ({ formFor }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const takenData = {
    title: formFor === 1 ? "PlayStation 4" : "PlayStation 5",
    valueSecondary:
      formFor === 1
        ? formData.secondaryPricePS4
        : formData.secondaryPricePS5,
    valueSecondaryProfit:
      formFor === 1
        ? formData.secondaryPriceProfitPS4
        : formData.secondaryPriceProfitPS5,
    valuePrimary:
      formFor === 1
        ? formData.primaryPricePS4
        : formData.primaryPricePS5,
    valuePrimaryProfit:
      formFor === 1
        ? formData.primaryPriceProfitPS4
        : formData.primaryPriceProfitPS5,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (!containsLetter(value)) {
      dispatch(
        updateFormField({
          fieldName: name,
          value: value,
        })
      );
    }
  };

  return (
    <div className="price-form">
      <h6 className="price-form-title">{takenData.title}</h6>
      <div className="price-inputs-container">
        <div className="secondary-price">
          <FormInput
            label="secondary"
            placeholder="v1price"
            value={takenData.valueSecondary || ""}
            handleChange={handleChange}
            name={"secondaryPrice" + (formFor === 1 ? "PS4" : "PS5")}
            pattern="[0-9]+"
          />
          <FormInput
            label="მოგება"
            placeholder="v1income"
            value={takenData.valueSecondaryProfit || ""}
            handleChange={handleChange}
            name={
              "secondaryPriceProfit" + (formFor === 1 ? "PS4" : "PS5")
            }
            pattern="[0-9]+"
          />
        </div>
        <div className="primary-price">
          <FormInput
            label="primary"
            placeholder="v2price"
            value={takenData.valuePrimary || ""}
            handleChange={handleChange}
            name={"primaryPrice" + (formFor === 1 ? "PS4" : "PS5")}
            pattern="[0-9]+"
          />
          <FormInput
            label="მოგება"
            placeholder="v2income"
            value={takenData.valuePrimaryProfit || ""}
            handleChange={handleChange}
            name={
              "primaryPriceProfit" + (formFor === 1 ? "PS4" : "PS5")
            }
            pattern="[0-9]+"
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(ChoosePriceForm);

export const containsLetter = (input) => {
  for (let char of input) {
    if (/[a-zA-Z\u10D0-\u10FF]/.test(char)) {
      return true;
    }
  }
  return false;
};
