import "./tagsInput.css";
import React, { useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
const TagsInput = ({ label, name }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const tags = formData.tags;
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    const { value } = e.target;
    setInputValue(value);
  };

  const handleInputKeyDown = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const value = inputValue.trim();
      if (value) {
        handleChange(value);
        setInputValue("");
      }
    }
  };

  const handleChange = (newTag) => {
    console.log(newTag);
    if (formData.tags) {
      dispatch(
        updateFormField({
          fieldName: "tags",
          value:
            formData.tags.length > 0
              ? [...formData.tags, newTag]
              : [newTag],
        })
      );
    }
  };

  const removeTag = (tagIndex) => {
    if (formData.tags && formData.tags.length > 0) {
      const newTags = formData.tags.filter(
        (_, index) => index !== tagIndex
      );
      dispatch(
        updateFormField({
          fieldName: "tags",
          value: newTags,
        })
      );
    }
  };

  return (
    <div className="tags-field">
      {label && (
        <label htmlFor={name} className="tags-label">
          {label}
        </label>
      )}

      <div className="curstom-tags-input-container">
        <div className="tags">
          {tags &&
            tags.map((tag, index) => (
              <span key={tag + index} className="tag">
                {tag}
                <IoCloseSharp onClick={() => removeTag(index)} />
              </span>
            ))}

          <input
            className="tag-input"
            placeholder="type..."
            type="text"
            value={inputValue}
            onChange={handleInputValue}
            onKeyDown={handleInputKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default React.memo(TagsInput);
