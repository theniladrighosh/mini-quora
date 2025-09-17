const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");

app.use(express.urlencoded({extended : true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let posts = [
    {
        id : uuidv4(),
        username : "nil",
        content : "I love coding!"
    },
    {
        id : uuidv4(),
        username : "niladri",
        content : "A dream without action, is just a wish."
    },
    {
        id : uuidv4(),
        username : "shreya",
        content : "Dream big & chase them."
    },
];

//creating new routes
app.get("/posts", (req,res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req,res) => {
    res.render("new.ejs");
});

//search post by id
app.get("/posts/:id", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("show.ejs", {post});
});

//creating new post
app.post("/posts", (req,res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

//editing content
app.patch("/posts/:id", (req,res) => {
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=> id === p.id);
    console.log(post);
    post.content = newContent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req,res) => {
    let {id} = req.params;
    let post = posts.find((p)=> id === p.id);
    res.render("edit.ejs", {post});
});

//deleting post
app.delete("/posts/:id", (req,res) => {
    let {id} = req.params;
    posts = posts.filter((p)=> id !== p.id);
    res.redirect("/posts");
});

//declaring port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});