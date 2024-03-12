import React from "react";

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
import { useSelector } from "react-redux";
import { selectFormData } from "../../redux/uploadFormSlice";

export default function UploadProducts() {
  const formData = useSelector(selectFormData);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
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
      <ButtonsContainer />
    </form>
  );
}
