import React from "react";
import "./TaskCard.css";

const TaskCard = ({ task, onDragStart }) => {
  return (
    <div
      className="task-card"
      draggable
      onDragStart={onDragStart}
    >
      <h4>{task.title}</h4>
      <div className="tags">
        {task.tags.map((tag, i) => (
          <span key={i} className="tag">{tag}</span>
        ))}
      </div>
    </div>
  );
};


export default TaskCard;
