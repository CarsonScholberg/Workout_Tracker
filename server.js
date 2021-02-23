const express = require("express")
const logger = require("morgan")
const path = require("path")

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"))

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/index.html"))
});

app.get("/exercise", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/exercise.html"))
});

app.get("/stats", (req,res) => {
    res.sendFile(path.join(__dirname, "./public/stats.html"))
});


app.listen(PORT, ()=> {
    console.log("ay")
})