import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

const Column = ({ column, columnIndex, boardId, moveColumn, editColumn, deleteColumn, addTask, moveTask }) => {
  const [taskText, setTaskText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(column.name);
  const tasksRef = useRef(null);

  const handleNameClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (newName !== column.name) {
      editColumn(newName);  // No need to pass boardId and columnIndex here
    }
    setIsEditing(false);
  };
  

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };

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
      <div className="column-header">
        {isEditing ? (
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        ) : (
          <h3 onClick={handleNameClick}>{column.name}</h3>
        )}
      </div>

      <div className="tasks" ref={(node) => {
        tasksRef.current = node;
        dropTask(node);
      }}>
        <button  className="delete-column-btn" onClick={() => deleteColumn(columnIndex)}>Delete</button>

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
