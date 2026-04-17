import express from "express";
import Graph from "../models/graph.js";

const router = express.Router();

/* =========================
   SAVE OR UPDATE GRAPH
   POST /api/graph/save
========================= */
router.post("/save", async (req, res) => {
  try {
    console.log("Incoming Data:", req.body);

    const { nodes, edges, name } = req.body;

    // ✅ ALWAYS CREATE NEW GRAPH (NO OVERWRITE)
    const newGraph = new Graph({
      nodes,
      edges,
      name: name || "Untitled Graph",
    });

    await newGraph.save();

    res.status(201).json({
      message: "Graph saved successfully",
      graph: newGraph,
    });
  } catch (error) {
    console.error("SAVE ERROR:", error);
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
  RESET ALL GRAPHS
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
  GET ALL GRAPHS
========================= */
router.get("/all", async (req, res) => {
  try {
    const graphs = await Graph.find().sort({ createdAt: -1 });
    res.json(graphs);
  } catch (error) {
    res.status(500).json({
      message: "Error fetching graphs",
      error: error.message,
    });
  }
});

/* =========================
  DELETE GRAPH BY ID
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
