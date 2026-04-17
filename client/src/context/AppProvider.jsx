import { useState } from "react";
import { AppContext } from "../context/appContext";

export const AppProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [traffic, setTraffic] = useState(false);
  const [speed, setSpeed] = useState(500);
  // ✅ CRITICAL FIX (for clear canvas issue)
  const [isCanvasCleared, setIsCanvasCleared] = useState(false);

  return (
    <AppContext.Provider
      value={{
        nodes,
        setNodes,
        edges,
        setEdges,
        traffic,
        setTraffic,
        speed,
        setSpeed,

        isCanvasCleared,
        setIsCanvasCleared,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
