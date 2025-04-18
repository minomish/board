import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import BoardList from "./components/BoardList/BoardList";
import Board from "./components/Board/Board";
import "./App.css";

function App() {
  const [boards, setBoards] = useState([]);
  
  // Загрузка досок из localStorage при монтировании
  useEffect(() => {
    const saved = localStorage.getItem("boards");
    if (saved) {
      setBoards(JSON.parse(saved));
    }
  }, []);

  // Сохранение досок в localStorage при изменении
  useEffect(() => {
    if (boards.length > 0) {
      localStorage.setItem("boards", JSON.stringify(boards));
    }
  }, [boards]);

  const addBoard = (name) => {
    setBoards((prevBoards) => {
      const updatedBoards = [...prevBoards, { name, columns: [], tasks: [] }];
      return updatedBoards;
    });
  };

  const addColumn = (boardIndex, columnName) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex].columns.push({ name: columnName, tasks: [] });
    setBoards(updatedBoards);
  };

  const addTask = (boardIndex, taskName, taskDescription) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex].tasks.push({ id: Date.now(), name: taskName, description: taskDescription });
    setBoards(updatedBoards);
  };

  const deleteBoard = (index) => {
    const updatedBoards = [...boards];
    updatedBoards.splice(index, 1); // Удаляем доску по индексу
    setBoards(updatedBoards); // Обновляем состояние

    // Обновление localStorage после удаления доски
    localStorage.setItem("boards", JSON.stringify(updatedBoards));
  };

  const editBoardName = (index, newName) => {
    const updatedBoards = boards.map((board, i) => i === index ? { ...board, name: newName } : board);
    setBoards(updatedBoards);
  };

  
  const updateTask = (boardIndex, updatedTask) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex].tasks = updatedBoards[boardIndex].tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setBoards(updatedBoards);
  };

  const deleteTask = (boardIndex, taskId) => {
    const updatedBoards = [...boards];
    updatedBoards[boardIndex].tasks = updatedBoards[boardIndex].tasks.filter(task => task.id !== taskId);
    setBoards(updatedBoards);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <BoardList
                boards={boards}
                addBoard={addBoard}
                deleteBoard={deleteBoard}
                editBoardName={editBoardName}
              />
            }
          />
          <Route
            path="/board/:index"
            element={
              <Board
                boards={boards}
                updateTask={updateTask}
                addTask={addTask}
                deleteTask={deleteTask}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
