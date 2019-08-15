const mongoose = require("mongoose");
const RoomsSchema = new mongoose.Schema(
  {
    publisher: { type: String, required: true },
    name: { type: String, required: true },
    description: String,
    image: String,
    language: String,
    link: String,
    schedule: { type: Date },
    begining: { type: Date },
    type: { type: String, required: true },
    tags: [String],
    active: Boolean
  },
  { timestamps: true }
);

module.exports = mongoose.model("Room", RoomsSchema);
