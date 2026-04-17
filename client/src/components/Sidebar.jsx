import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  return (
    <div className="sidebar">
      <h2 className="logo">SRO</h2>

      <nav>
        <Link to="/" className={location.pathname === "/" ? "active" : ""}>
          📊 Dashboard
        </Link>

        <Link
          to="/graphs"
          className={location.pathname === "/graphs" ? "active" : ""}
        >
          📈 Graphs
        </Link>

        {/* 🔥 NEW MAP SECTION */}
        <Link
          to="/map"
          className={location.pathname === "/map" ? "active" : ""}
        >
          🗺️ Map
        </Link>

        <Link
          to="/settings"
          className={location.pathname === "/settings" ? "active" : ""}
        >
          ⚙️ Settings
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
