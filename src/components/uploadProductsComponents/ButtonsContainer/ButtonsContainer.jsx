import "./buttonsContainer.css";
import React from "react";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
  selectFormData,
} from "../../../redux/uploadFormSlice";

const ButtonsContainer = ({ isLoading, error }) => {
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const cancelForm = () => {
    dispatch(resetForm());
  };

  if (formData.chooseCategory.length === 0) {
    return null;
  }

  return (
    <div className="buttons-container">
      <Button classNames={"cancel-btn"} onClick={cancelForm}>
        გაუქმება
      </Button>
      {formData.tags.length ? (
        <div className="upload-btn">
          <Button
            classNames={"submit-btn"}
            type={"submit"}
            isLoading={isLoading}
          >
            ატვირთვა
          </Button>
          {error && <span className="err-msg">{error}</span>}
        </div>
      ) : null}
    </div>
  );
};

export default React.memo(ButtonsContainer);
