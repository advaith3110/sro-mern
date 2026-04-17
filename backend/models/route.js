const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema({
  from: {
    type: String,
    required: true,
  },
  to: {
    type: String,
    required: true,
  },
  distance: {
    type: Number,
    required: true,
  },
  traffic: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Route", routeSchema);
