const express = require("express");
const path = require("path");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;

const app = express();

const db = require("./models");

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
app.get("/api/workout", (req, res) => {
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
app.post("/api/workout", (req, res) => {
  db.Workout.create(req.body)
  .then((dbWorkout) => {
    res.json(dbWorkout);
  })
  .catch((err) => {
    res.json(err);
  });
})

// updating the workout
app.put("/api/workout/:id", (req, res) => {
    var workoutId = req.params.id;
    db.Exercise.create(req.body)
    .then(({ _id }) => 
      db.Workout.findOneAndUpdate(
        { id: workoutId },
        { $push: { exercises: _id } },
        { new: true }
      )
    )
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.json(err);
    });
});
// get the workouts to the stats dashboard
app.get("/api/workout/range", (req, res) => {
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
  