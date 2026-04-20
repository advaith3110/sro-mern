import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  useMapEvents,
  Tooltip,
} from "react-leaflet";
import { useState } from "react";
import L from "leaflet"; // ✅ ADD THIS
import "leaflet/dist/leaflet.css";

/* =========================
   ✅ FIX FOR VERCEL MARKERS
========================= */
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

/* =========================
   CLICK HANDLER
========================= */
function ClickHandler({ addNode }) {
  useMapEvents({
    click(e) {
      addNode([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
}

/* =========================
   DISTANCE FUNCTION (Haversine)
========================= */
const getDistance = (a, b) => {
  const R = 6371; // km
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLon = ((b[1] - a[1]) * Math.PI) / 180;

  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;

  const x =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);

  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * y; // distance in km
};

/* =========================
   DIJKSTRA
========================= */
const dijkstra = (nodes, edges, start, end) => {
  const dist = {};
  const prev = {};
  const visited = new Set();

  nodes.forEach((_, i) => (dist[i] = Infinity));
  dist[start] = 0;

  while (visited.size < nodes.length) {
    let u = null;

    for (let i = 0; i < nodes.length; i++) {
      if (!visited.has(i) && (u === null || dist[i] < dist[u])) {
        u = i;
      }
    }

    if (u === null) break;
    visited.add(u);

    edges.forEach((e) => {
      if (e.from === u) {
        const alt = dist[u] + e.weight;
        if (alt < dist[e.to]) {
          dist[e.to] = alt;
          prev[e.to] = u;
        }
      }
    });
  }

  const path = [];
  let curr = end;

  while (curr !== undefined) {
    path.unshift(curr);
    curr = prev[curr];
  }

  return {
    path,
    distance: dist[end],
  };
};

/* =========================
   MAIN COMPONENT
========================= */
function MapView() {
  const [nodes, setNodes] = useState([]);
  const [path, setPath] = useState([]);
  const [distance, setDistance] = useState(null);

  const addNode = (coords) => {
    setNodes((prev) => [...prev, coords]);
  };

  const calculateShortestPath = () => {
    if (nodes.length < 2) return;

    const edges = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = 0; j < nodes.length; j++) {
        if (i !== j) {
          edges.push({
            from: i,
            to: j,
            weight: getDistance(nodes[i], nodes[j]),
          });
        }
      }
    }

    const result = dijkstra(nodes, edges, 0, nodes.length - 1);

    setPath(result.path.map((i) => nodes[i]));
    setDistance(result.distance.toFixed(2));
  };

  return (
    <div style={styles.wrapper}>
      <MapContainer center={[13.3, 74.7]} zoom={7} style={styles.map}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        <ClickHandler addNode={addNode} />

        {nodes.map((pos, i) => (
          <Marker key={i} position={pos}>
            <Tooltip permanent direction="top">
              {i + 1}
            </Tooltip>
          </Marker>
        ))}

        {path.length > 1 && (
          <Polyline
            positions={path}
            pathOptions={{
              color: "#00f5ff",
              weight: 5,
            }}
          />
        )}
      </MapContainer>

      {distance && (
        <div style={styles.distance}>Shortest Distance: {distance} km</div>
      )}

      <div style={styles.buttonWrapper}>
        <button style={styles.btn} onClick={calculateShortestPath}>
          🚀 Show Shortest Path
        </button>
      </div>
    </div>
  );
}

/* =========================
   STYLES (UNCHANGED)
========================= */
const styles = {
  wrapper: {
    marginTop: "30px",
    width: "100%",
  },
  map: {
    height: "400px",
    borderRadius: "15px",
  },
  buttonWrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  btn: {
    padding: "14px 35px",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "white",
    border: "none",
    fontWeight: "bold",
    cursor: "pointer",
    boxShadow: "0 0 20px rgba(0,255,255,0.5)",
  },
  distance: {
    textAlign: "center",
    marginTop: "15px",
    color: "#22d3ee",
    fontWeight: "bold",
    fontSize: "18px",
  },
};

export default MapView;
