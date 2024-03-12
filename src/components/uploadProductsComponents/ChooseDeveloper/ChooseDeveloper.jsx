import { useDispatch, useSelector } from "react-redux";
import "./chooseDeveloper.css";

import React, { useEffect } from "react";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import SelectOption from "../SelectOption/SelectOption";
import developersList from "../../../constants/developersList";

const ChooseDeveloper = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const handleChange = (optionValue) => {
    dispatch(
      updateFormField({
        fieldName: "chooseDeveloper",
        value: optionValue.length > 0 ? optionValue : null,
      })
    );
  };

  useEffect(() => {
    if (
      (formData.chooseImages.length === 0 ||
        !formData.isImagesVisible) &&
      formData.chooseDeveloper
    ) {
      dispatch(
        updateFormField({
          fieldName: "chooseDeveloper",
          value: "",
        })
      );
    }
  }, [
    formData.chooseImages,
    formData.chooseDeveloper,
    formData.isImagesVisible,
    dispatch,
  ]);

  if (
    !formData.chooseImages ||
    formData.chooseImages.length === 0 ||
    !formData.isImagesVisible
  ) {
    return null;
  }

  return (
    <div className="choose-developer">
      <h6 className="choose-category-title">დეველოპერი</h6>
      <div className="select-developer">
        <SelectOption
          handleChange={handleChange}
          value={formData.chooseDeveloper || ""}
          options={developersList}
        />
      </div>
    </div>
  );
};

export default React.memo(ChooseDeveloper);
