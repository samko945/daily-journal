const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb+srv://admin-samuel:Test123@cluster0.fypwv.mongodb.net/blogDB", {useNewUrlParser: true, useUnifiedTopology: true});

const postSchema = new mongoose.Schema({
    title: String,
    text: String,
    titleAddress: String
});

const Post = new mongoose.model("Post", postSchema);


app.get("/", function(req, res) {
    Post.find({}, function(err, docs) {
        res.render("home", { content: docs });
    }).catch(err => console.error(err))
})

app.get("/compose", function(req, res) {
    res.render("compose");
})

app.post("/compose", async function(req, res) {
    const titleAddress = req.body.title.toLowerCase().split(" ").join("-");
    const newPost = new Post ({
        title: req.body.title,
        text: req.body.text,
        titleAddress
    })
    await newPost.save();
    res.redirect("/")
})

app.get("/posts/:route", function(req, res) {
    Post.findOne({titleAddress: req.params.route}, function(err, doc) {
        if (doc) {
            res.render("post", {content: doc})
        }
    }).catch(err => console.error(err));
})

app.listen(5000, function() {
    console.log("Server started on port 5000.");
})