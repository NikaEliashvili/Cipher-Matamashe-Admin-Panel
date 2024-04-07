import { useDispatch, useSelector } from "react-redux";
import "./chooseImages.css";

import React, { useEffect, useState } from "react";
import {
  selectFormData,
  updateFormField,
} from "../../../redux/uploadFormSlice";
import uploadImage from "../../../services/productServices/uploadImage";
import { authToken } from "../../../redux/authSlice";
import Compressor from "compressorjs";
import MAX_IMAGES_COUNT from "../../../constants/uploadImagesCount";
import { TailSpin } from "react-loader-spinner";

const bytesToMB = (size) => size / 1024 / 1024;

const ChooseImages = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const token = useSelector(authToken);
  const formDataImages = formData.chooseImages;
  const [isUploading, setIsUploading] = useState(false);
  const ps4FieldsAreNull =
    !formData.secondaryPricePS4 ||
    !formData.secondaryPriceProfitPS4 ||
    !formData.primaryPricePS4 ||
    !formData.primaryPriceProfitPS4;

  const ps5FieldsAreNull =
    !formData.secondaryPricePS5 ||
    !formData.secondaryPriceProfitPS5 ||
    !formData.primaryPricePS5 ||
    !formData.primaryPriceProfitPS5;

  const ps4AndPs5FieldsAreNull =
    (ps4FieldsAreNull || ps5FieldsAreNull) &&
    formData.chooseCategory.includes(1) &&
    formData.chooseCategory.includes(2);

  const onlyPs4Category =
    formData.chooseCategory.length === 1 &&
    formData.chooseCategory.includes(1);

  const onlyPs5Category =
    formData.chooseCategory.length === 1 &&
    formData.chooseCategory.includes(2);

  const ps4FieldsIsNull =
    !formData.secondaryPricePS4 &&
    !formData.secondaryPriceProfitPS4 &&
    !formData.primaryPricePS4 &&
    !formData.primaryPriceProfitPS4;

  const ps5FieldsIsNull =
    !formData.secondaryPricePS5 &&
    !formData.secondaryPriceProfitPS5 &&
    !formData.primaryPricePS5 &&
    !formData.primaryPriceProfitPS5;

  const handleChange = async (e) => {
    const { files } = e.target;

    let selectedImages = Array.from(files).filter(
      (file) => bytesToMB(file.size) <= 10
    );
    if (
      selectedImages &&
      selectedImages.length > 0 &&
      formDataImages.length + selectedImages.length <=
        MAX_IMAGES_COUNT
    ) {
      const imagesUrlCopy = [...formDataImages];
      if (selectedImages.length > 0) {
        setIsUploading(true);
        for (const file of selectedImages) {
          if (bytesToMB(file.size) >= 1) {
            try {
              const compressedFile = await compressImage(file);
              const uploadImageUrl = await uploadImage(
                token,
                compressedFile
              );
              if (uploadImageUrl) {
                console.log({
                  File: file.size,
                  compressedFile: compressedFile.size,
                });
                imagesUrlCopy.push(uploadImageUrl);
              }
            } catch (error) {
              console.error(
                "Error compressing or uploading image:",
                error
              );
            }
          } else {
            const uploadImageUrl = await uploadImage(token, file);
            if (uploadImageUrl) {
              imagesUrlCopy.push(uploadImageUrl);
            }
          }
          setIsUploading(false);
          // const formData = new FormData();
          // formData.append("image", file);
          // imagesUrlCopy.push(URL.createObjectURL(file));
        }
        dispatch(
          updateFormField({
            fieldName: "chooseImages",
            value: imagesUrlCopy,
          })
        );
      }
    }
  };

  const removeImage = (img) => {
    const newImagesArr = formDataImages.filter(
      (image) => image !== img
    );
    dispatch(
      updateFormField({
        fieldName: "chooseImages",
        value: newImagesArr,
      })
    );
  };

  // Check conditions and reset images in useEffect
  useEffect(() => {
    if (
      formData.chooseImages.length > 0 &&
      (formData.chooseCategory.length === 0 ||
        (onlyPs4Category && ps4FieldsIsNull) ||
        (onlyPs5Category && ps5FieldsIsNull) ||
        (ps4FieldsIsNull &&
          ps5FieldsIsNull &&
          formData.chooseCategory.length === 2))
    ) {
      dispatch(
        updateFormField({ fieldName: "chooseImages", value: [] })
      );
    }
  }, [
    formData.chooseCategory,
    formData.secondaryPricePS4,
    formData.secondaryPriceProfitPS4,
    formData.primaryPricePS4,
    formData.primaryPriceProfitPS4,
    formData.secondaryPricePS5,
    formData.secondaryPriceProfitPS5,
    formData.primaryPricePS5,
    formData.primaryPriceProfitPS5,
    formDataImages.length,
  ]);

  useEffect(() => {
    if (
      formData.chooseCategory.length === 0 ||
      (formData.chooseCategory.length === 2 &&
        ps4AndPs5FieldsAreNull) ||
      (onlyPs4Category && ps4FieldsAreNull) ||
      (onlyPs5Category && ps5FieldsAreNull)
    ) {
      dispatch(
        updateFormField({
          fieldName: "isImagesVisible",
          value: false,
        })
      );
    } else {
      dispatch(
        updateFormField({
          fieldName: "isImagesVisible",
          value: true,
        })
      );
    }
  }, [
    formData.chooseCategory,
    formData.secondaryPricePS4,
    formData.secondaryPriceProfitPS4,
    formData.primaryPricePS4,
    formData.primaryPriceProfitPS4,
    formData.secondaryPricePS5,
    formData.secondaryPriceProfitPS5,
    formData.primaryPricePS5,
    formData.primaryPriceProfitPS5,
    formDataImages.length,
  ]);

  if (
    formData.chooseCategory.length === 0 ||
    (formData.chooseCategory.length === 2 &&
      ps4AndPs5FieldsAreNull) ||
    (onlyPs4Category && ps4FieldsAreNull) ||
    (onlyPs5Category && ps5FieldsAreNull)
  ) {
    return null;
  }

  return (
    <div className="upload-images-container">
      <h6 className="choose-category-title">სურათების ატვირთვა</h6>
      <div className="upload-images">
        {formDataImages.map((img, index) => (
          <div key={index + 1} className="image-preview">
            <img src={img} alt="" className="image-preview-img" />
            <button
              type="button"
              className="delete-btn"
              onClick={() => removeImage(img)}
            >
              <img
                className="delete-icon"
                src="/icons/trash.svg"
                alt="delete icon"
              />
            </button>
          </div>
        ))}
        {formDataImages.length < MAX_IMAGES_COUNT && (
          <div className="image-preview">
            {isUploading && (
              <TailSpin height={50} strokeWidth={3} radius={3} />
            )}
          </div>
        )}
        <input
          className="image-preview-input"
          disabled={formDataImages.length === MAX_IMAGES_COUNT}
          name="chooseImages"
          onChange={handleChange}
          type="file"
          multiple
          id="imgUpload"
          accept="image/*"
        />
        <label htmlFor="imgUpload" className="images-upload-btn">
          <div className="images-upload-btn-text">
            <img
              src="/icons/plus-icon.svg"
              className="plus-icon"
              alt="+"
            />
            <span>მაქს: 10მბ</span>
          </div>
        </label>
        <span className="uploaded-images-amount">
          ატვირთულია {formDataImages.length}/{MAX_IMAGES_COUNT}
        </span>
      </div>
    </div>
  );
};

export default React.memo(ChooseImages);

const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.8, // Adjust quality as needed
      maxWidth: 1920, // Adjust maximum width as needed
      maxHeight: 1080, // Adjust maximum height as needed
      mimeType: "image/jpeg", // Adjust mime type as needed
      success(result) {
        resolve(result); // Resolve with compressed image
      },
      error(error) {
        reject(error); // Reject with compression error
      },
    });
  });
};
