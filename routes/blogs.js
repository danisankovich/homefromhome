var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

const User = require('../models/user');
const Blog = require('../models/blog');

router.post('/new', (req, res, next) => {
  console.log('123123123alsdkfjlkdsfjldskfjlkj')
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
  console.log('asdfdasf',newBlog)
  Blog.create(newBlog, (err, blog) => {
    console.log(err)
    res.json(blog)
  })
})

module.exports = router;
