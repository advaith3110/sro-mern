import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import graphRoutes from "./routes/graphRoutes.js";

const app = express();

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

// API Routes
app.use("/api/graph", graphRoutes);

// ✅ SERVE FRONTEND (IMPORTANT)
app.use(express.static(path.join(__dirname, "../client/dist")));

// ✅ CATCH ALL (React routing)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
