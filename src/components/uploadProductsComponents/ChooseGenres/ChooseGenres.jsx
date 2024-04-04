import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import GenreSelector from "../genreSelector/GenreSelector";

import "./chooseGenres.css";
// import genres from "../../../constants/genres";
import getListGenres from "../../../services/productServices/getListGenres";

const ChooseGenres = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const [genres, setGenres] = useState(null);

  useEffect(() => {
    const fetchingGenres = async () => {
      const data = await getListGenres();
      if (data) {
        setGenres(data);
      }
    };

    fetchingGenres();
  }, []);

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
        {genres
          ? genres
              .sort()
              .map((genre) => (
                <GenreSelector
                  key={genre.name + genre.genre_id}
                  genre={genre}
                />
              ))
          : null}
      </div>
    </div>
  );
};

export default React.memo(ChooseGenres);
