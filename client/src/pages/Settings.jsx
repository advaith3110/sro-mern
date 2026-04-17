import { useContext } from "react";
import { AppContext } from "../context/appContext";

function Settings() {
  const {
    speed = 500, // ✅ fallback value (FIX)
    setSpeed,
    traffic,
    setTraffic,
  } = useContext(AppContext);

  /* ✅ SPEED LABEL */
  const getSpeedLabel = () => {
    if (speed <= 300) return "Fast ⚡";
    if (speed <= 700) return "Normal 🚀";
    return "Slow 🐢";
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        <h1 style={styles.heading}>Settings</h1>
        <p style={styles.sub}>Control animation speed & traffic simulation</p>
      </div>

      {/* SPEED CONTROL */}
      <div style={styles.box}>
        <p style={styles.label}>
          Animation Speed: <strong>{speed}</strong> ms ({getSpeedLabel()})
        </p>

        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => {
            if (setSpeed) setSpeed(Number(e.target.value)); // ✅ safe call
          }}
          style={styles.slider}
        />
      </div>

      {/* TRAFFIC TOGGLE */}
      <div style={styles.box}>
        <p style={styles.label}>Traffic Simulation</p>

        <button
          onClick={() => setTraffic((prev) => !prev)}
          style={{
            ...styles.toggleBtn,
            ...(traffic ? styles.toggleOn : styles.toggleOff),
          }}
        >
          {traffic ? "ON" : "OFF"}
        </button>
      </div>
    </div>
  );
}

/* ========================= STYLES ========================= */
const styles = {
  container: {
    width: "100%",
    maxWidth: "900px",
    margin: "0 auto",
    color: "white",
  },

  header: {
    textAlign: "center",
    marginBottom: "50px",
  },

  heading: {
    fontSize: "52px",
    fontWeight: "900",
    margin: "0",
    color: "#0ff6fa",
    letterSpacing: "1px",
    textShadow: `
      0 2px 4px rgba(0,0,0,0.5),
      0 6px 20px rgba(10,136,178,0.4)
    `,
  },

  sub: {
    marginTop: "18px",
    fontSize: "17px",
    color: "#94a3b8",
  },

  box: {
    marginBottom: "25px",
    padding: "20px",
    borderRadius: "16px",
    background: "rgba(255,255,255,0.05)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.1)",
    boxShadow: "0 8px 30px rgba(0,0,0,0.3)",
    textAlign: "center",
  },

  label: {
    marginBottom: "10px",
    fontSize: "16px",
    color: "#cbd5f5",
  },

  slider: {
    width: "60%",
    cursor: "pointer",
  },

  toggleBtn: {
    marginTop: "10px",
    padding: "10px 20px",
    borderRadius: "20px",
    fontWeight: "600",
    border: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },

  toggleOn: {
    background: "linear-gradient(135deg, #22c55e, #4ade80)",
    color: "white",
    boxShadow: "0 4px 15px rgba(34,197,94,0.5)",
  },

  toggleOff: {
    background: "linear-gradient(135deg, #475569, #1e293b)",
    color: "#cbd5f5",
  },
};

export default Settings;
