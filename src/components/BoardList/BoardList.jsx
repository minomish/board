import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";

const BoardList = ({ boards, addBoard, editBoard, deleteBoard }) => {
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
        className="board-input"
      />
      <button onClick={handleAddBoard} className="add-btn">Create</button>
      <ul>
        {boards.map((board) => (
          <li key={board.id}>
            <Link to={`/board/${board.id}`}>{board.name}</Link>
            <button onClick={() => editBoard(board.id, prompt("New name:", board.name))}>Edit</button>
            <button onClick={() => deleteBoard(board.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
