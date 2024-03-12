import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import GenreSelector from "../genreSelector/GenreSelector";

import "./chooseGenres.css";
import genres from "../../../constants/genres";

const ChooseGenres = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  useEffect(() => {
    if (
      (!formData.chooseCategory ||
        formData.chooseCategory.length === 0) &&
      formData.chooseGenre?.length > 0
    ) {
      console.log("Clearing formData.chooseGenre");
      dispatch(
        updateFormField({ fieldName: "chooseGenre", value: [] })
      );
    }
  }, [formData.chooseCategory, formData.chooseGenre, dispatch]);

  if (
    !formData.chooseCategory ||
    formData.chooseCategory?.length === 0
  ) {
    return null;
  }
  return (
    <div
      style={{
        height: "auto",
        transition: "height 2.3s ease-in-out",
      }}
      className="choose-genre"
    >
      <h6 className="choose-category-title">აირჩიეთ ჟანრი</h6>
      <div className="genres">
        {genres.sort().map((genre, index) => (
          <GenreSelector key={index + 1} genre={genre} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(ChooseGenres);
