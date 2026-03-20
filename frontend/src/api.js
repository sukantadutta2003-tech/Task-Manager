const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export async function fetchTasks() {
  const res = await fetch(`${API_BASE}/api/tasks`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch tasks");
  return res.json();
}

export async function createTask(title, view) {
  const res = await fetch(`${API_BASE}/api/tasks`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, view }),
  });
  if (!res.ok) throw new Error("Failed to create task");
  return res.json();
}

export async function deleteTaskApi(id) {
  const res = await fetch(`${API_BASE}/api/tasks/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to delete task");
}

export async function toggleCompleteApi(id) {
  const res = await fetch(`${API_BASE}/api/tasks/${id}/complete`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to toggle task");
  return res.json();
}
