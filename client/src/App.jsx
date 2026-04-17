import { useState } from "react";
import {
  LayoutDashboard,
  BarChart3,
  Settings as SettingsIcon,
  Map as MapIcon,
} from "lucide-react";

import GraphCanvas from "./components/GraphCanvas";
import Graphs from "./pages/Graphs";
import Settings from "./pages/Settings";
import MapView from "./components/MapView";

function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div style={styles.app}>
      {/* SIDEBAR */}
      <div style={styles.sidebar}>
        <h2 style={styles.logo}>SRO</h2>

        <div
          style={page === "dashboard" ? styles.active : styles.menu}
          onClick={() => setPage("dashboard")}
        >
          <LayoutDashboard size={18} /> Dashboard
        </div>

        <div
          style={page === "graphs" ? styles.active : styles.menu}
          onClick={() => setPage("graphs")}
        >
          <BarChart3 size={18} /> Graphs
        </div>

        <div
          style={page === "map" ? styles.active : styles.menu}
          onClick={() => setPage("map")}
        >
          <MapIcon size={18} /> Map
        </div>

        <div
          style={page === "settings" ? styles.active : styles.menu}
          onClick={() => setPage("settings")}
        >
          <SettingsIcon size={18} /> Settings
        </div>
      </div>

      {/* MAIN */}
      <div style={styles.main}>
        {page === "dashboard" && (
          <>
            <div style={styles.header}>
              <h1 style={styles.heading}>Smart Route Optimizer</h1>
              <p style={styles.sub}>
                Visualizing shortest path using Dijkstra Algorithm
              </p>
            </div>

            <div style={styles.card}>
              <GraphCanvas />
            </div>
          </>
        )}

        {page === "map" && (
          <>
            <div style={styles.header}>
              <h1 style={styles.heading}>Map Routing</h1>
              <p style={styles.sub}>
                Select locations and visualize shortest path
              </p>
            </div>

            <div style={styles.card}>
              <MapView />
            </div>
          </>
        )}

        {page === "graphs" && <Graphs />}
        {page === "settings" && <Settings />}
      </div>
    </div>
  );
}

/* =========================
   FINAL FIXED STYLES
========================= */
const styles = {
  app: {
    display: "flex",
    width: "100vw",
    height: "100vh",
    background: "linear-gradient(135deg, #020617, #0f172a)",
    overflow: "hidden",
  },

  sidebar: {
    width: "230px",
    background: "#020617",
    padding: "25px",
    borderRight: "1px solid #1e293b",
  },

  logo: {
    fontSize: "28px",
    marginBottom: "30px",
    color: "#38bdf8",
  },

  menu: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    color: "#94a3b8",
    cursor: "pointer",
  },

  active: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
    padding: "10px",
    borderRadius: "8px",
    background: "#0ea5e9",
    color: "white",
  },

  main: {
    flex: 1,
    width: "100%", // ✅ FIX
    padding: "40px",
    overflowY: "auto",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "52px",
    fontWeight: "900",
    color: "#0ff6fa",
    textShadow: "0 6px 20px rgba(10,136,178,0.5)",
  },

  sub: {
    marginTop: "20px",
    color: "#94a3b8",
  },

  /* 🔥 FULL WIDTH CARD (FIXED) */
  card: {
    width: "100%", // ✅ FULL WIDTH
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
  },
};

export default App;
