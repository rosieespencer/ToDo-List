import './styles.css'
import marker from './assets/markers.png'
import { useState } from 'react'
import { useLocalStorage } from './useLocalStorage';

function App() {
  type Todo = { id: number; task: string; completed: boolean; };
  const [task, setTask] = useState<string>('');
  const [todos, setTodos] = useLocalStorage('my-todo-tasks', [])
  const [hoveredDelId, setHoveredDelId] = useState<number | null>(null); 

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    
    // Check task is not empty
    if (!task.trim().length) return;

    // Create Todo list item
    const newTodo: Todo = { id: Date.now(), task: task, completed: false };

    // Add new todo to list
    setTodos([...todos, newTodo]);
    setTask('');
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    setHoveredDelId(null);
  };

  const handleCheckedBox = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div className="frame">
      <div className="space"></div>
      <img src={marker} alt="a blue and black whiteboard marker" />
      <div className="list-area">
        <h1 className="header">Todo List</h1>
        <form className="add-todo-form" onSubmit={handleSubmit}>
          <input className="placeholder-spot"
            type="text" 
            value={task} 
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add your task..."
          />
          <button className="submit" type="submit">add</button>
        </form>
        <ul>
          {todos.map((todo) => ( 
            <li key={todo.id}>
              <input className="checkbox" 
                type="checkbox" 
                checked={todo.completed}
                onChange={() => handleCheckedBox(todo.id)}
              />
              <span 
                className="task" 
                style={{ textDecoration: todo.completed ? 'line-through' : 'none', 
                color: hoveredDelId == todo.id ? 'rgb(161, 59, 59)': (todo.completed ? '#4fa0ff' : 'black'),
                }}>
                {todo.task}
              </span>
              <button 
                className="delete" 
                onClick={() => handleDelete(todo.id)}
                onMouseEnter={() => setHoveredDelId(todo.id)}
                onMouseLeave={() => setHoveredDelId(null)}>
                x
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App