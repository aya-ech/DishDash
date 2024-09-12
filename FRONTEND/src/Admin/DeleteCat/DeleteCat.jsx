import React from 'react';
import './DeleteCat.css';

const DeleteCat = ({categoryName,onCancel,onConfirm}) => {
  return (
    <div className="Popup">
      <div className="Popup-content">
        <p>Are you sure you want to delete the category "{categoryName}"?</p>
        <div className="Popup-actions">
          <button className="confirm-btn" onClick={onConfirm}>
            Confirm
          </button>
          <button className="cancel-btn" onClick={onCancel} >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteCat;
