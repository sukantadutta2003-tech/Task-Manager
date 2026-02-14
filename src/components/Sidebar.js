import { useState } from "react";
import {
  FiInbox,
  FiCalendar,
  FiClock,
  FiFilter,
  FiUsers,
  FiShoppingBag,
  FiBook,
  FiBriefcase,
  FiChevronDown,
  FiChevronUp,
} from "react-icons/fi";

export default function Sidebar({
  activeView,
  setActiveView,
  sidebarOpen,
  setSidebarOpen,
}) {
  const [customOpen, setCustomOpen] = useState(true);

  const mainItems = [
    { label: "Inbox", icon: <FiInbox /> },
    { label: "Today", icon: <FiCalendar /> },
    { label: "Scheduled", icon: <FiClock /> },
    { label: "Filter", icon: <FiFilter /> },
  ];

  const customItems = [
    { label: "Personal", icon: <FiUsers /> },
    { label: "Family", icon: <FiUsers /> },
    { label: "Shopping", icon: <FiShoppingBag /> },
    { label: "Academics", icon: <FiBook /> },
    { label: "Work", icon: <FiBriefcase /> },
  ];

  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "collapsed"}`}>
      {/* MAIN */}
      <div className="sidebar-section">
        {mainItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${
              activeView === item.label ? "active" : ""
            }`}
            onClick={() => setActiveView(item.label)}
          >
            {item.icon}
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* CUSTOM LISTS */}
      <div className="sidebar-section">
        {sidebarOpen && (
          <div
            className="sidebar-title toggle"
            onClick={() => setCustomOpen(!customOpen)}
          >
            CUSTOM LISTS
            {customOpen ? <FiChevronUp /> : <FiChevronDown />}
          </div>
        )}

        <div
          className={`custom-lists ${
            customOpen && sidebarOpen ? "open" : ""
          }`}
        >
          {customItems.map((item) => (
            <div
              key={item.label}
              className={`sidebar-item ${
                activeView === item.label ? "active" : ""
              }`}
              onClick={() => setActiveView(item.label)}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}

          {sidebarOpen && (
            <div className="sidebar-create">+ Create Custom List</div>
          )}
        </div>
      </div>
    </aside>
  );
}
