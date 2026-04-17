const express = require("express");
const router = express.Router();

const {
  getShortestRoute,
  getAllRoutes,
  addRoute,
  updateRoute,
  deleteRoute,
} = require("../controllers/routeController.js");

// Existing
router.post("/shortest", getShortestRoute);

// NEW CRUD
router.get("/", getAllRoutes);
router.post("/add", addRoute);
router.put("/:id", updateRoute);
router.delete("/:id", deleteRoute);

module.exports = router;
