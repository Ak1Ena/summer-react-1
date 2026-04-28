import { useState, useEffect } from "react";
import "./App.css";
import TaskInput from "./components/TaskInput";
import TaskItem from "./components/TaskItem";

const initialTasks = [
  { id: 1, text: "Complete React Session 3", completed: true },
  { id: 2, text: "Read React docs", completed: false },
  { id: 3, text: "Read React documentation", completed: false },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return initialTasks;
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(text) {
    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };
    setTasks([...tasks, newTask]);
  }

  function handleToggle(id) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  }

  function handleDelete(id) {
    setTasks(tasks.filter((t) => t.id !== id));
  }

  function handleEdit(id, newText) {
    setTasks(
      tasks.map((t) => (t.id === id ? { ...t, text: newText } : t))
    );
  }

  function handleSelectAll(e) {
    const checked = e.target.checked;
    setTasks(tasks.map((t) => ({ ...t, completed: checked })));
  }

  function handleClearCompleted() {
    setTasks(tasks.filter((t) => !t.completed));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true; // "all"
  });

  const activeCount = tasks.filter((t) => !t.completed).length;

  return (
    <div className="todo-card">
      <h1>My To-do List</h1>
      <TaskInput onAddTask={handleAddTask} />
      <div className="filter-buttons">
        <button
          className={filter === "all" ? "active-filter" : ""}
          onClick={() => setFilter("all")}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active-filter" : ""}
          onClick={() => setFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active-filter" : ""}
          onClick={() => setFilter("completed")}
        >
          Completed
        </button>
      </div>

      <div className="controls">
        <label className="select-all">
          <input 
            type="checkbox" 
            onChange={handleSelectAll}
            checked={tasks.length > 0 && tasks.every(t => t.completed)}
          />
          Select All
        </label>
        <span className="task-count">
          {activeCount} {activeCount === 1 ? 'task' : 'tasks'} remaining
        </span>
      </div>


      <ul className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        ))}
      </ul>

      {tasks.some(t => t.completed) && (
        <button className="clear-completed" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      )}
    </div>
  );
}

export default App;
