import React, { useState } from 'react';
import Button from '../Button/Button';
import Input from '../Input/Input';
import './Task.css';

const Task = ({ task, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(task.name);
  const [newDescription, setNewDescription] = useState(task.description);

  const handleSave = () => {
    updateTask({ ...task, name: newName, description: newDescription });
    setIsEditing(false);
  };

  return (
    <div className="task">
      {isEditing ? (
        <div className="task-edit">
          <Input 
            value={newName} 
            onChange={(e) => setNewName(e.target.value)} 
            placeholder="Название задачи"
          />
          <Input 
            value={newDescription} 
            onChange={(e) => setNewDescription(e.target.value)} 
            placeholder="Описание задачи"
          />
          <div className="task-actions">
            <Button onClick={handleSave}>Сохранить</Button>
            <Button onClick={() => setIsEditing(false)}>Отменить</Button>
          </div>
        </div>
      ) : (
        <div className="task-view">
          <h3>{task.name}</h3>
          <p>{task.description}</p>
          <div className="task-actions">
            <Button onClick={() => setIsEditing(true)}>✏️</Button>
            <Button onClick={deleteTask}>🗑️</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Task;
