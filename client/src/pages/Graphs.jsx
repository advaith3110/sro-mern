import { useState, useEffect } from "react";
import axios from "axios";

function Graphs() {
  const [graphs, setGraphs] = useState([]);

  /* =========================
     LABEL CONVERSION (0 → A)
  ========================= */
  const getLabel = (id) => {
    let label = "";
    let i = id;
    while (i >= 0) {
      label = String.fromCharCode((i % 26) + 65) + label;
      i = Math.floor(i / 26) - 1;
    }
    return label;
  };

  /* =========================
     LOAD ALL GRAPHS ON PAGE OPEN
  ========================= */
  useEffect(() => {
    const loadGraphs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/graph/all");
        setGraphs(res.data);
      } catch (error) {
        console.error(error);
        alert("Failed to load graphs");
      }
    };

    loadGraphs();
  }, []);

  /* =========================
     CLEAR ALL DATA (DB ONLY)
  ========================= */
  const clearAllGraphs = async () => {
    if (!window.confirm("Delete ALL graphs from database?")) return;

    try {
      await axios.delete("http://localhost:5000/api/graph/reset");
      setGraphs([]);
      alert("All graphs deleted from DB");
    } catch (error) {
      console.error(error);
      alert("Failed to clear data");
    }
  };

  /* =========================
     FORMAT DATE
  ========================= */
  const formatDate = (date) => {
    return new Date(date).toLocaleString();
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Graph Analytics</h1>
        <p style={styles.sub}>Analyze saved routes, distance & traffic</p>
      </div>

      {/* ACTION BUTTONS */}
      <div style={styles.actions}>
        <button style={styles.clearBtn} onClick={clearAllGraphs}>
          🗑 Clear Data
        </button>
      </div>

      {/* GRAPH LIST */}
      {graphs.length === 0 ? (
        <p style={styles.empty}>No saved graphs found</p>
      ) : (
        <div style={styles.grid}>
          {graphs.map((g, i) => (
            <div key={g._id} style={styles.card}>
              <h3 style={styles.cardTitle}>Graph #{i + 1}</h3>

              <p style={styles.date}>Created: {formatDate(g.createdAt)}</p>

              <p>Total Nodes: {g.nodes.length}</p>
              <p>Total Edges: {g.edges.length}</p>

              <div style={styles.edgesBox}>
                {g.edges.map((e, idx) => (
                  <div key={idx} style={styles.edge}>
                    {getLabel(e.from)} → {getLabel(e.to)} | Distance:{" "}
                    {e.distance} | Traffic: {e.traffic || 0}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* =========================
   STYLES (PREMIUM UI)
========================= */
const styles = {
  container: {
    width: "100%",
    maxWidth: "1100px",
    margin: "0 auto",
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "40px",
  },

  heading: {
    fontSize: "64px",
    fontWeight: "900",
    background: "linear-gradient(90deg, #22d3ee, #06b6d4, #0ea5e9)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    textShadow: "0 0 25px rgba(34, 211, 238, 0.6)",
    letterSpacing: "1px",
  },

  sub: {
    marginTop: "15px",
    color: "#94a3b8",
    fontSize: "16px",
  },

  actions: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "30px",
  },

  clearBtn: {
    padding: "12px 25px",
    borderRadius: "10px",
    background: "#ef4444",
    color: "white",
    border: "none",
    cursor: "pointer",
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    marginTop: "30px",
    color: "#94a3b8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px",
  },

  card: {
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },

  cardTitle: {
    marginBottom: "10px",
    color: "#22d3ee",
    fontSize: "20px",
  },

  date: {
    fontSize: "14px",
    color: "#94a3b8",
    marginBottom: "10px",
  },

  edgesBox: {
    marginTop: "10px",
  },

  edge: {
    fontSize: "14px",
    color: "#cbd5f5",
    marginBottom: "5px",
  },
};

export default Graphs;
