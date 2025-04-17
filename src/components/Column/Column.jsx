import React, { useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

const Column = ({ column, columnIndex, moveColumn, addTask, moveTask }) => {
  const [taskText, setTaskText] = useState("");

  const [, drop] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem) => {
      if (draggedItem.index === columnIndex) return;

      moveColumn(draggedItem.index, columnIndex);
      draggedItem.index = columnIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: "COLUMN",
    item: { index: columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(columnIndex, taskText);
      setTaskText("");
    }
  };

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="column"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      <h3>{column.name}</h3>
      <div className="tasks">
        {column.tasks.map((task, index) => (
          <TaskCard
            key={index}
            task={task}
            index={index}
            columnIndex={columnIndex}
            moveTask={moveTask}
          />
        ))}
      </div>
      <div className="task-input">
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="New task"
        />
        <button onClick={handleAddTask}>+</button>
      </div>
    </div>
  );
};

export default Column;
