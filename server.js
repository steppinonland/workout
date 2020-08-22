const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
  useNewUrlParser: true,
});

// get the exercise
app.get("/exercise", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/exercise.html"));
})
// get the stats
app.get("/stats", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/stats.html"));
})


// get the workouts
app.get("/api/workouts", (req, res) => {
  db.Workout.find({}, null, { sort: { day: 1 } })
  .populate("exercises")
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.json(err);
  });
});

// creating new workout

// updating the workout

// get the workouts to the stats dashboard
app.get("/api/workouts/range", (req, res) => {
  db.Workout.find({}, { sort: { day: 1 } })
      .populate("exercises")
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err)  => {
        res.json(err);
      })
})




app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
  });
  