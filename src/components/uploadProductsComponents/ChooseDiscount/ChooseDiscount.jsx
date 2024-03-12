import React, { useEffect } from "react";
import "./chooseDiscount.css";

import ToggleableFormField from "../ToggleableFormField/ToggleableFormField";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
const ChooseSale = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const inputName = "discount";

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
      title="ფასდაკლება"
      inputName={inputName}
      inputPlaceholder={"0.00₾"}
      inputLabel={"ლარებში"}
    />
  );
};

export default React.memo(ChooseSale);
