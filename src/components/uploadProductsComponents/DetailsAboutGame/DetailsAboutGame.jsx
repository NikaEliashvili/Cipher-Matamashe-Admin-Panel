import "./detailsAboutGame.css";
import React, { useEffect } from "react";
import FormInput from "../FormInput/FormInput";
import FormTextArea from "../FormTextArea/FormTextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import SelectOption from "../SelectOption/SelectOption";
import languages from "../../../constants/languages";

const DetailsAboutGame = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      updateFormField({
        fieldName: name,
        value,
      })
    );
  };

  const handleSelect = (name, option) => {
    if (formData[name]) {
      const isChecked = formData[name].includes(option);

      if (isChecked) {
        const newArr = formData[name].filter(
          (item) => item !== option
        );
        dispatch(
          updateFormField({
            fieldName: name,
            value: newArr,
          })
        );
      } else {
        dispatch(
          updateFormField({
            fieldName: name,
            value:
              option === "none" ? [] : [...formData[name], option],
          })
        );
      }
    } else {
      dispatch(
        updateFormField({
          fieldName: name,
          value: option === "none" ? [] : [option],
        })
      );
    }
  };

  useEffect(() => {
    if (
      !formData.chooseDeveloper &&
      (formData.productName ||
        formData.voicingLangs ||
        formData.subtitlesLangs ||
        formData.subtitles)
    ) {
      dispatch(
        updateFormField({
          fieldName: "productName",
          value: null,
        })
      );
      dispatch(
        updateFormField({
          fieldName: "voicingLangs",
          value: [],
        })
      );
      dispatch(
        updateFormField({
          fieldName: "subtitlesLangs",
          value: [],
        })
      );
      dispatch(
        updateFormField({
          fieldName: "description",
          value: null,
        })
      );
    }
  }, [formData.chooseDeveloper]);

  if (!formData.chooseDeveloper) {
    return null;
  }

  return (
    <div className="details-main-container">
      <h6 className="choose-category-title">ინფორმაცია თამაშზე</h6>
      <div className="detail-fields-container">
        <div className="input-fields">
          <div className="product-name">
            <FormInput
              label={"პროდუქტის დასახელება"}
              placeholder={"placeholder"}
              name="productName"
              value={formData.productName || ""}
              handleChange={handleChange}
            />
          </div>
          <div className="languages">
            <div className="language-field">
              <SelectOption
                handleChange={handleSelect}
                value={formData.voicingLangs}
                name="voicingLangs"
                options={languages}
                label="გახმოვანება"
                isMultiple="true"
              />
            </div>
            <div className="language-field">
              <SelectOption
                handleChange={handleSelect}
                value={formData.subtitlesLangs}
                name="subtitlesLangs"
                options={languages}
                label="ტიტრები"
                isMultiple="true"
              />
            </div>
          </div>
          <div className="description">
            <FormTextArea
              label={"აღწერა"}
              placeholder={"placeholder"}
              name="description"
              value={formData.description || ""}
              handleChange={handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailsAboutGame);
