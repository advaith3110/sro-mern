const Route = require("../models/Route");
const dijkstra = require("../algorithms/dijkstra");

// ======================
// SHORTEST PATH
// ======================
exports.getShortestRoute = async (req, res) => {
  try {
    const { start, end } = req.body;

    if (!start || !end) {
      return res.status(400).json({ message: "Start and End required" });
    }

    const routes = await Route.find();

    if (!routes.length) {
      return res.status(404).json({ message: "No routes found in DB" });
    }

    const graph = {};

    routes.forEach((r) => {
      if (!graph[r.from]) graph[r.from] = {};
      graph[r.from][r.to] = r.distance + r.traffic;

      if (!graph[r.to]) graph[r.to] = {};
      graph[r.to][r.from] = r.distance + r.traffic;
    });

    const result = dijkstra(graph, start, end);

    if (!result.path.length) {
      return res.status(404).json({ message: "No path found" });
    }

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ======================
// GET ALL ROUTES
// ======================
exports.getAllRoutes = async (req, res) => {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: "Error fetching routes" });
  }
};

// ======================
// ADD ROUTE
// ======================
exports.addRoute = async (req, res) => {
  try {
    const { from, to, distance, traffic } = req.body;

    if (!from || !to || !distance) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newRoute = new Route({
      from,
      to,
      distance,
      traffic: traffic || 0,
    });

    await newRoute.save();

    res.status(201).json(newRoute);
  } catch (err) {
    res.status(500).json({ message: "Error adding route" });
  }
};

// ======================
// UPDATE ROUTE
// ======================
exports.updateRoute = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Route.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating route" });
  }
};

// ======================
// DELETE ROUTE
// ======================
exports.deleteRoute = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Route.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Route not found" });
    }

    res.json({ message: "Route deleted" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting route" });
  }
};
