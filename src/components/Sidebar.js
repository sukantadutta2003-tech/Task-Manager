import { useState } from "react";
import {
  FiSun,
  FiInbox,
  FiCalendar,
  FiClock,
  FiFilter,
  FiUsers,
  FiShoppingBag,
  FiBook,
  FiBriefcase,
} from "react-icons/fi";

export default function Sidebar({ theme, toggleTheme }) {
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(true);

  return (
    <aside className="sidebar">
      {/* SIDEBAR TOP ACTION */}
      <div className="sidebar-top">
        <button className="hamburger-btn" aria-label="Toggle sidebar">
          ☰
        </button>
      </div>

      {/* MAIN */}
      <div className="sidebar-section">
        <div className="sidebar-item active">
          <FiInbox /> Inbox
        </div>
        <div className="sidebar-item">
          <FiCalendar /> Today
        </div>
        <div className="sidebar-item">
          <FiClock /> Scheduled
        </div>
        <div className="sidebar-item">
          <FiFilter /> Filter & Label
        </div>
      </div>

      <div className="sidebar-section">
        <p className="sidebar-label">CUSTOM LISTS</p>
        <div className="sidebar-item">
          <FiUsers /> Personal
        </div>
        <div className="sidebar-item">
          <FiUsers /> Family
        </div>
        <div className="sidebar-item">
          <FiShoppingBag /> Shopping
        </div>
        <div className="sidebar-item">
          <FiBook /> Academics
        </div>
        <div className="sidebar-item">
          <FiBriefcase /> Work
        </div>

        <div className="sidebar-create">+ Create Custom List</div>
      </div>
    </aside>
  );
}
