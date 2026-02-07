import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [newTask, setNewTask] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then((res) => res.json())
      .then(setTasks);
  }, []);

  const addTask = () => {
    if (!newTask.trim()) return;

    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: newTask,
        status: "ONGOING",
      }),
    })
      .then((res) => res.json())
      .then((task) => {
        setTasks([...tasks, task]);
        setNewTask("");
        setShowAdd(false);
      });
  };

  const deleteTask = (id) => {
    fetch(`http://localhost:8080/api/tasks/${id}`, {
      method: "DELETE",
    }).then(() => {
      setTasks(tasks.filter((t) => t.id !== id));
    });
  };

  const toggleStatus = (task) => {
    const updated = {
      ...task,
      status: task.status === "ONGOING" ? "COMPLETED" : "ONGOING",
    };

    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    })
      .then((res) => res.json())
      .then((saved) => {
        setTasks(tasks.map((t) => (t.id === saved.id ? saved : t)));
      });
  };

  const filteredTasks = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase()),
  );

  const allTasks = filteredTasks.filter((t) => t.status === "ONGOING");
  const completed = filteredTasks.filter((t) => t.status === "COMPLETED");

  return (
    <>
      {/* SEARCH BAR (REPLACES ADD TASK) */}
      <div className="card">
        <input
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              // nothing else needed, filtering already happens
            }
          }}
        />
      </div>

      {/* ALL TASKS */}
      <div className="card">
        <div className="card-header">
          <h3>All Tasks</h3>
          <button className="icon-btn" onClick={() => setShowAdd(!showAdd)}>
            ＋
          </button>
        </div>

        {showAdd && (
          <div className="inline-add">
            <input
              className="add-input"
              placeholder="Add new task..."
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addTask();
                }
              }}
            />

            <button onClick={addTask}>Add</button>
          </div>
        )}

        {allTasks.length === 0 && <p className="muted">No tasks found</p>}

        {allTasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleStatus}
          />
        ))}
      </div>

      {/* COMPLETED TASKS */}
      <div className="card">
        <h3>Completed Tasks</h3>

        {completed.length === 0 && <p className="muted">No completed tasks</p>}

        {completed.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggle={toggleStatus}
          />
        ))}
      </div>
    </>
  );
}

export default TaskList;
