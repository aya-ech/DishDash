import React from 'react';
import './DeleteFood.css';

const DeleteFood = ({FoodName,onCancel,onConfirm}) => {
  return (
    <div className="Popup">
      <div className="Popup-content">
        <p>Are you sure you want to delete the food "{FoodName}"?</p>
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

export default DeleteFood;
