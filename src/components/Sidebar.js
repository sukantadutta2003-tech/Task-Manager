import {
  FiInbox,
  FiCalendar,
  FiClock,
  FiFilter,
  FiUsers,
  FiShoppingBag,
  FiBook,
  FiBriefcase,
} from "react-icons/fi";

export default function Sidebar({
  activeView,
  setActiveView,
  sidebarOpen,
  setSidebarOpen,
}) {
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
      {/* TOP (HAMBURGER) */}
      <div className="sidebar-top">
        <button
          className="hamburger-btn"
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
      </div>

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
            {sidebarOpen && item.label}
          </div>
        ))}
      </div>

      {/* CUSTOM LISTS */}
      <div className="sidebar-section">
        {sidebarOpen && (
          <p className="sidebar-label">CUSTOM LISTS</p>
        )}

        {customItems.map((item) => (
          <div
            key={item.label}
            className={`sidebar-item ${
              activeView === item.label ? "active" : ""
            }`}
            onClick={() => setActiveView(item.label)}
          >
            {item.icon}
            {sidebarOpen && item.label}
          </div>
        ))}

        {sidebarOpen && (
          <div className="sidebar-create">+ Create Custom List</div>
        )}
      </div>
    </aside>
  );
}
