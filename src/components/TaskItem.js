function TaskItem({ task, onDelete, onToggle }) {
  return (
    <div className="task-item">
      <label className="task-left">
        <input
          type="checkbox"
          checked={task.status === "COMPLETED"}
          onChange={() => onToggle(task)}
        />
        <span className={task.status === "COMPLETED" ? "done" : ""}>
          {task.title}
        </span>
      </label>

      <button className="delete-btn" onClick={() => onDelete(task.id)}>
        ✕
      </button>
    </div>
  );
}

export default TaskItem;

