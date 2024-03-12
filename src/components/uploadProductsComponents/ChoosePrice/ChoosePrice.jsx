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
  const formFor =
    [...formData.chooseCategory].sort() || formData.chooseCategory;

  const isEmptyAll = !(
    formData.secondaryPricePS4 ||
    formData.secondaryPricePS5 ||
    formData.secondaryPriceProfitPS4 ||
    formData.secondaryPriceProfitPS5 ||
    formData.primaryPricePS4 ||
    formData.primaryPricePS5 ||
    formData.primaryPriceProfitPS4 ||
    formData.primaryPriceProfitPS5
  );

  useEffect(() => {
    if (!formData.chooseAvailability && !isEmptyAll) {
      dispatch(resetPriceFields());
    }
  }, [
    formData.chooseAvailability,
    formData.chooseCategory,
    isEmptyAll,
    dispatch,
  ]);

  useEffect(() => {
    if (formData.chooseCategory.length === 1 && !isEmptyAll) {
      console.log("run");
      dispatch(
        resetPriceFieldsByCategory(formData.chooseCategory[0])
      );
    }
  }, [formData.chooseCategory, dispatch]);

  /* ------------ */

  if (formData.chooseAvailability === null) {
    return null;
  }

  return (
    <div className="choose-price">
      <h6 className="choose-category-title">შეიყვანეთ ფასი</h6>
      <div className="price-forms">
        {formFor &&
          formFor.map((a) => <ChoosePriceForm key={a} formFor={a} />)}
      </div>
    </div>
  );
};

export default React.memo(ChoosePrice);
