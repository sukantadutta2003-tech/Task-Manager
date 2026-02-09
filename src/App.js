import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import "./styles/app.css";
import "./styles/theme.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";


function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("Inbox");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

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

  // 🗑️ DELETE HANDLERS
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const deleteCompletedTask = (index) => {
    setCompleted(completed.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter((task) =>
    task.toLowerCase().includes(search.toLowerCase())
  );

  return (
  <BrowserRouter>
    <Routes>

      {/* LOGIN PAGE */}
      <Route path="/login" element={<Login />} />

      {/* MAIN APP — YOUR ORIGINAL LAYOUT (UNCHANGED) */}
      <Route
        path="/"
        element={
          <>
            {/* 👇 EVERYTHING BELOW IS YOUR OLD JSX — NOT MODIFIED */}
            <div className="app">
              <Sidebar
                activeView={activeView}
                setActiveView={setActiveView}
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
              />

              <main className="main">
                <Header
                  theme={theme}
                  toggleTheme={() =>
                    setTheme((prev) =>
                      prev === "light" ? "dark" : "light"
                    )
                  }
                  search={search}
                  setSearch={setSearch}
                />

                {/* ACTIVE TASKS */}
                <div className="task-card">
                  <div className="task-card-header">
                    <h2>{activeView}</h2>
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

                      <button
                        className="task-delete"
                        onClick={() => deleteTask(index)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>

                {/* COMPLETED TASKS */}
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

                      <button
                        className="task-delete"
                        onClick={() => deleteCompletedTask(index)}
                      >
                        <FiTrash2 />
                      </button>
                    </div>
                  ))}
                </div>
              </main>
            </div>
            {/* 👆 END OF YOUR ORIGINAL LAYOUT */}
          </>
        }
      />

    </Routes>
  </BrowserRouter>
);
}

export default App;
