import { useDispatch, useSelector } from "react-redux";
import TagsInput from "../TagsInput/TagsInput";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import "./tagsContainer.css";
import React, { useEffect } from "react";
const TagsContainer = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  useEffect(() => {
    if (
      !formData.productName &&
      !formData.voicingLangs.length &&
      !formData.subtitlesLangs.length &&
      !formData.description
    ) {
      dispatch(
        updateFormField({
          fieldName: "tags",
          value: [],
        })
      );
    }
  }, [
    formData.productName,
    formData.voicingLangs.length,
    formData.subtitlesLangs.length,
    formData.description,
    dispatch,
  ]);

  if (
    !formData.productName ||
    !formData.voicingLangs.length ||
    !formData.subtitlesLangs.length ||
    !formData.description
  ) {
    return null;
  }

  return (
    <div className="tags-main-container">
      <h6 className="choose-category-title">თეგები</h6>
      <div className="tags-container">
        <TagsInput label={"თეგები"} name={"tags"} />
      </div>
    </div>
  );
};

export default React.memo(TagsContainer);
