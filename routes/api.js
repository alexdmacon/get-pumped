const mongoose = require("mongoose");
const router = require("express").Router();
const Workout = require("../models/workout.js");

// creates a new Workout instance
router.post("/api/workouts", ({ body }, res) => {
  Workout.create(body)
    .then((dbWorkout) => {

      console.log(dbWorkout);

      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// fetches workouts
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

// gets workouts from db for display on "/stats" page. Is this where I would dynamically populate duration?
router.get("/api/workouts/range", (req, res) => {
	Workout.find({}, null, { sort: { day: 1 } })
    .limit(7)

		.then((dbWorkout) => {
			res.json(dbWorkout);
		})
		.catch((err) => {
			res.json(err);
		});
});


// updates a workout with an exercise
router.put("/api/workouts/:id", (req, res) => {
	var workoutID = req.params.id;
	Workout.create(req.body)
		.then(({ _id }) =>
			Workout.findOneAndUpdate(
				{ _id: workoutID },
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


module.exports = router;
/* > **Important:** Look into using a MongoDB aggregate function to dynamically add up and return the total duration for each workout. Check out the [MongoDB documentation on the $addFields](https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/), the [MongoDB documentation on the $sum operator](https://docs.mongodb.com/manual/reference/operator/aggregation/sum/), and the [Mongoose documentation on aggregate functions](https://mongoosejs.com/docs/api.html#aggregate_Aggregate) to learn how it can be accomplished.
 */
