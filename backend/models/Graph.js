import mongoose from "mongoose";

/* =========================
   NODE SCHEMA
========================= */
const nodeSchema = new mongoose.Schema({
  id: {
    type: Number, // ✅ must match frontend (0,1,2...)
    required: true,
  },
  x: {
    type: Number,
    required: true,
  },
  y: {
    type: Number,
    required: true,
  },
});

/* =========================
   EDGE SCHEMA
========================= */
const edgeSchema = new mongoose.Schema({
  from: {
    type: Number, // ✅ matches frontend
    required: true,
  },
  to: {
    type: Number, // ✅ matches frontend
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  traffic: {
    type: Number,
    default: 0, // ✅ traffic optional
  },
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

    nodes: [nodeSchema],
    edges: [edgeSchema],
  },
  {
    timestamps: true, // ✅ adds createdAt & updatedAt
  },
);

export default mongoose.model("Graph", graphSchema);
