import React from "react";

function Header({ theme, toggleTheme, search, setSearch }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-title">TaskFlow</span>
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
