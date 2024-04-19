import React, { useEffect, useState } from "react";
import "./chooseCategory.css";
import CategorySelector from "../CategorySelector/CategorySelector";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import getListCategories from "../../../services/productServices/getListCategories";
import { TailSpin } from "react-loader-spinner";

const ChooseCategory = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const fetchedCategories = async () => {
      const data = await getListCategories();
      setCategories(data);
      dispatch(
        updateFormField({
          fieldName: "allCategories",
          value: [...data],
        })
      );
    };
    fetchedCategories();
  }, []);

  const handleChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      dispatch(
        updateFormField({
          fieldName: "chooseCategory",
          value: [...formData.chooseCategory, parseInt(value)],
        })
      );
    } else {
      const newArr = formData.chooseCategory?.filter(
        (item) => item !== parseInt(value)
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
        {categories ? (
          categories
            .sort((a, b) => (a.category_id > b.category_id ? 1 : -1))
            .map((a, i) => (
              <CategorySelector
                key={i + 1}
                name={a.name}
                value={a.category_id}
                handleChange={handleChange}
                checked={formData.chooseCategory?.includes(
                  a.category_id
                )}
              />
            ))
        ) : (
          <TailSpin
            color="#505050"
            height={50}
            strokeWidth={3}
            radius={3}
          />
        )}
      </div>
    </div>
  );
};

const data = [
  { name: "PS4", value: "PlayStation 4" },
  { name: "PS5", value: "PlayStation 5" },
];

export default React.memo(ChooseCategory);
