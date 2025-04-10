import React, { useState } from "react";
import BoardList from "./components/BoardList/BoardList";
import Board from "./components/Board/Board";
import "./App.css";




function App() {
  const [boards, setBoards] = useState([]);
  const [activeBoardIndex, setActiveBoardIndex] = useState(null);

  const addBoard = (name) => {
    setBoards([...boards, { name, columns: [] }]);
  };

  const addColumn = (boardIndex, columnName) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex].columns.push({ name: columnName, tasks: [] });
    setBoards(updatedBoards);
  };

  const addTask = (boardIndex, columnIndex, task) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex].columns[columnIndex].tasks.push(task);
    setBoards(updatedBoards);
  };

  const moveTask = (from, to) => {
    const updatedBoards = [...boards];
  
    const taskToMove =
      updatedBoards[from.boardIndex].columns[from.columnIndex].tasks[from.taskIndex];
  
    // Удаляем из старой позиции
    updatedBoards[from.boardIndex].columns[from.columnIndex].tasks.splice(from.taskIndex, 1);
  
    // Добавляем в новую колонку
    updatedBoards[to.boardIndex].columns[to.columnIndex].tasks.push(taskToMove);
  
    setBoards(updatedBoards);
  };

  return (
    <div className="App">
      <BoardList
        boards={boards}
        setActiveBoardIndex={setActiveBoardIndex}
        addBoard={addBoard}
      />
      {activeBoardIndex !== null && (
        <Board
          board={boards[activeBoardIndex]}
          boardIndex={activeBoardIndex}
          addColumn={addColumn}
          addTask={addTask}
          moveTask={moveTask}
        />
      )}
    </div>
  );
}

export default App;
