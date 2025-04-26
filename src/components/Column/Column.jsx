// import React, { useState, useRef } from "react";
// import { useDrag, useDrop } from "react-dnd";
// import TaskCard from "../TaskCard/TaskCard";
// import "./Column.css";

// const Column = ({ column, columnIndex, moveColumn, addTask, moveTask, editTask, deleteTask, editColumn, deleteColumn}) => {
//   const [taskText, setTaskText] = useState("");

//   const tasksRef = useRef(null);

//   const [{ isDragging }, dragColumn] = useDrag({
//     type: "COLUMN",
//     item: { index: columnIndex },
//     collect: (monitor) => ({
//       isDragging: monitor.isDragging(),
//     }),
//   });
//   console.log(column.tasks)

//   const [, dropColumn] = useDrop({
//     accept: "COLUMN",
//     hover: (draggedItem) => {
//       if (draggedItem.index === columnIndex) return;
//       moveColumn(draggedItem.index, columnIndex);
//       draggedItem.index = columnIndex;
//     },
//   });

//   const [, dropTask] = useDrop({
//     accept: "TASK",
//     hover(draggedItem, monitor) {
//       if (!tasksRef.current) return;

//       const clientOffset = monitor.getClientOffset();
//       const children = tasksRef.current.children;

//       let hoverTaskIndex = column.tasks.length;

//       for (let i = 0; i < children.length; i++) {
//         const child = children[i];
//         const rect = child.getBoundingClientRect();
//         if (clientOffset.y < rect.top + rect.height / 2) {
//           hoverTaskIndex = i;
//           break;
//         }
//       }

//       const from = {
//         columnIndex: draggedItem.columnIndex,
//         taskIndex: draggedItem.index,
//       };
//       const to = {
//         columnIndex,
//         taskIndex: hoverTaskIndex,
//       };

//       if (from.columnIndex !== to.columnIndex || from.taskIndex !== to.taskIndex) {
//         moveTask(from, to);
//         draggedItem.index = to.taskIndex;
//         draggedItem.columnIndex = to.columnIndex;
//       }
//     },
//   });

//   const handleAddTask = () => {
//     if (taskText.trim()) {
//       const newTask = { 
//         id: Date.now(), // Добавляем id
//         title: taskText 
//       };
//       addTask(columnIndex, newTask);
//       setTaskText("");
//     }
//   };

//   if (!column) return null;

//   const ref = useRef(null);
//   dragColumn(dropColumn(ref));

  

//   return (
//     <div ref={ref} className="column" style={{ opacity: isDragging ? 0.5 : 1 }}>
//       <h3>{column.name}</h3>
//       <div className="tasks" ref={(node) => {
//         tasksRef.current = node;
//         dropTask(node);
//       }}>
//         {column.tasks.map((task, index) => (
//           <TaskCard
//             key={index}
//             task={task}
//             index={index}
//             columnIndex={columnIndex}
//             moveTask={moveTask}
//             editTask={editTask}
//             deleteTask={deleteTask}
//           />
//         ))}
//       </div>
//       <div className="task-input">
//         <input
//           value={taskText}
//           onChange={(e) => setTaskText(e.target.value)}
//           placeholder="New task"
//         />
//         <button onClick={handleAddTask}>+</button>
//       </div>
//     </div>
//   );
// };

// export default Column;


import React, { useState, useRef, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { FiEdit2, FiTrash2, FiMoreVertical, FiX, FiCheck } from "react-icons/fi";
import TaskCard from "../TaskCard/TaskCard";
import "./Column.css";

const Column = ({ 
  column, 
  columnIndex, 
  boardId,
  moveColumn, 
  addTask, 
  moveTask, 
  editTask, 
  deleteTask,
  editColumn,
  deleteColumn
}) => {
  const [taskText, setTaskText] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newColumnName, setNewColumnName] = useState(column.name);
  const [showDropdown, setShowDropdown] = useState(false);
  
  const tasksRef = useRef(null);
  const dropdownRef = useRef(null);
  const editInputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      editInputRef.current.select();
    }
  }, [isEditing]);

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

      if (from.columnIndex !== to.columnIndex || from.taskIndex !== to.taskIndex) {
        moveTask(from, to);
        draggedItem.index = to.taskIndex;
        draggedItem.columnIndex = to.columnIndex;
      }
    },
  });

  const handleAddTask = () => {
    if (taskText.trim()) {
      addTask(boardId, columnIndex, taskText); 
      setTaskText("");
    }
  };
  const handleEditColumn = () => {
    if (newColumnName.trim() && newColumnName !== column.name) {
      editColumn(boardId, columnIndex, newColumnName);
    }
    setIsEditing(false);
  };

  const handleDeleteColumn = () => {
    if (window.confirm(`Delete column "${column.name}" and all its tasks?`)) {
      deleteColumn(boardId, columnIndex);
    }
    setShowDropdown(false);
  };

  if (!column) return null;

  const ref = useRef(null);
  dragColumn(dropColumn(ref));

  return (
    <div ref={ref} className="column" style={{ opacity: isDragging ? 0.5 : 1 }}>
      <div className="column-header">
        {isEditing ? (
          <div className="column-edit-input">
            <input
              ref={editInputRef}
              value={newColumnName}
              onChange={(e) => setNewColumnName(e.target.value)}
              onBlur={handleEditColumn}
              onKeyDown={(e) => e.key === "Enter" && handleEditColumn()}
            />
            <div className="column-edit-actions">
              <button 
                className="confirm-edit"
                onClick={handleEditColumn}
              >
                <FiCheck />
              </button>
              <button 
                className="cancel-edit"
                onClick={() => {
                  setNewColumnName(column.name);
                  setIsEditing(false);
                }}
              >
                <FiX />
              </button>
            </div>
          </div>
        ) : (
          <h3 onClick={() => setIsEditing(true)}>{column.name}</h3>
        )}
        
        <div className="column-actions" ref={dropdownRef}>
          <button 
            className="column-menu-btn"
            onClick={() => setShowDropdown(!showDropdown)}
            aria-label="Column actions"
          >
            <FiMoreVertical />
          </button>
          
          {showDropdown && (
            <div className="column-dropdown">
              <button onClick={() => {
                setIsEditing(true);
                setShowDropdown(false);
              }}>
                <FiEdit2 /> Edit Column
              </button>
              <button onClick={handleDeleteColumn}>
                <FiTrash2 /> Delete Column
              </button>
            </div>
          )}
        </div>
      </div>

      <div 
        className="tasks" 
        ref={(node) => {
          tasksRef.current = node;
          dropTask(node);
        }}
      >
      {column.tasks.map((task) => (
        <TaskCard
          key={task.id} // Используем id задачи вместо индекса
          task={task}
          columnIndex={columnIndex}
          moveTask={moveTask}
          editTask={editTask}
          deleteTask={deleteTask}
        />
      ))}
      </div>

      <div className="task-input">
        <input
          value={taskText}
          onChange={(e) => setTaskText(e.target.value)}
          placeholder="Add new task..."
          onKeyDown={(e) => e.key === "Enter" && handleAddTask()}
        />
        <button 
          onClick={handleAddTask}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default Column;