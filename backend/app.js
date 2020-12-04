const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Post = require("./models/post");
const User = require("./models/user");

mongoose.connect("mongodb+srv://smit:smit@123@test.ks3tz.mongodb.net/node-angular?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(() => {
  console.log("connected ...");
}).catch(() => {
  console.log("Connection failed!");
});
// mongodb+srv://smit:smit@123@test.ks3tz.mongodb.net/node-angular?retryWrites=true&w=majority


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PATCH, DELETE, OPTIONS"
    );
    next();
  });


  app.post("/api/posts", (req, res, next) => {
    const post = new Post({
      title: req.body.title,
      content: req.body.content
    });
    post.save().then((createdPost) => {
      res.status(201).json({
        message: 'Post added successfully',
        postId: createdPost._id
      });
    });
    
  });

app.get('/api/posts', (req, res) => {
  Post.find().then((documents) => {
      res.status(200).json({
        message: "fetch successfully",
        posts: documents
      });
  });
});

app.delete('/api/posts/:id', (req, res) => {
  Post.deleteOne({"_id": req.params.id}).then((result) => {
    console.log(result);
      res.status(200).json({
        message: "Delete successfully"
      });
  });
});

app.get('/api/posts/:id', (req, res) => {
  Post.findById(req.params.id).then((document) => {
      res.status(200).json(document);
  });
});


app.post("/api/user", (req, res, next) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password
  });
  user.save().then((createdUser) => {
    res.status(201).json({
      message: 'User added successfully',
      postId: createdUser._id
    });
  });
  
});

module.exports = app;