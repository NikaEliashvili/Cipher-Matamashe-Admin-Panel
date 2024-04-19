import "./detailsAboutGame.css";
import React, { useEffect, useState } from "react";
import FormInput from "../FormInput/FormInput";
import FormTextArea from "../FormTextArea/FormTextArea";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import SelectOption from "../SelectOption/SelectOption";
import languages from "../../../constants/languages";
import getListVoiceOverLangs from "../../../services/productServices/getListVoiceOverLangs";
import getListSubtitlesLangs from "../../../services/productServices/getListSubtitlesLangs";

const DetailsAboutGame = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [voiceLangs, setVoiceLangs] = useState(null);
  const [subtitleLangs, setSubtitleLangs] = useState(null);
  const [descError, setDescError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    // console.log(name, value);

    if (name === "description" && value?.length > 5000) {
      setDescError("დასაშვებია მაქს. 5000 სიმბოლო");
    } else {
      if (descError) {
        setDescError(null);
      }

      dispatch(
        updateFormField({
          fieldName: name,
          value,
        })
      );
    }
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
    const fetchVoiceLangs = async () => {
      const data = await getListVoiceOverLangs();
      const voiceData = data?.map((lang) => ({
        ...lang,
        id: lang.language_id,
      }));
      setVoiceLangs(voiceData);
      const listData = await getListSubtitlesLangs();
      const subtitlesData = listData?.map((sub) => ({
        ...sub,
        id: sub.subtitle_id,
      }));
      setSubtitleLangs(subtitlesData);
    };
    fetchVoiceLangs();
  }, []);

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
                options={voiceLangs || []}
                label="გახმოვანება"
                isMultiple="true"
              />
            </div>
            <div className="language-field">
              <SelectOption
                handleChange={handleSelect}
                value={formData.subtitlesLangs}
                name="subtitlesLangs"
                options={subtitleLangs || []}
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
              error={descError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(DetailsAboutGame);
