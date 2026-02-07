import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import "./styles/app.css";
import "./styles/theme.css";
import Header from "./components/Header";

function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const handleAddTask = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setTasks([...tasks, inputValue.trim()]);
      setInputValue("");
      setShowInput(false);
    }
  };

  const markCompleted = (index) => {
    const task = tasks[index];
    setTasks(tasks.filter((_, i) => i !== index));
    setCompleted([...completed, task]);
  };

  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="app">
      <Sidebar theme={theme} toggleTheme={toggleTheme} />

      <main className="main">
        <Header
          theme={theme}
          toggleTheme={toggleTheme}
          search={search}
          setSearch={setSearch}
        />

        <div className="task-card">
          <div className="task-card-header">
            <h2>All Tasks</h2>
            <button
              className="add-btn"
              onClick={() => setShowInput(!showInput)}
            >
              +
            </button>
          </div>

          {showInput && (
            <input
              className="task-input"
              placeholder="Add new task..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleAddTask}
              autoFocus
            />
          )}

          {filteredTasks.length === 0 && (
            <p className="task-empty">No tasks found</p>
          )}

          {filteredTasks.map((task, index) => (
            <div key={index} className="task-item">
              <span
                className="task-checkbox"
                onClick={() => markCompleted(index)}
              />
              <span className="task-text">{task}</span>
            </div>
          ))}
        </div>

        <div className="task-card">
          <div className="task-card-header">
            <h2>Completed Tasks</h2>
          </div>

          {completed.length === 0 && (
            <p className="task-empty">No completed tasks</p>
          )}

          {completed.map((task, index) => (
            <div key={index} className="task-item completed">
              <span className="task-checkbox checked" />
              <span className="task-text">{task}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
