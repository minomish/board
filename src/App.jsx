import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import BoardWrapper from "./components/BoardWrapper";
import BoardList from "./components/BoardList/BoardList";
import "./App.css";

function App() {
  const [boards, setBoards] = useState(() => {
    const saved = localStorage.getItem("boards");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("boards", JSON.stringify(boards));
  }, [boards]);

  const addBoard = (name) => {
    setBoards([...boards, { id: Date.now(), name, columns: [] }]);
  };

  const editBoard = (id, newName) => {
    setBoards(boards.map(b => (b.id === id ? { ...b, name: newName } : b)));
  };

  const deleteBoard = (id) => {
    setBoards(boards.filter(b => b.id !== id));
  };

  const addColumn = (boardId, columnName) => {
    setBoards(boards.map(b => b.id === boardId
      ? { ...b, columns: [...b.columns, { name: columnName, tasks: [] }] }
      : b
    ));
  };

  const addTask = (boardId, columnIndex, task) => {
    setBoards(boards.map(b => {
      if (b.id !== boardId) return b;
      const updatedColumns = [...b.columns];
      updatedColumns[columnIndex].tasks.push(task);
      return { ...b, columns: updatedColumns };
    }));
  };

  const moveTask = (from, to) => {
    const updatedBoards = [...boards];
    
    if (to.action === "delete") {
      updatedBoards[from.boardIndex].columns[from.columnIndex].tasks.splice(from.taskIndex, 1);
    } else {
      const taskToMove = updatedBoards[from.boardIndex].columns[from.columnIndex].tasks[from.taskIndex];
      updatedBoards[from.boardIndex].columns[from.columnIndex].tasks.splice(from.taskIndex, 1);
      updatedBoards[to.boardIndex].columns[to.columnIndex].tasks.splice(to.taskIndex, 0, taskToMove);
    }
  
    setBoards(updatedBoards);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <Router>
        <Routes>
          <Route path="/" element={
            <BoardList
              boards={boards}
              addBoard={addBoard}
              editBoard={editBoard}
              deleteBoard={deleteBoard}
            />
          } />
          <Route path="/board/:boardId" element={
            <BoardWrapper
              boards={boards}
              setBoards={setBoards}
              addColumn={addColumn}
              addTask={addTask}
              moveTask={moveTask}
              editBoard={editBoard}
              deleteBoard={deleteBoard}
            />
          } />

        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;