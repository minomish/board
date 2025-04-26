import React, { useState } from "react";
import Column from "../Column/Column";
import EditBoardModal from "../EditBoardModal/EditBoardModal";
import "./Board.css";

const Board = ({ board, boardIndex, addColumn, addTask, moveTask, moveColumn, editColumn, deleteColumn, editBoard, deleteBoard }) => {
  const [columnName, setColumnName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const handleAddColumn = () => {
    if (columnName.trim()) {
      addColumn(board.id, columnName);
      setColumnName("");
    }
  };

  const handleDeleteBoard = () => {
    deleteBoard(board.id);
  };

  const handleEditBoardName = () => {
    setShowModal(true);
  };

  const handleSaveBoardName = (newName) => {
    editBoard(board.id, newName);
    setShowModal(false);
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
            editColumn={(newName) => editColumn(board.id, idx, newName)}
            deleteColumn={() => deleteColumn(board.id, idx)}
            addTask={(task) => addTask(board.id, idx, task)}
            moveTask={(from, to) => moveTask({ boardIndex, ...from }, { boardIndex, ...to })}
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
