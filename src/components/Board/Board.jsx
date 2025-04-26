// import React, { useState } from "react";
// import Column from "../Column/Column";
// import EditBoardModal from "../EditBoardModal/EditBoardModal";
// import "./Board.css";

// const Board = ({ board, boardIndex, addColumn, addTask, moveTask, moveColumn, editBoard, deleteBoard }) => {
//   const [columnName, setColumnName] = useState("");
//   const [showModal, setShowModal] = useState(false);

//   const handleAddColumn = () => {
//     if (columnName.trim()) {
//       addColumn(board.id, columnName);
//       setColumnName("");
//     }
//   };

//   const handleDeleteBoard = () => {
//     deleteBoard(board.id);
//   };

//   const handleEditBoardName = () => {
//     setShowModal(true);
//   };

//   const handleSaveBoardName = (newName) => {
//     editBoard(board.id, newName);
//     setShowModal(false);
//   };
//   const editTask = (taskId, newTitle) => {
//     setBoards((prevBoards) => {
//       return prevBoards.map((board) => {
//         const updatedColumns = board.columns.map((column) => {
//           const updatedTasks = column.tasks.map((task) =>
//             task.id === taskId ? { ...task, title: newTitle } : task
//           );
//           return { ...column, tasks: updatedTasks };
//         });
//         return { ...board, columns: updatedColumns };
//       });
//     });
//   };
  
//   const deleteTask = (taskId) => {
//     setBoards((prevBoards) => {
//       return prevBoards.map((board) => {
//         const updatedColumns = board.columns.map((column) => {
//           const updatedTasks = column.tasks.filter((task) => task.id !== taskId);
//           return { ...column, tasks: updatedTasks };
//         });
//         return { ...board, columns: updatedColumns };
//       });
//     });
//   };
  

//   return (
//     <div className="board">
//       <div className="board-header">
//         <h2>{board.name}</h2>
//         <div className="board-actions">
//           <button onClick={handleEditBoardName}>Edit Name</button>
//           <button onClick={handleDeleteBoard}>Delete Board</button>
//         </div>
//       </div>

//       <div className="columns-container">
//         {board.columns.map((col, idx) => (
//           <Column
//             key={idx}
//             column={col}
//             columnIndex={idx}
//             moveColumn={moveColumn}
//             addTask={(columnIdx, task) => addTask(board.id, columnIdx, task)}
//             moveTask={(from, to) =>
//               moveTask({ boardIndex, ...from }, { boardIndex, ...to })
//             }
//             editTask={editTask}
//             deleteTask={deleteTask}
//           />
//         ))}
//         <div className="add-column">
//           <input
//             value={columnName}
//             onChange={(e) => setColumnName(e.target.value)}
//             placeholder="New column"
//           />
//           <button onClick={handleAddColumn}>Add Column</button>
//         </div>
//       </div>

//       {showModal && (
//         <EditBoardModal
//           currentName={board.name}
//           onSave={handleSaveBoardName}
//           onCancel={() => setShowModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Board;


import React, { useState } from "react";
import Column from "../Column/Column";
import EditBoardModal from "../EditBoardModal/EditBoardModal";
import "./Board.css";

const Board = ({ board, boardIndex, addColumn, addTask, moveTask, moveColumn, editBoard, deleteBoard, setBoards,editColumn, deleteColumn, }) => {
  const [columnName, setColumnName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddColumn = () => {
    if (columnName.trim()) {
      addColumn(board.id, columnName);
      setColumnName("");
    }
  };

  const handleDeleteBoard = () => {
    deleteBoard(board.id); // Удаление доски
  };

  const handleEditBoardName = () => {
    setShowModal(true);
  };

  const handleSaveBoardName = (newName) => {
    editBoard(board.id, newName); // Редактирование названия доски
    setShowModal(false);
  };

// В компоненте Board исправьте функции editTask и deleteTask:

const editTask = (taskId, newTitle) => {
  setBoards(prevBoards =>
    prevBoards.map(b => {
      if (b.id !== board.id) return b;
      
      return {
        ...b,
        columns: b.columns.map(column => ({
          ...column,
          tasks: column.tasks.map(task => 
            task.id === taskId ? { ...task, title: newTitle } : task
          )
        }))
      };
    })
  );
};

const deleteTask = (taskId) => {
  setBoards(prevBoards =>
    prevBoards.map(b => {
      if (b.id !== board.id) return b;

      return {
        ...b,
        columns: b.columns.map(column => ({
          ...column,
          tasks: column.tasks.filter(task => task.id !== taskId)
        }))
      };
    })
  );
};

  return (
    <div className="board">
      <div className="board-header">
        <h2>{board.name}</h2>
        <div className="board-actions">
          <button onClick={handleEditBoardName}>Edit Name</button>
          <button onClick={handleDeleteBoard}>Delete Board</button>
        </div>
      </div>

      <div className="columns-container">
        {board.columns.map((col, idx) => (
          <Column
            key={idx}
            column={col}
            columnIndex={idx}
            boardId={board.id}
            moveColumn={moveColumn}
            addTask={(columnIdx, task) => addTask(board.id, columnIdx, task)}
            moveTask={(from, to) =>
              moveTask({ boardIndex, ...from }, { boardIndex, ...to })
            }
            editColumn={(newName) => editColumn(board.id, idx, newName)}
            deleteColumn={() => deleteColumn(board.id, idx)}
            editTask={editTask}
            deleteTask={deleteTask}
          />
        ))}
        <div className="add-column">
          <input
            value={columnName}
            onChange={(e) => setColumnName(e.target.value)}
            placeholder="New column"
          />
          <button onClick={handleAddColumn}>Add Column</button>
        </div>
      </div>

      {showModal && (
        <EditBoardModal
          currentName={board.name}
          onSave={handleSaveBoardName}
          onCancel={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default Board;
