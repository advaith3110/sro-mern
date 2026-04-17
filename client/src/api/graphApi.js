import axios from "axios";

const API = "http://localhost:5000/api/graph";

export const loadGraph = async () => {
  const res = await axios.get(`${API}/load`);
  return res.data;
};

export const saveGraph = async (nodes, edges) => {
  const res = await axios.post(`${API}/save`, {
    nodes,
    edges,
    name: "My Graph",
  });
  return res.data;
};

export const resetGraph = async () => {
  await axios.delete(`${API}/reset`);
};
