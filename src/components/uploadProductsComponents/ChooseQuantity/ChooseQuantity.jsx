import { useDispatch, useSelector } from "react-redux";
import ToggleableFormField from "../ToggleableFormField/ToggleableFormField";
import "./chooseQuantity.css";
import React, { useEffect } from "react";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";

const QUANTITY_NUM_REGEX = /^(?!0\d)\d*$/;

const ChooseQuantity = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const inputName = "quantity";
  useEffect(() => {
    if (!formData.chooseDeveloper && formData.discount) {
      dispatch(
        updateFormField({
          fieldName: inputName,
          value: 0,
        })
      );
    }
  }, [formData.chooseDeveloper]);

  if (!formData.chooseDeveloper) {
    return null;
  }
  return (
    <ToggleableFormField
      title="რაოდენობა"
      inputName={inputName}
      inputLabel={"რაოდენობა"}
      inputPlaceholder={"0 ერთ."}
      regex={QUANTITY_NUM_REGEX}
    />
  );
};

export default React.memo(ChooseQuantity);
