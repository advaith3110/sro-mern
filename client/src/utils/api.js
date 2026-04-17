import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const getShortestRoute = (data) => {
  return API.post("/routes/shortest", data);
};
