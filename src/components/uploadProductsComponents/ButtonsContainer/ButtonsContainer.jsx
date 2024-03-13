import "./buttonsContainer.css";
import React from "react";
import Button from "../../Button/Button";
import { useDispatch, useSelector } from "react-redux";
import {
  resetForm,
  selectFormData,
} from "../../../redux/uploadFormSlice";

const ButtonsContainer = () => {
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
        <Button classNames={"submit-btn"} type={"submit"}>
          ატვირთვა
        </Button>
      ) : null}
    </div>
  );
};

export default React.memo(ButtonsContainer);
