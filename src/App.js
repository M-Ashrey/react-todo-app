import React, { useState } from 'react';
import './App.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import TodoItem from './components/TodoItem';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedTodos = Array.from(todos);
    const [reorderedItem] = reorderedTodos.splice(result.source.index, 1);
    reorderedTodos.splice(result.destination.index, 0, reorderedItem);

    setTodos(reorderedTodos);
  };

  const addTodo = () => {
    if (newTodo.trim() !== '') {
      setTodos([...todos, { content: newTodo }]);
      setNewTodo('');
    }
  };

  const deleteTodo = (index) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index, newContent) => {
    const editedTodos = [...todos];
    editedTodos[index].content = newContent;
    setTodos(editedTodos);
  };

  return (
    <div className="App">
      <h1>Todo List</h1>
      <div className="add-todo">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="todos">
          {(provided) => (
            <ul className="todo-list" {...provided.droppableProps} ref={provided.innerRef}>
              {todos.map((todo, index) => (
                <Draggable key={index} draggableId={`todo-${index}`} index={index}>
                  {(provided) => (
                    <div
                      className="draggable-item"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <TodoItem
                        todo={todo}
                        index={index}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default App;
