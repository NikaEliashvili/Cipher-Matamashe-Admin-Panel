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

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    /* Change Value in upload Data Redux Store */
    if (checked) {
      dispatch(
        updateFormField({
          fieldName: "chooseGenre",
          value: [...formData.chooseGenre, parseInt(value)],
        })
      );
    } else {
      const newArr = formData.chooseGenre?.filter(
        (genreId) => genreId !== parseInt(value)
      );

      dispatch(
        updateFormField({ fieldName: "chooseGenre", value: newArr })
      );
    }
  };
  return (
    <div className="genre-selector-div">
      <input
        id={genre.name + genre.genre_id}
        name={genre.name}
        value={genre.genre_id}
        type="checkbox"
        checked={formData.chooseGenre?.includes(genre.genre_id)}
        onChange={handleChange}
      />
      <label
        htmlFor={genre.name + genre.genre_id}
        className="genre-selector"
      >
        <div className="genre-btn-icon"></div>
        <span className="genre-text">{genre.name}</span>
      </label>
    </div>
  );
};

export default React.memo(GenreSelector);
