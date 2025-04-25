import React, { useState } from "react";
import Column from "../Column/Column";
import EditBoardModal from "../EditBoardModal/EditBoardModal"; // импортируем модал
import "./Board.css";

const Board = ({ board, boardIndex, addColumn, addTask, moveTask, editBoard, deleteBoard }) => {
  const [columnName, setColumnName] = useState("");
  const [newBoardName, setNewBoardName] = useState(board.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [showModal, setShowModal] = useState(false); // состояние для показа модала

  if (!board) {
    return <div>Loading...</div>;
  }

  const handleAddColumn = () => {
    if (columnName.trim()) {
      addColumn(board.id, columnName);
      setColumnName("");
    }
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

  const handleEditBoardName = () => {
    setShowModal(true); // открываем модал при нажатии на кнопку "Edit Name"
  };

  const handleSaveBoardName = (newName) => {
    editBoard(board.id, newName);
    setShowModal(false); // закрываем модал после сохранения имени
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

      {/* Вставляем модал для редактирования имени доски */}
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
