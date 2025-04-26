import React, { useState,useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

const Column = ({ column, columnIndex, moveColumn, addTask, moveTask }) => {
  const [taskText, setTaskText] = useState("");


  const tasksRef = useRef(null);

  const [{ isDragging }, dragColumn] = useDrag({
    type: "COLUMN",
    item: { index: columnIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  
  const [, dropColumn] = useDrop({
    accept: "COLUMN",
    hover: (draggedItem) => {
      if (draggedItem.index === columnIndex) return;
      moveColumn(draggedItem.index, columnIndex);  
      draggedItem.index = columnIndex;  
    },
  });
  

  const [, dropTask] = useDrop({
    accept: "TASK",
    hover(draggedItem, monitor) {
      if (!tasksRef.current) return;

      const clientOffset = monitor.getClientOffset();
      const children = tasksRef.current.children;

      let hoverTaskIndex = column.tasks.length;

      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        const rect = child.getBoundingClientRect();
        if (clientOffset.y < rect.top + rect.height / 2) {
          hoverTaskIndex = i;
          break;
        }
      }

      const from = {
        columnIndex: draggedItem.columnIndex,
        taskIndex: draggedItem.index,
      };
      const to = {
        columnIndex,
        taskIndex: hoverTaskIndex,
      };

      if (
        from.columnIndex !== to.columnIndex ||
        from.taskIndex !== to.taskIndex
      ) {
        moveTask(from, to);
        draggedItem.index = to.taskIndex;
        draggedItem.columnIndex = to.columnIndex;
      }
    },
  });
  

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(columnIndex, taskText);
      setTaskText("");
    }
  };

  if (!column) return null;


  const ref = useRef(null);
dragColumn(dropColumn(ref));
  return (
      <div ref={ref} className="column" style={{ opacity: isDragging ? 0.5 : 1 }}>

      <h3>{column.name}</h3>
        <div className="tasks" ref={(node) => {
          tasksRef.current = node;
          dropTask(node);
        }}>

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