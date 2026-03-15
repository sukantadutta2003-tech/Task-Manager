import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { FiUser } from "react-icons/fi";

function Header({ search, setSearch, sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const email = localStorage.getItem("email");

    if (token && email) {
      setUserEmail(email);
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setDropdownOpen(false);
    window.location.href = "/";
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
          <button className="login-icon-btn" onClick={() => navigate("/login")}>
            <FiUser />
          </button>
        ) : (
          <div className="avatar-container" ref={dropdownRef}>
            <div
              className="avatar-circle"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              {userEmail.charAt(0).toUpperCase()}
            </div>

            {dropdownOpen && (
              <div className="avatar-dropdown">
                <div className="dropdown-item dropdown-label">My Account</div>
                <div className="dropdown-item">Settings</div>
                <div className="dropdown-item">Support</div>
                <div className="dropdown-divider" />
                <button className="dropdown-logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;