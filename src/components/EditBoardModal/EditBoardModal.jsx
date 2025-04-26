
import React, { useState } from "react";
import "./EditBoardModal.css";

const EditBoardModal = ({ currentName, onClose, onSave }) => {
  const [name, setName] = useState(currentName);

  const handleSave = () => {
    if (name.trim()) {
      onSave(name);
      onClose();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h3>Edit Board Name</h3>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <div className="modal-buttons">
          <button onClick={handleSave}>Save</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default EditBoardModal;
