import "./chooseAvailability.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import RadioInput from "../RadioInput/RadioInput";
import { properties } from "../../../constants/availableProperties";

const ChooseAvailability = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const handleChange = (e) => {
    const { value } = e.target;
    dispatch(
      updateFormField({
        fieldName: "chooseAvailability",
        value: value,
      })
    );
  };

  useEffect(() => {
    if (
      (!formData.chooseGenre || formData.chooseGenre.length === 0) &&
      formData.chooseAvailability
    ) {
      dispatch(
        updateFormField({
          fieldName: "chooseAvailability",
          value: null,
        })
      );
      setChecked(null);
    }
  }, [formData.chooseGenre, formData.chooseGenre, dispatch]);

  if (!formData.chooseGenre || formData.chooseGenre.length === 0) {
    return null;
  }
  return (
    <div className="availability-container">
      <h6 className="choose-category-title">
        აირჩიეთ ხელმისაწვდომობა
      </h6>
      <div className="input-radios">
        {properties.map((p) => (
          <RadioInput
            key={p}
            name="availablity"
            value={p}
            handleChange={handleChange}
            checked={formData.chooseAvailability === p}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ChooseAvailability);
