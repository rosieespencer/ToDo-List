import { useState } from 'react'

function App() {
  // Todo list item shape
  type Todo = { id: number; task: string; completed: boolean; };
  const [task, setTask] = useState<string>('');
  const [todos, setTodos] = useState<Todo[]>([]);

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
  }

  const handleCheckedBox = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id == id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  return (
    <div>
      <h1 className="header">Todo List</h1>
      <form className="add-todo-form" onSubmit={handleSubmit}>
        <input
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
            <span className="task" style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.task}
            </span>
            <button className="delete" onClick={() => handleDelete(todo.id)}>delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App