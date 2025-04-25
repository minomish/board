import React from "react";
import { useDrag, useDrop } from "react-dnd";
import "./TaskCard.css";

const TaskCard = ({ task, index, columnIndex, moveTask }) => {
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

  return (
    <div
      ref={(node) => drag(drop(node))}
      className="task-card"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {task}
    </div>
  );
};

export default TaskCard;