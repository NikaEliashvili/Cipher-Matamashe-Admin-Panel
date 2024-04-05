import React, { useState } from "react";

import "./uploadProducts.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import ChooseCategory from "../../components/uploadProductsComponents/ChooseCategory/ChooseCategory";
import ChooseGenres from "../../components/uploadProductsComponents/ChooseGenres/ChooseGenres";
import ChooseAvailability from "../../components/uploadProductsComponents/ChooseAvailability/ChooseAvailability";
import ChoosePrice from "../../components/uploadProductsComponents/ChoosePrice/ChoosePrice";
import ChooseImages from "../../components/uploadProductsComponents/ChooseImages/ChooseImages";
import ChooseDeveloper from "../../components/uploadProductsComponents/ChooseDeveloper/ChooseDeveloper";
import ChooseDiscount from "../../components/uploadProductsComponents/ChooseDiscount/ChooseDiscount";
import ChooseQuantity from "../../components/uploadProductsComponents/ChooseQuantity/ChooseQuantity";
import DetailsAboutGame from "../../components/uploadProductsComponents/DetailsAboutGame/DetailsAboutGame";
import TagsContainer from "../../components/uploadProductsComponents/TagsContainer/TagsContainer";
import ButtonsContainer from "../../components/uploadProductsComponents/ButtonsContainer/ButtonsContainer";
import { useSelector, useDispatch } from "react-redux";
import {
  resetForm,
  selectFormData,
} from "../../redux/uploadFormSlice";
import createProduct from "../../services/productServices/createProduct";
import { authToken } from "../../redux/authSlice";

export default function UploadProducts() {
  const token = useSelector(authToken);
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    createProduct(formData, token)
      .then((res) => {
        console.log(res);
        dispatch(resetForm());
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <form className="upload-page" onSubmit={onSubmit}>
      <PageHeader
        icon={"/icons/folder-icon.svg"}
        title={"დაამატე პროდუქტი"}
        subtitle={"შეავსე ინფორმაცია სრულად და დეტალურად"}
      />
      <ChooseCategory />
      <ChooseGenres />
      <ChooseAvailability />
      <ChoosePrice />
      <ChooseImages />
      <ChooseDeveloper />
      <ChooseDiscount />
      <ChooseQuantity />
      <DetailsAboutGame />
      <TagsContainer />
      <ButtonsContainer isLoading={isSubmitting} />
    </form>
  );
}
