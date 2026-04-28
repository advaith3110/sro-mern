import express from "express";
import Graph from "../models/graph.js";

const router = express.Router();

/* =========================
   ROOT CHECK
========================= */
router.get("/", (req, res) => {
  res.json({ message: "Graph API is running 🚀" });
});

/* =========================
   SAVE GRAPH
========================= */
router.post("/save", async (req, res) => {
  try {
    console.log("📥 Incoming:", req.body);

    const { nodes, edges } = req.body;

    if (!Array.isArray(nodes) || !Array.isArray(edges)) {
      return res.status(400).json({
        message: "Invalid data format",
      });
    }

    const newGraph = new Graph({
      nodes,
      edges,
    });

    const savedGraph = await newGraph.save();

    console.log("✅ Saved:", savedGraph._id);

    res.status(201).json({
      message: "Graph saved successfully",
      graph: savedGraph,
    });
  } catch (error) {
    console.error("❌ SAVE ERROR:", error.message);

    res.status(500).json({
      message: "Error saving graph",
      error: error.message,
    });
  }
});

/* =========================
   LOAD LATEST GRAPH
========================= */
router.get("/load", async (req, res) => {
  try {
    const graph = await Graph.findOne().sort({ createdAt: -1 });

    if (!graph) {
      return res.json({ nodes: [], edges: [] });
    }

    res.json(graph);
  } catch (error) {
    res.status(500).json({
      message: "Error loading graph",
      error: error.message,
    });
  }
});

/* =========================
   RESET
========================= */
router.delete("/reset", async (req, res) => {
  try {
    await Graph.deleteMany({});
    res.json({ message: "Graph reset successful" });
  } catch (error) {
    res.status(500).json({
      message: "Error resetting graph",
      error: error.message,
    });
  }
});

/* =========================
   GET ALL (FIXED ORDER)
========================= */
router.get("/all", async (req, res) => {
  try {
    const graphs = await Graph.find().sort({ createdAt: 1 }); // ✅ FIXED
    res.json(graphs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching graphs",
      error: error.message,
    });
  }
});

/* =========================
   DELETE
========================= */
router.delete("/:id", async (req, res) => {
  try {
    await Graph.findByIdAndDelete(req.params.id);
    res.json({ message: "Graph deleted successfully" });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting graph",
      error: error.message,
    });
  }
});

export default router;
