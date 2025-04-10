import React, { useState } from "react";
import "./BoardList.css";

const BoardList = ({ boards, setActiveBoardIndex, addBoard }) => {
  const [boardName, setBoardName] = useState("");

  const handleAddBoard = () => {
    if (boardName.trim()) {
      addBoard(boardName);
      setBoardName("");
    }
  };

  return (
    <div className="board-list">
      <h1>Boards</h1>
      <input
        value={boardName}
        onChange={(e) => setBoardName(e.target.value)}
        placeholder="New board name"
        type="text"
        className="board-input"
      />
      <button onClick={handleAddBoard} className="add-btn">Create</button>
      <ul>
        {boards.map((board, index) => (
          <li key={index} onClick={() => setActiveBoardIndex(index)}>
            {board.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
