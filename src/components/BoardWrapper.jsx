import React from "react";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";

const BoardWrapper = ({ boards, setBoards, addColumn, editColumn, deleteColumn, addTask, moveTask, editBoard, deleteBoard }) => {
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
    <div className="board-wrapper">
      <Board
        board={board}
        boardId={boardId}
        addColumn={addColumn}  // Ensure this is passed
        addTask={addTask}
        moveTask={moveTask}
        moveColumn={moveColumn}
        editBoard={editBoard}
        deleteBoard={deleteBoard}
        editColumn={(boardId, columnIndex, newName) => editColumn(boardId, columnIndex, newName)} 
        deleteColumn={deleteColumn}
      />

    </div>
  );
};

export default BoardWrapper;
