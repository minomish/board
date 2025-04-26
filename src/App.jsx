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
    setBoards([...boards, { 
      id: Date.now(), 
      name, 
      columns: [] 
    }]);
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

  const editColumn = (boardId, columnIndex, newName) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.map((col, idx) =>
                idx === columnIndex ? { ...col, name: newName } : col
              )
            }
          : board
      )
    );
  };

  const deleteColumn = (boardId, columnIndex) => {
    setBoards(prevBoards =>
      prevBoards.map(board =>
        board.id === boardId
          ? {
              ...board,
              columns: board.columns.filter((_, idx) => idx !== columnIndex)
            }
          : board
      )
    );
  };
  const addTask = (boardId, columnIndex, taskText) => {
    setBoards(prevBoards => 
      prevBoards.map(b => {
        if (b.id !== boardId) return b;
        
        // Защита от отсутствия колонок или задач
        const updatedColumns = [...(b.columns || [])];
        if (!updatedColumns[columnIndex]) return b;
        
        updatedColumns[columnIndex].tasks = updatedColumns[columnIndex].tasks || [];
        
        const newTask = {
          id: Date.now(),
          title: taskText
        };
        
        updatedColumns[columnIndex].tasks.push(newTask);
        return { ...b, columns: updatedColumns };
      })
    );
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
              editColumn={editColumn}
              deleteColumn={deleteColumn}
            />
          } />

        </Routes>
      </Router>
    </DndProvider>
  );
}

export default App;