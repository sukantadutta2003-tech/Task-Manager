import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Header({ search, setSearch, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  };

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

      {/* RIGHT — Login / Avatar */}
      <div className="topbar-right">
        {!userEmail ? (
          <button className="login-btn" onClick={() => navigate("/login")}>
            Login
          </button>
        ) : (
          <div className="avatar-container" title={userEmail}>
            <div
              className="avatar-circle"
              onClick={handleLogout}
            >
              {userEmail.charAt(0).toUpperCase()}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;