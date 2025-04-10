import React, { useState } from "react";
import Column from "../Column/Column";
import "./Board.css";

const Board = ({ board, boardIndex, addColumn, addTask, moveTask }) => {
  const [columnName, setColumnName] = useState("");

  const handleAddColumn = () => {
    if (columnName.trim()) {
      addColumn(boardIndex, columnName);
      setColumnName("");
    }
  };

  return (
    <div className="board">
      <h2>{board.name}</h2>
      <div className="columns">
        {board.columns.map((col, idx) => (
          <Column
            key={idx}
            column={col}
            boardIndex={boardIndex}
            columnIndex={idx}
            addTask={addTask}
            moveTask={moveTask}
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
