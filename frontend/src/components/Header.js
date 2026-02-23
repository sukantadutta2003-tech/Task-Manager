import { useNavigate } from "react-router-dom";

function Header({ search, setSearch, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  return (
    <header className="topbar">
      {/* LEFT — Logo */}
      <div className="topbar-left">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          ☰
        </button>
        <span className="topbar-logo">TaskLoom</span>
      </div>

      {/* CENTER — Search */}
      <div className="topbar-center">
        <input
          className="topbar-search"
          placeholder="Search tasks"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* RIGHT — Login Button */}
      <div className="topbar-right">
        <button className="login-btn" onClick={() => navigate("/login")}>
          Login
        </button>
      </div>
    </header>
  );
}

export default Header;
