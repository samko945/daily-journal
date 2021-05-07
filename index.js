const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

const database = [];

app.get("/", function(req, res) {
    res.render("home");
})

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", function(req, res) {
    console.log(req.body)
    res.redirect("/");
})

app.listen(5000, function() {
    console.log("Server started on port 5000.");
})