import { useState, useContext, useEffect } from "react";
import axios from "axios";
import Node from "./Node";
import { AppContext } from "../context/AppContext";

// ✅ ONLY CHANGE: force correct backend
const API =
  import.meta.env.VITE_API_URL ||
  "https://sro-mern-beh4g2exd2fhbpch.eastasia-01.azurewebsites.net";

function GraphCanvas() {
  const { nodes, setNodes, edges, setEdges, traffic } = useContext(AppContext);

  const [selectedNode, setSelectedNode] = useState(null);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);

  const [highlightNodes, setHighlightNodes] = useState([]);
  const [distance, setDistance] = useState(null);

  const [mode, setMode] = useState("node");

  /* ========================= LABEL ========================= */
  const getLabel = (id) => {
    let label = "";
    let i = id;
    while (i >= 0) {
      label = String.fromCharCode((i % 26) + 65) + label;
      i = Math.floor(i / 26) - 1;
    }
    return label;
  };

  /* ========================= LOAD GRAPH ========================= */
  useEffect(() => {
    const loadGraph = async () => {
      try {
        const res = await axios.get(`${API}/api/graph/load`);
        

        if (nodes.length === 0 && edges.length === 0) {
          setNodes(res.data?.nodes || []);
          setEdges(res.data?.edges || []);
        }
      } catch (error) {
        console.log("Load Error:", error);
      }
    };

    loadGraph();
    // eslint-disable-next-line
  }, []);

  /* ========================= SAVE GRAPH ========================= */
  const saveGraph = async () => {
    console.log("SAVE CLICKED"); // debug

    try {
      await axios.post(`${API}/api/graph/save`, {
        nodes,
        edges,
      });

      alert("Graph Saved Successfully ✅");
    } catch (error) {
      console.log("Save Error:", error);
      alert("❌ Save failed");
    }
  };

  /* ========================= CLEAR ========================= */
  const clearCanvas = () => {
    setNodes([]);
    setEdges([]);
    setStartNode(null);
    setEndNode(null);
    setHighlightNodes([]);
    setDistance(null);
  };

  /* ========================= ADD NODE ========================= */
  const handleCanvasClick = (e) => {
    if (mode !== "node") return;

    const rect = e.currentTarget.getBoundingClientRect();

    setNodes((prev) => [
      ...prev,
      {
        id: prev.length,
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      },
    ]);
  };

  /* ========================= NODE CLICK ========================= */
  const handleNodeClick = (node) => {
    if (mode === "start") {
      setStartNode(node.id);
      return;
    }

    if (mode === "end") {
      setEndNode(node.id);
      return;
    }

    if (mode === "edge") {
      if (!selectedNode) {
        setSelectedNode(node);
      } else {
        const dist = Number(prompt("Enter Distance"));
        if (!dist || dist <= 0) return;

        let t = 0;

        if (traffic) {
          const trafficInput = prompt(
            "Enter Traffic Level (0 = no traffic, 5 = heavy)",
          );
          t = Number(trafficInput);
          if (isNaN(t) || t < 0) t = 0;
        }

        setEdges((prev) => [
          ...prev,
          {
            from: selectedNode.id,
            to: node.id,
            distance: dist,
            traffic: t,
          },
        ]);

        setSelectedNode(null);
      }
    }
  };

  /* ========================= FIND MIN EDGE ========================= */
  const findMinimumEdge = () => {
    if (edges.length === 0) {
      alert("No edges available");
      return;
    }

    let minEdge = edges[0];

    edges.forEach((e) => {
      const weight = traffic ? e.distance + (e.traffic || 0) : e.distance;

      const currentWeight = traffic
        ? minEdge.distance + (minEdge.traffic || 0)
        : minEdge.distance;

      if (weight < currentWeight) {
        minEdge = e;
      }
    });

    setHighlightNodes([minEdge.from, minEdge.to]);

    const finalDistance = traffic
      ? minEdge.distance + (minEdge.traffic || 0)
      : minEdge.distance;

    setDistance(finalDistance);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.panel}>
        <div style={styles.controls}>
          <button
            style={mode === "node" ? styles.active : styles.btn}
            onClick={() => setMode("node")}
          >
            Add Node
          </button>

          <button
            style={mode === "edge" ? styles.active : styles.btn}
            onClick={() => setMode("edge")}
          >
            Add Edge
          </button>

          <button
            style={mode === "start" ? styles.active : styles.btn}
            onClick={() => setMode("start")}
          >
            Start node
          </button>

          <button
            style={mode === "end" ? styles.active : styles.btn}
            onClick={() => setMode("end")}
          >
            End node
          </button>

          <button style={styles.run} onClick={findMinimumEdge}>
            🚀 Find shortest edge
          </button>

          <button
            style={styles.save}
            onClick={(e) => {
              e.stopPropagation(); // 🔥 VERY IMPORTANT
              saveGraph();
            }}
          >
            💾 Save
          </button>

          <button style={styles.clear} onClick={clearCanvas}>
            🧹 Clear canvas
          </button>
        </div>
      </div>

      {distance !== null && (
        <div style={styles.distance}>Shortest Edge Distance: {distance}</div>
      )}

      <div style={styles.canvas} onClick={handleCanvasClick}>
        <svg style={styles.svg}>
          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from);
            const to = nodes.find((n) => n.id === edge.to);
            if (!from || !to) return null;

            const isHighlight =
              highlightNodes.length === 2 &&
              ((edge.from === highlightNodes[0] &&
                edge.to === highlightNodes[1]) ||
                (edge.from === highlightNodes[1] &&
                  edge.to === highlightNodes[0]));

            const weight = traffic
              ? edge.distance + (edge.traffic || 0)
              : edge.distance;

            return (
              <g key={i}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={isHighlight ? "#22c55e" : "#64748b"}
                  strokeWidth={isHighlight ? 4 : 2}
                />

                <text
                  x={(from.x + to.x) / 2}
                  y={(from.y + to.y) / 2}
                  fill={isHighlight ? "#22c55e" : "#f87171"}
                  fontSize="14"
                  fontWeight="bold"
                  textAnchor="middle"
                >
                  {weight}
                </text>
              </g>
            );
          })}
        </svg>

        {nodes.map((node) => (
          <Node
            key={node.id}
            x={node.x}
            y={node.y}
            label={getLabel(node.id)}
            isSelected={selectedNode?.id === node.id}
            isStart={startNode === node.id}
            isEnd={endNode === node.id}
            isPath={highlightNodes.includes(node.id)}
            onClick={() => handleNodeClick(node)}
          />
        ))}
      </div>
    </div>
  );
}

/* ========================= STYLES ========================= */
const styles = {
  wrapper: { marginTop: "10px" },
  panel: { background: "#020617", padding: "20px", borderRadius: "16px" },
  controls: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  btn: {
    padding: "10px 16px",
    background: "#1e293b",
    color: "#cbd5f5",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  active: {
    padding: "10px 16px",
    background: "#22c55e",
    color: "white",
    borderRadius: "10px",
  },
  run: {
    padding: "10px 18px",
    background: "linear-gradient(135deg, #3b82f6, #06b6d4)",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  save: {
    padding: "10px 16px",
    background: "#22c55e",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  clear: {
    padding: "10px 16px",
    background: "#ef4444",
    color: "white",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
  },
  canvas: {
    width: "100%",
    height: "500px",
    borderRadius: "20px",
    background: "rgba(255,255,255,0.05)",
    position: "relative",
    marginTop: "15px",
  },
  svg: { width: "100%", height: "100%" },
  distance: {
    textAlign: "center",
    marginTop: "10px",
    color: "#22d3ee",
    fontWeight: "bold",
    fontSize: "18px",
  },
};

export default GraphCanvas;
