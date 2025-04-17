import React, { useState } from "react";
import Column from "../Column/Column";
import "./Board.css";

const Board = ({ board, boardIndex, addColumn, addTask, moveTask, editBoard, deleteBoard }) => {
  const [columnName, setColumnName] = useState("");
  const [newBoardName, setNewBoardName] = useState(board.name);
  const [isEditingName, setIsEditingName] = useState(false);

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleAddColumn = () => {
    if (columnName.trim()) {
      addColumn(board.id, columnName);
      setColumnName("");
    }
  };

  const handleEditBoardName = () => {
    if (isEditingName) {
      editBoard(board.id, newBoardName);
    }
    setIsEditingName(!isEditingName);
  };

  const handleDeleteBoard = () => {
    deleteBoard(board.id);
  };

  const moveColumn = (fromIndex, toIndex) => {
    const updatedColumns = [...board.columns];
    const [moved] = updatedColumns.splice(fromIndex, 1);
    updatedColumns.splice(toIndex, 0, moved);
    board.columns = updatedColumns;
  };

  const _moveTask = (from, to) => {
    const updatedColumns = [...board.columns];
    const [movedTask] = updatedColumns[from.columnIndex].tasks.splice(from.taskIndex, 1);
    updatedColumns[to.columnIndex].tasks.splice(to.taskIndex, 0, movedTask);
    board.columns = updatedColumns;
  };

  return (
    <div className="board">
      <div className="board-header">
        {isEditingName ? (
          <input
            type="text"
            value={newBoardName}
            onChange={(e) => setNewBoardName(e.target.value)}
            className="board-name-edit"
          />
        ) : (
          <h2>{board.name}</h2>
        )}
        <div className="board-actions">
          <button onClick={handleEditBoardName}>
            {isEditingName ? "Save Name" : "Edit Name"}
          </button>
          <button onClick={handleDeleteBoard}>Delete Board</button>
        </div>
      </div>
      <div className="columns-container">
        {board.columns.map((col, idx) => (
          <Column
            key={idx}
            column={col}
            columnIndex={idx}
            moveColumn={moveColumn}
            addTask={(columnIdx, task) => addTask(board.id, columnIdx, task)}
            moveTask={(from, to) =>
              moveTask({ boardIndex, ...from }, { boardIndex, ...to })
            }
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
    </div>
  );
};

export default Board;
