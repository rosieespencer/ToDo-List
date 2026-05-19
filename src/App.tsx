
function App() {

  return (
    <div>
      <h1 className="title">Todo List</h1>
      <form className="add-todo-form">
        <input type="text" name="Add your task" />
        <button type="submit">Add</button>
      </form>

      <ul>
        <li>
        </li>
      </ul>
    </div>
  );
}

export default App