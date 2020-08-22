const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  // type
  // name
  // duration
  // distance
  // weight
  // reps
  // sets
});

const Exercise = mongoose.model("exercise", exerciseSchema);

module.exports = Exercise;
