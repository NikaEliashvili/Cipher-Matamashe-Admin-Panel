import React from "react";
import "./chooseCategory.css";
import CategorySelector from "../CategorySelector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";

const ChooseCategory = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const handleChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      dispatch(
        updateFormField({
          fieldName: "chooseCategory",
          value: [...formData.chooseCategory, name],
        })
      );
    } else {
      const newArr = formData.chooseCategory?.filter(
        (item) => item !== name
      );
      dispatch(
        updateFormField({
          fieldName: "chooseCategory",
          value: [...newArr],
        })
      );
    }
  };

  return (
    <div className="choose-category">
      <h6 className="choose-category-title">აირჩიეთ კატეგორია</h6>
      <div className="categories">
        {data.map((a, i) => (
          <CategorySelector
            key={i + 1}
            name={a.name}
            value={a.value}
            handleChange={handleChange}
            checked={formData.chooseCategory?.includes(a.name)}
          />
        ))}
      </div>
    </div>
  );
};

const data = [
  { name: "PS4", value: "PlayStation 4" },
  { name: "PS5", value: "PlayStation 5" },
];

export default React.memo(ChooseCategory);
