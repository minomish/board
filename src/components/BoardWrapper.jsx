import React from "react";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";

const BoardWrapper = ({ boards, addColumn, addTask, moveTask, editBoard, deleteBoard }) => {
  const { boardId } = useParams();
  const boardIndex = boards.findIndex(b => b.id === Number(boardId));
  const board = boards[boardIndex];

  if (!board) return <div>Board not found</div>;

  return (
    <Board
      board={board}
      boardIndex={boardIndex}
      addColumn={addColumn}
      addTask={addTask}
      moveTask={moveTask}
      editBoard={editBoard}
      deleteBoard={deleteBoard}
    />
  );
};

export default BoardWrapper;
