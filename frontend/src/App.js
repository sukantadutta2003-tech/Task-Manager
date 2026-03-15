import { useState, useEffect } from "react";
import { FiTrash2 } from "react-icons/fi";
import Sidebar from "./components/Sidebar";
import "./styles/app.css";
import "./styles/theme.css";
import Header from "./components/Header";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Landing from "./pages/Landing/Landing";
import { fetchTasks, createTask, deleteTaskApi, toggleCompleteApi } from "./api";

function App() {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [search, setSearch] = useState("");
  const [activeView, setActiveView] = useState("Inbox");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  // Load tasks from backend on mount
  useEffect(() => {
    if (!isLoggedIn) return;

    fetchTasks()
      .then((allTasks) => {
        setTasks(allTasks.filter((t) => !t.completed));
        setCompleted(allTasks.filter((t) => t.completed));
      })
      .catch((err) => console.error("Failed to load tasks:", err));
  }, [isLoggedIn]);

  const handleAddTask = async (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      try {
        const savedTask = await createTask(inputValue.trim(), activeView);
        setTasks((prev) => [...prev, savedTask]);
      } catch (err) {
        console.error("Failed to create task:", err);
      }

      setInputValue("");
      setShowInput(false);
    }
  };

  const markCompleted = async (index) => {
    const task = filteredTasks[index];

    if (task.id) {
      try {
        await toggleCompleteApi(task.id);
      } catch (err) {
        console.error("Failed to complete task:", err);
        return;
      }
    }

    setTasks((prev) => prev.filter((t) => t.id !== task.id));
    setCompleted((prev) => [...prev, { ...task, completed: true }]);
  };

  const deleteTask = async (index) => {
    const task = filteredTasks[index];

    if (task.id) {
      try {
        await deleteTaskApi(task.id);
      } catch (err) {
        console.error("Failed to delete task:", err);
        return;
      }
    }

    setTasks((prev) => prev.filter((t) => t.id !== task.id));
  };

  const deleteCompletedTask = async (index) => {
    const task = completed[index];

    if (task.id) {
      try {
        await deleteTaskApi(task.id);
      } catch (err) {
        console.error("Failed to delete task:", err);
        return;
      }
    }

    setCompleted((prev) => prev.filter((_, i) => i !== index));
  };

  const filteredTasks = tasks.filter(
    (task) =>
      task.view === activeView &&
      (task.title || task.text || "").toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* LANDING PAGE — for unauthenticated users */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/app" replace />
            ) : (
              <Landing />
            )
          }
        />

        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

        {/* MAIN APP — protected, only for logged-in users */}
        <Route
          path="/app"
          element={
            !isLoggedIn ? (
              <Navigate to="/" replace />
            ) : (
              <>
                <Header
                  search={search}
                  setSearch={setSearch}
                  sidebarOpen={sidebarOpen}
                  setSidebarOpen={setSidebarOpen}
                />
                <div className="app">
                  <Sidebar
                    activeView={activeView}
                    setActiveView={setActiveView}
                    sidebarOpen={sidebarOpen}
                    setSidebarOpen={setSidebarOpen}
                  />

                  <main className="main">
                    <div className="task-header">
                      <h1>{activeView}</h1>
                    </div>

                    <div className="tasks-columns">
                      {/* ACTIVE TASKS */}
                      <div className="tasks-col">
                        <div className="task-card">
                          <div className="task-card-header">
                            <button
                              className="add-btn"
                              onClick={() => setShowInput(!showInput)}
                            >
                              Add Task
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
                            <div key={task.id} className="task-item">
                              <span
                                className="task-checkbox"
                                onClick={() => markCompleted(index)}
                              />
                              <span className="task-text">{task.title || task.text}</span>

                              <button
                                className="task-delete"
                                onClick={() => deleteTask(index)}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* COMPLETED TASKS */}
                      <div className="tasks-col completed-col">
                        <h3 className="col-title">Completed Tasks</h3>
                        <div className="task-card">
                          {completed.length === 0 && (
                            <p className="task-empty">No completed tasks</p>
                          )}

                          {completed.map((task, index) => (
                            <div key={task.id} className="task-item completed">
                              <span className="task-checkbox checked" />
                              <span className="task-text">{task.title || task.text}</span>

                              <button
                                className="task-delete"
                                onClick={() => deleteCompletedTask(index)}
                              >
                                <FiTrash2 />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </main>
                </div>
              </>
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
