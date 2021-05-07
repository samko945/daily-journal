const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const database = [];

app.get("/", function(req, res) {
    res.render("home", {content: database});
})

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    const newData = {
        title: req.body.title,
        text: req.body.text
    }
    database.push(newData);
    res.redirect("/");
    console.log(database)
})

app.get("/posts/:postTitle", function(req, res) {
    const route = req.params.postTitle.toLowerCase().split(" ").join("-");
    const post = database.find((item) => item.title.toLowerCase().split(" ").join("-") === route);
    if (post) {
        res.render("post", {content: post})
    }
})

app.listen(5000, function() {
    console.log("Server started on port 5000.");
})