const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  // type
  type: String,
  // name
  name: String,
  // duration
  duration: Number,
  // distance
  distance: Number,
  // weight
  weight: Number,
  // reps
  reps: Number,
  // sets
  sets: Number
});

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;
