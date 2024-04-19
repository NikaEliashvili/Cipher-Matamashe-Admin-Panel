import "./choosePrice.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPriceFields,
  resetPriceFieldsByCategory,
  selectFormData,
} from "../../../redux/uploadFormSlice";
import ChoosePriceForm from "../ChoosePriceForm/ChoosePriceForm";

const ChoosePrice = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const formFor = formData.chooseCategory;

  const isEmptyAll = Object.values(formData.priceInputs).every(
    (priceInput) =>
      Object.values(priceInput).every((value) => value === null)
  );

  useEffect(() => {
    if (!formData.chooseAvailability && !isEmptyAll) {
      dispatch(resetPriceFields());
    }
  }, [formData.chooseAvailability, isEmptyAll, dispatch]);

  useEffect(() => {
    if (formData.chooseCategory.length === 1 && !isEmptyAll) {
      dispatch(
        resetPriceFieldsByCategory(formData.chooseCategory[0])
      );
    }
  }, [formData.chooseCategory, isEmptyAll, dispatch]);

  if (formData.chooseAvailability === null) {
    return null;
  }

  return (
    <div className="choose-price">
      <h6 className="choose-category-title">შეიყვანეთ ფასი</h6>
      <div className="price-forms">
        {formFor.map((category) => (
          <ChoosePriceForm key={category} formFor={category} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ChoosePrice);
