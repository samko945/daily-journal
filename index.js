const express = require("express");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.render("home");
})

app.listen(5000, function() {
    console.log("Server started on port 5000.");
})