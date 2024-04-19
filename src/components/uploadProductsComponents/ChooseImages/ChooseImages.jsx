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
import { TailSpin, ColorRing } from "react-loader-spinner";
import deleteImage from "../../../services/productServices/deleteImage";

const bytesToMB = (size) => size / 1024 / 1024;

const ChooseImages = () => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);
  const token = useSelector(authToken);
  const formDataImages = formData.chooseImages;
  const [isUploading, setIsUploading] = useState(false);
  const [uploadErrorMsg, setUploadErrorMsg] = useState(null);

  const handleChange = async (e) => {
    if (uploadErrorMsg) {
      setUploadErrorMsg(null);
    }
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
              if (bytesToMB(compressedFile.size) <= 1) {
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
              } else {
                setUploadErrorMsg("Size is too large!");
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
        }
        if (imagesUrlCopy) {
          dispatch(
            updateFormField({
              fieldName: "chooseImages",
              value: imagesUrlCopy,
            })
          );
        }
        e.target.value = null;
        setIsUploading(false);
      }
    }
  };

  const removeImage = async (img) => {
    const fileName = img
      .split("/")
      .filter((p) => p.includes("img_"))
      .join("");
    const response = await deleteImage(token, fileName);
    if (response) {
      const newImagesArr = formDataImages.filter(
        (image) => image !== img
      );
      dispatch(
        updateFormField({
          fieldName: "chooseImages",
          value: newImagesArr,
        })
      );
    }
  };
  const areAllPriceInputsEmpty = (priceInputs) => {
    // Check if priceInputs is empty
    if (!priceInputs || Object.keys(priceInputs).length === 0) {
      return true;
    }

    // Iterate over each field in priceInputs
    for (const field in priceInputs) {
      // Check if any field is not empty
      for (const type in priceInputs[field]) {
        if (priceInputs[field][type]) {
          return false; // At least one field is not empty
        }
      }
    }

    return true; // All fields are empty
  };

  const areAllPriceInputsFilled = (priceInputs) => {
    // Check if priceInputs is empty
    if (!priceInputs || Object.keys(priceInputs).length === 0) {
      return false;
    }

    // Iterate over each field in priceInputs
    for (const field in priceInputs) {
      // Check if any field is not empty
      if (
        Object.keys(priceInputs)?.length * 4 !==
        formData.chooseCategory?.length * 4
      ) {
        return false;
      }
      if (Object.keys(priceInputs[field]).length !== 4) {
        return false;
      }
      for (const type in priceInputs[field]) {
        if (!priceInputs[field][type]) {
          return false; // At least one field is not empty
        }
      }
    }

    return true; // All fields are empty
  };

  // Check conditions and reset images in useEffect

  useEffect(() => {
    if (
      formData.chooseImages.length > 0 &&
      (formData.chooseCategory.length === 0 ||
        areAllPriceInputsEmpty(formData.priceInputs))
    ) {
      dispatch(
        updateFormField({ fieldName: "chooseImages", value: [] })
      );
    }
  }, [
    formData.chooseCategory,
    formData.priceInputs,
    formDataImages.length,
  ]);

  useEffect(() => {
    if (areAllPriceInputsFilled(formData.priceInputs)) {
      dispatch(
        updateFormField({
          fieldName: "isImagesVisible",
          value: true,
        })
      );
    } else {
      dispatch(
        updateFormField({
          fieldName: "isImagesVisible",
          value: false,
        })
      );
    }
  }, [
    formData.chooseCategory,
    formData.priceInputs,
    formDataImages.length,
  ]);

  if (!areAllPriceInputsFilled(formData.priceInputs)) {
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
              <ColorRing
                visible={true}
                height="70"
                width="70"
                ariaLabel="color-ring-loading"
                colors={[
                  "#9B9B9B",
                  "#9B9B9B",
                  "#9B9B9B",
                  "#9B9B9B",
                  "#9B9B9B",
                ]}
              />
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
          {uploadErrorMsg && (
            <span className="upload-err-msg">{uploadErrorMsg}</span>
          )}
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
      quality: 0.85, // Adjust quality as needed
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
