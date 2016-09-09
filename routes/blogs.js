var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

const User = require('../models/user');
const Blog = require('../models/blog');

router.post('/new', (req, res, next) => {
  const newBlog = new Blog({
    creator: {
      username: req.body.creator.username,
      id: req.body.creator.id,
    },
    images: req.body.images,
    tagline: req.body.tagline,
    title: req.body.title,
    body: req.body.body,
    comments: req.body.comments
  });
  newBlog.save((err) => {
    if (err) {
      res.send(err);
    }
    res.send(newBlog);
  });
})

module.exports = router;
