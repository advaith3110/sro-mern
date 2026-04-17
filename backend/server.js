import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import graphRoutes from "./routes/graphRoutes.js";

const app = express();

// ✅ FIXED CORS
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

// Routes
app.use("/api/graph", graphRoutes);

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Server
const PORT = process.env.PORT || 8080; // Azure prefers 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
