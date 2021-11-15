import React, { useState } from "react";
import "../_assets/modal.css";
import { useDispatch } from "react-redux";

import { postDeleted } from "../redux/posts.slice";

function Modal({ closeModal, deleteId }) {
  const dispatch = useDispatch();

  const onSavePostClicked = (e) => {
    e.preventDefault();
    dispatch(postDeleted({ id: deleteId }));
    closeModal(false);
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="title">
          <h1>Are you sure you want to delete this item</h1>
        </div>
        <div className="options">
          <button type="button" onClick={() => closeModal(false)}>Cancel</button>
          <button type="button" onClick={onSavePostClicked}>
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
