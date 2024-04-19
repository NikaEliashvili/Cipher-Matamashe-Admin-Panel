import "./choosePriceForm.css";
import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import FormInput from "../FormInput/FormInput";
import {
  selectFormData,
  updatePriceInput,
} from "../../../redux/uploadFormSlice";
import PRICE_NUM_REGEX from "../../../constants/priceRegex";

const ChoosePriceForm = ({ formFor }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const regex = PRICE_NUM_REGEX;
  const [error, setError] = useState({
    name: "",
    errorMessage: null,
  });
  const categoryName = formData.allCategories.filter(
    (category) => category.category_id === formFor
  )[0]?.name;
  // Ensure that formData.priceInputs[categoryName] is initialized
  const priceInputs = formData.priceInputs[categoryName] || {};
  console.log(formData.priceInputs);
  const takenData = {
    title: categoryName,
    valueSecondary: priceInputs["secondaryPrice"] || "",
    valueSecondaryProfit: priceInputs["secondaryPriceProfit"] || "",
    valuePrimary: priceInputs["primaryPrice"] || "",
    valuePrimaryProfit: priceInputs["primaryPriceProfit"] || "",
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!containsLetter(value)) {
      if (regex.test(value)) {
        if (error) {
          setError(null);
        }
        // Dispatch the updatePriceInput action with category, field, and value

        dispatch(
          updatePriceInput({
            category: categoryName,
            field: name,
            value: value,
          })
        );
      } else {
        setError({
          name,
          errorMessage: "დასაშვებია მხოლოდ ციფრები და წერტილი",
        });
      }
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
            value={takenData.valueSecondary}
            handleChange={handleChange}
            name="secondaryPrice"
            pattern={null}
            error={
              error &&
              error?.name === "secondaryPrice" &&
              error?.errorMessage
            }
          />
          <FormInput
            label="მოგება"
            placeholder="v1income"
            value={takenData.valueSecondaryProfit}
            handleChange={handleChange}
            name="secondaryPriceProfit"
            pattern={null}
            error={
              error &&
              error?.name === "secondaryPriceProfit" &&
              error?.errorMessage
            }
          />
        </div>
        <div className="primary-price">
          <FormInput
            label="primary"
            placeholder="v2price"
            value={takenData.valuePrimary}
            handleChange={handleChange}
            name="primaryPrice"
            pattern={null}
            error={
              error &&
              error?.name === "primaryPrice" &&
              error?.errorMessage
            }
          />
          <FormInput
            label="მოგება"
            placeholder="v2income"
            value={takenData.valuePrimaryProfit}
            handleChange={handleChange}
            name="primaryPriceProfit"
            pattern={null}
            error={
              error &&
              error?.name === "primaryPriceProfit" &&
              error?.errorMessage
            }
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
