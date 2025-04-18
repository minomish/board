import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./BoardList.css";

import Button from "../Button/Button";
import Input from "../Input/Input";

const BoardList = ({ boards, addBoard, deleteBoard, editBoardName }) => {
  const [boardName, setBoardName] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [newName, setNewName] = useState("");

  const handleAddBoard = () => {
    if (boardName.trim()) {
      addBoard(boardName);
      setBoardName("");
    }
  };

  const handleDeleteBoard = (index) => {
    deleteBoard(index);
  };

  return (
    <div className="board-list">
      <h1>Boards</h1>

      <div className="input-button-container">
        <Input
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
          placeholder="Введите название доски"
        />
        <Button onClick={handleAddBoard} className="inside-btn">+</Button>
      </div>

      <ul>
        {boards.map((board, index) => (
          <li
          key={index}
          className={editingIndex === index ? "editing" : ""}
          onClick={() => {
            if (editingIndex === null) {
              window.location.href = `/board/${index}`;
            }
          }}
        >
          {editingIndex === index ? (
            <>
              <Input
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Новое название"
              />
              <div className="board-edit-actions">
                <Button onClick={(e) => {
                  e.stopPropagation();
                  editBoardName(index, newName);
                  setEditingIndex(null);
                }}>💾</Button>
                <Button onClick={(e) => {
                  e.stopPropagation();
                  setEditingIndex(null);
                }}>❌</Button>
              </div>
            </>
          ) : (
            <div className="board-item">
              <span className="board-name">{board.name}</span>
              <div className="board-actions">
                <Button onClick={(e) => {
                  e.stopPropagation();
                  setEditingIndex(index);
                  setNewName(board.name);
                }}>✏️</Button>
                <Button onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteBoard(index);
                }}>🗑️</Button>
              </div>
            </div>
          )}
        </li>
        
              
        ))}
      </ul>
    </div>
  );
};

export default BoardList;
