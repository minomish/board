import React from "react";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";

const BoardWrapper = ({ boards, setBoards, addColumn, addTask, moveTask, editBoard, deleteBoard }) => {
  const { boardId } = useParams();
  const boardIndex = boards.findIndex(b => b.id === Number(boardId));
  const board = boards[boardIndex];

  if (!board) return <div>Board not found</div>;

  const moveColumn = (fromIndex, toIndex) => {
    const updatedBoards = [...boards];
    const columns = updatedBoards[boardIndex].columns;
    const [movedColumn] = columns.splice(fromIndex, 1);
    columns.splice(toIndex, 0, movedColumn);
    setBoards(updatedBoards);
  };

  return (
    <Board
      board={board}
      boardIndex={boardIndex}
      addColumn={addColumn}
      addTask={addTask}
      moveTask={moveTask}
      moveColumn={moveColumn}
      editBoard={editBoard}
      deleteBoard={deleteBoard}
    />
  );
};

export default BoardWrapper;
