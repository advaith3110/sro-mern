import mongoose from "mongoose";

/* =========================
   NODE SCHEMA
========================= */
const nodeSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  x: { type: Number, required: true },
  y: { type: Number, required: true },
});

/* =========================
   EDGE SCHEMA
========================= */
const edgeSchema = new mongoose.Schema({
  from: { type: Number, required: true },
  to: { type: Number, required: true },
  distance: { type: Number, required: true },
  traffic: { type: Number, default: 0 },
});

/* =========================
   GRAPH SCHEMA
========================= */
const graphSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "Untitled Graph",
    },
    nodes: {
      type: [nodeSchema],
      default: [],
    },
    edges: {
      type: [edgeSchema],
      default: [],
    },
  },
  { timestamps: true },
);

export default mongoose.model("Graph", graphSchema);
