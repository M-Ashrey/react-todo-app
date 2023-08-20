import React, { useState } from 'react';

const TodoItem = ({ todo, index, deleteTodo, editTodo }) => {
  const [editing, setEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(todo.content);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    if (editedContent.trim() !== '') {
      editTodo(index, editedContent);
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    setEditedContent(todo.content);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <li className="todo-item">
      <div className="drag-handle">&#x2630;</div>
      {editing ? (
        <div className="edit-input">
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="edit-buttons">
            <button className="save-button" onClick={handleSave}>
              Save
            </button>
            <button className="cancel-button" onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="todo-content">{todo.content}</div>
          <div className="todo-actions">
            <button onClick={handleEdit}>Edit</button>
            <button onClick={() => deleteTodo(index)}>Delete</button>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem;
