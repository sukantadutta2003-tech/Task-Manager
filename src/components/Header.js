import React from "react";
import { useNavigate } from "react-router-dom";

function Header({ theme, toggleTheme, search, setSearch }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="topbar-title"
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
          }}
          onClick={() => navigate("/login")}
        >
          Login
        </button>
      </div>

      <div className="topbar-center">
        <input
          className="topbar-search"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="topbar-right">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}

export default Header;

