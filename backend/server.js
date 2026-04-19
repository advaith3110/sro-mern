import "dotenv/config";

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import graphRoutes from "./routes/graphRoutes.js";

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(
  cors({
    origin: "*",
  }),
);

app.use(express.json());

/* =========================
   ROOT ROUTE (HEALTH CHECK)
========================= */
app.get("/", (req, res) => {
  res.send("SRO-MERN Backend API is running 🚀");
});

/* =========================
   API ROUTES
========================= */
app.use("/api/graph", graphRoutes);

/* =========================
   START SERVER ONLY AFTER DB CONNECTS
========================= */
const PORT = process.env.PORT || 8080;

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected ✅");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT} 🚀`);
    });
  } catch (err) {
    console.error("MongoDB ERROR ❌:", err.message);
    process.exit(1);
  }
};

startServer();
