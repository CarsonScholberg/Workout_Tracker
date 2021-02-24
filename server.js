const express = require("express")
const logger = require("morgan")
const path = require("path")
const mongoose = require("mongoose")
const db = require("./models");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"))

mongoose.connect("mongodb://localhost/workout", {
  useNewUrlParser: true,
  useFindAndModify: false
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});

app.get("/api/workouts", (req, res) => {
    db.Workout.find({})
        .then(data => {
            res.json(data)
        })
})

let totalDuration;

app.post("/api/workouts", (req, res) => {
    totalDuration=0;
    db.Workout.create({})
        .then(created => {
            res.json(created)
        })
})

app.put("/api/workouts/:id", (req, res) => {
    let id = req.params.id;
    let data = req.body;

    totalDuration += data.duration;

    db.Workout.updateOne({_id: id},
        {
            $push: {exercises: data},
            totalDuration: totalDuration
        }
    ).then(updated => {
        res.send(updated)
    })
})

app.get("/api/workouts/range", (req, res) => {
    db.Workout.find({})
        .then(data => {
            res.json(data)
        })
})
app.listen(PORT, ()=> {
    console.log("ay")
})