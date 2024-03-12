import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";

import "./genreSelector.css";

const GenreSelector = ({ genre }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  // const [isChecked, setIsChecked] = useState(
  //   formData.chooseGenre?.includes(genre)
  // );
  const handleChange = (e) => {
    const { name, checked } = e.target;
    // setIsChecked((prev) => !prev);

    /* Change Value in upload Data Redux Store */
    if (checked) {
      dispatch(
        updateFormField({
          fieldName: "chooseGenre",
          value: [...formData.chooseGenre, genre],
        })
      );
    } else {
      const newArr = formData.chooseGenre?.filter(
        (genre) => genre !== name
      );
      // formData.chooseGenre?.forEach((genre) => {
      //   if (genre !== name) {
      //     newArr.push(genre);
      //   }
      // });

      dispatch(
        updateFormField({ fieldName: "chooseGenre", value: newArr })
      );
    }
  };

  return (
    <div className="genre-selector-div">
      <input
        id={genre}
        name={genre}
        type="checkbox"
        checked={formData.chooseGenre?.includes(genre)}
        onChange={handleChange}
      />
      <label htmlFor={genre} className="genre-selector">
        <div className="genre-btn-icon"></div>
        <span className="genre-text">{genre}</span>
      </label>
    </div>
  );
};

export default React.memo(GenreSelector);
