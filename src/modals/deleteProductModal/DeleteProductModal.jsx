import "./deleteProductModal.css";

import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../redux/modalSlice";

import { MdOutlineClose } from "react-icons/md";

const DeleteProductModal = ({
  title,
  maxWidth,
  maxHeigth,
  children,
}) => {
  const isOpen = useSelector((state) => state.modal.isOpen);
  const dispatch = useDispatch();
  const ref = useRef(null);

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        handleClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return isOpen
    ? createPortal(
        <div className="modal-overlay">
          <div
            className="modal"
            ref={ref}
            style={{ maxWidth: maxWidth, maxHeight: maxHeigth }}
          >
            <button className="modal-close" onClick={handleClose}>
              <MdOutlineClose size={30} />
            </button>
            <h3 className="modal-header">{title || null}</h3>
            <div className="content">{children}</div>
          </div>
        </div>,
        document.body
      )
    : null;
};

export default DeleteProductModal;
