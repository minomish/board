// import React from "react";
// import { useParams } from "react-router-dom";
// import Board from "./Board/Board";

// const BoardWrapper = ({ boards, setBoards, addColumn, addTask, moveTask, editBoard, deleteBoard }) => {
//   const { boardId } = useParams();
//   const boardIndex = boards.findIndex(b => b.id === Number(boardId));
//   const board = boards[boardIndex];

//   if (!board) return <div>Board not found</div>;

//   const moveColumn = (fromIndex, toIndex) => {
//     const updatedBoards = [...boards];
//     const columns = updatedBoards[boardIndex].columns;
//     const [movedColumn] = columns.splice(fromIndex, 1);
//     columns.splice(toIndex, 0, movedColumn);
//     setBoards(updatedBoards);
//   };

//   return (
//     <Board
//       board={board}
//       boardIndex={boardIndex}
//       addColumn={addColumn}
//       addTask={addTask}
//       moveTask={moveTask}
//       moveColumn={moveColumn}
//       editBoard={editBoard}
//       deleteBoard={deleteBoard}
//     />
//   );
// };

// export default BoardWrapper;


import React from "react";
import { useParams } from "react-router-dom";
import Board from "./Board/Board";

const BoardWrapper = ({ boards, setBoards, addColumn, addTask, moveTask, editBoard, deleteBoard, editColumn, deleteColumn }) => {
  const { boardId } = useParams();
  const boardIndex = boards.findIndex(b => b.id === parseInt(boardId)); // Преобразуем boardId в число
  const board = boards[boardIndex];

  if (!board) return <div>Board not found</div>;

  // Функция для перемещения колонки
  const moveColumn = (fromIndex, toIndex) => {
    const updatedBoards = [...boards]; // Копируем массив досок
    const columns = updatedBoards[boardIndex].columns;
    
    // Извлекаем колонку и вставляем её в новое место
    const [movedColumn] = columns.splice(fromIndex, 1);
    columns.splice(toIndex, 0, movedColumn);
    
    // Обновляем состояние
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
      setBoards={setBoards}
      editColumn={(boardId, columnIndex, newName) => editColumn(boardId, columnIndex, newName)} 
      deleteColumn={deleteColumn}
    />
  );
};

export default BoardWrapper;
