import React from "react";
import { FiX, FiTrash2, FiSave, FiCheckCircle } from "react-icons/fi";
import "./TaskModal.css";

const TaskModal = ({ 
  task, 
  onClose, 
  onSave, 
  onDelete,
  onToggleComplete 
}) => {
  const [editedTitle, setEditedTitle] = React.useState(task.title);
  const [editedDesc, setEditedDesc] = React.useState(task.description || "");

  const handleSave = () => {
    onSave({
      ...task,
      title: editedTitle,
      description: editedDesc
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="task-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <FiX size={20} />
        </button>

        <div className="modal-header">
          <button 
            className={`complete-btn ${task.completed ? "completed" : ""}`}
            onClick={() => onToggleComplete(!task.completed)}
          >
            {task.completed && <FiCheckCircle size={16} />}
          </button>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="task-title-input"
            placeholder="Task title"
          />
        </div>

        <textarea
          value={editedDesc}
          onChange={(e) => setEditedDesc(e.target.value)}
          className="task-desc-input"
          placeholder="Add description..."
          rows={4}
        />

        <div className="modal-actions">
          <button className="delete-btn" onClick={() => {
            onDelete(task.id);
            onClose();
          }}>
            <FiTrash2 /> Delete Task
          </button>
          <button className="save-btn" onClick={handleSave}>
            <FiSave /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;