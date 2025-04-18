import React, { useState } from 'react';
import { useParams } from 'react-router-dom';  // Импортируем useParams
import Task from '../Task/Task';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Board.css';

const Board = ({ boards, addTask, deleteTask }) => {
  const { index } = useParams(); // Получаем индекс из URL
  const boardIndex = parseInt(index, 10); // Преобразуем индекс в число
  const board = boards[boardIndex]; // Получаем доску по индексу

  // Проверка на наличие доски по индексу
  if (!board) {
    return <div>Доска не найдена</div>;  // Если доска не найдена
  }

  const [newTaskName, setNewTaskName] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");

  const handleAddTask = () => {
    if (newTaskName.trim() && newTaskDescription.trim()) {
      addTask(boardIndex, newTaskName, newTaskDescription);
      setNewTaskName("");
      setNewTaskDescription("");
    }
  };

  return (
    <div className="board">
      <div className="board-header">
        <h1>{board.name}</h1>
        <div className="task-form">
          <Input 
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
            placeholder="Название задачи"
          />
          <Input 
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
            placeholder="Описание задачи"
          />
          <Button onClick={handleAddTask}>Добавить задачу</Button>
        </div>
      </div>
      
      <div className="task-list">
        {board.tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            deleteTask={() => deleteTask(boardIndex, task.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Board;
