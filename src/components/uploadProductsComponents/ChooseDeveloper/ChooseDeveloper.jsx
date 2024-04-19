import { useDispatch, useSelector } from "react-redux";
import "./chooseDeveloper.css";

import React, { useEffect, useState } from "react";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import SelectOption from "../SelectOption/SelectOption";
import getListDevelopers from "../../../services/productServices/getListDevelopers";
// import developersList from "../../../constants/developersList";

const ChooseDeveloper = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [developersList, setDevelopersList] = useState(null);

  // For  fetching the list of Developers
  useEffect(() => {
    const fetchDevelopers = async () => {
      const data = await getListDevelopers();
      const developersData = data.map((developer) => ({
        ...developer,
        id: developer.developer_id,
      }));
      setDevelopersList(developersData);
    };
    fetchDevelopers();
  }, []);

  const handleChange = (optionValue) => {
    dispatch(
      updateFormField({
        fieldName: "chooseDeveloper",
        value:
          parseInt(optionValue) || optionValue.length > 0
            ? optionValue
            : null,
      })
    );
  };

  // useEffect(() => {
  //   if (
  //     (formData.chooseImages.length === 0 ||
  //       !formData.isImagesVisible) &&
  //     formData.chooseDeveloper
  //   ) {
  //     dispatch(
  //       updateFormField({
  //         fieldName: "chooseDeveloper",
  //         value: "",
  //       })
  //     );
  //   }
  // }, [
  //   formData.chooseImages,
  //   formData.chooseDeveloper,
  //   formData.isImagesVisible,
  //   dispatch,
  // ]);

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
          options={developersList || []}
        />
      </div>
    </div>
  );
};

export default React.memo(ChooseDeveloper);
