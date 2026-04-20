import { useState } from "react";
import { AppContext } from "../context/AppContext";

const AppProvider = ({ children }) => {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [traffic, setTraffic] = useState(false);
  const [speed, setSpeed] = useState(500);
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

export default AppProvider;
