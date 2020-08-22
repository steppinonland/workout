// have to require the mongoose package
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
// need the date - type is Date
    day: { type: Date},
// need the exercises
    exercises: {
        type: Schema.Types.ObjectId,
        ref: "Exercise"
    }
});
// export the workout model
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;
