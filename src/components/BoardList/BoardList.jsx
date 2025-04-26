import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./BoardList.css";

const BoardList = ({ boards, addBoard, editBoard, deleteBoard }) => {
  const [boardName, setBoardName] = useState("");
  const navigate = useNavigate();

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
          <li key={board.id} onClick={() => navigate(`/board/${board.id}`)}>
            {board.name}
            <div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  const newName = prompt("New name:", board.name);
                  if (newName) editBoard(board.id, newName);
                }}
              >
                Edit
              </button>
            
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  deleteBoard(board.id);
                }}
              >
                Delete
              </button>
          </div>
        </li>        
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
