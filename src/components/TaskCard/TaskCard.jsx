import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import "./TaskCard.css";

const TaskCard = ({ task, index, columnIndex, moveTask, editTask, deleteTask}) => {
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [isEditing, setIsEditing] = useState(false);

  const [{ isDragging }, drag] = useDrag({
    type: "TASK",
    item: { index, columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "TASK",
    hover: (draggedItem) => {
      if (
        draggedItem.index === index &&
        draggedItem.columnIndex === columnIndex
      ) return;

      moveTask(
        { columnIndex: draggedItem.columnIndex, taskIndex: draggedItem.index },
        { columnIndex, taskIndex: index }
      );
      draggedItem.index = index;
      draggedItem.columnIndex = columnIndex;
    },
  });

  const handleEditClick = () => {
    setIsEditing(true);
  };
  
  const handleSaveEdit = () => {
    editTask(task.id, editedTitle);
    setIsEditing(false);
  };
  
  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  return (
    <div
    key={task.id} 
      ref={(node) => drag(drop(node))}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
{isEditing ? (
  <div>
    <input
      type="text"
      value={editedTitle}
      onChange={(e) => setEditedTitle(e.target.value)}
    />
    <div className="btn-group">
      <button className="edit-btn" onClick={handleSaveEdit}>Save</button>
    </div>
  </div>
) : (
  <div>
    <p>{task.title}</p>
    <div className="btn-group">
      <button className="edit-btn" onClick={handleEditClick}>Edit</button>
      <button className="delete-btn" onClick={handleDeleteClick}>Delete</button>
    </div>
  </div>
)}

    </div>
  );
};

export default TaskCard;
