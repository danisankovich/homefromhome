var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

const User = require('../models/user');
const Blog = require('../models/blog');

router.get('/', (req, res) => {
  Blog.find({}, (err, blogs) => {
    if (err) res.send(err);
    console.log(blogs);
    res.send(blogs);
  })
})

router.post('/new', (req, res, next) => {
  const newBlog = {
    creator: {
      username: req.body.username,
      id: req.body.id,
    },
    images: req.body.images,
    tagline: req.body.tagline,
    title: req.body.title,
    body: req.body.body,
    comments: req.body.comments
  };
  Blog.create(newBlog, (err, blog) => {
    if (err) res.send(err)
    User.findById(req.body.id, (err, user)=> {
      if(err) res.send(err);
      user.blogs.push(blog);
      user.save();
      res.json(user)
    })
  })
})

router.get('/:id', (req, res) => {
  console.log(req.params.id);
  Blog.findById(req.params.id, (err, blog) => {
    if (err) res.send(err)
    console.log(blog)
    res.send(blog)
  })
})

module.exports = router;
