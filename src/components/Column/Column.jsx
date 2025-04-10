import React from "react";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

const Column = ({
  column,
  boardIndex,
  columnIndex,
  addTask,
  moveTask,
}) => {
  const handleDragStart = (e, taskIndex) => {
    e.dataTransfer.setData(
      "task",
      JSON.stringify({ boardIndex, columnIndex, taskIndex })
    );
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const data = JSON.parse(e.dataTransfer.getData("task"));
    moveTask(data, { boardIndex, columnIndex });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="column"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <h3>{column.name}</h3>
      <div className="task-list">
        {column.tasks.map((task, idx) => (
          <TaskCard
            key={idx}
            task={task}
            onDragStart={(e) => handleDragStart(e, idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
