# get-pumped

## Description
This is a workout/fitness tracker built using MongoDB, the Mongoose library, Node.js, and Express.js, among other technologies. My primary interest in this project was to continue practicing and learning more about back-end databases, Express routes, and data schema. Creating a remote database via MongoDB Atlas and connecting it to the deployed app on Heroku was also interesting.

The user can log their workouts, recording their exercise type (cardio or resistance) along with specific details including the duration of each exercise, the number of sets, the number of reps, the distance covered, etc. The date and details of the user's most recent workout appear on the homepage, with the option to either "continue" that workout by adding more exercises or to start a new workout. A stats dashboard will visually chart all of that data, which is stored in a remote database using MongoDB Atlas.

[The app is deployed here on Heroku](https://intense-scrubland-30180.herokuapp.com/)

![gif](/assets/images/fitness-tracker.gif)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Credits](#credits)

## Installation

The app is deployed via Heroku and requires no installation for use. If you'd like to run this locally, or tinker with the app yourself, download or clone the code off of this GitHub repo. Enter `npm install` from a CLI to install the dependencies and libraries you'll need, including Mongoose and Express.js. Make sure you have the MongoDB shell installed. Enter `npm run seed` to seed your local database. Entering `npm run start` will launch the app locally. Code away.

The bulk of the work done here came in writing API routes for the database, like this one:
```
router.get("/api/workouts/range", (req, res) => {
  Workout.aggregate([
    {
      $addFields: {
        totalDuration: { $sum: "$exercises.duration" },
        totalWeight: { $sum: "$exercises.weight" },
      },
    },
  ])
    .limit(7)
    .sort({ date: -1 })
    .then((dbWorkout) => {
      res.json(dbWorkout);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});
```

## Usage

From the home page, you'll see the data from your last recorded workout. From here, you can choose to either add data on a new workout, or add more exercise data to the last workout that is shown.

![Fitness Tracker home page](/assets/images/fitness-home.png)

Choose whether your exercise was "cardio" or "resistance" and then log the details on the exercise you're logging. Hit "complete" to go back to the home page, or "add exercise" to add another exercise to the current workout.

![Fitness Tracker add page](/assets/images/fitness-add.png)

Click "dashboard" in the nav bar to see a data visualization of your 7 most recent workouts.

![Fitness Tracker stats page](/assets/images/fitness-stats.png)

Have a great day.


## Credits

The following links and documentation are just a sampling of the online resources that proved helpful as I was working on this. I also consulted with classmates in my coding bootcamp and with my tutor. 

- https://docs.mongodb.com/manual/reference/operator/update/push/
- https://docs.mongodb.com/manual/reference/operator/aggregation/addFields/
- https://docs.mongodb.com/manual/reference/operator/aggregation/sum/
- https://mongoosejs.com/docs/api.html#aggregate_Aggregate
- https://www.mongodb.com/developer/how-to/seed-database-with-fake-data/
- https://www.youtube.com/watch?v=tpz-6Trd1UI&ab_channel=MongoDB
- https://docs.atlas.mongodb.com/import/mongorestore/
- https://devcenter.heroku.com/articles/
- https://dev.to/lawrence_eagles/causes-of-heroku-h10-app-crashed-error-and-how-to-solve-them-3jnl

