var express = require('express');
var router = express.Router();
var config = require('../config');
var jwt = require('jwt-simple');
const User = require('../models/user');
const Blog = require('../models/blog');

exports.findAllBlogs = (req, res, next) => {
  Blog.find({}, (err, blogs) => {
    if (err) res.send(err);
    res.send(blogs);
  })
}

exports.newBlog = (req, res, next) => {
  const newBlog = {
    creator: {
      username: req.body.username,
      id: req.body.id,
    },
    images: req.body.images,
    tagline: req.body.tagline,
    title: req.body.title,
    keywords: req.body.keywords.split(' '),
    body: req.body.body,
    comments: req.body.comments
  };
  Blog.create(newBlog, (err, blog) => {
    if (err) res.send(err)
    User.findById(req.body.id, (err, user)=> {
      console.log(req.body.id, user)
      if(err) res.send(err);
      user.blogs.push(blog);
      user.save();
      res.json(user)
    })
  })
}

exports.findOneBlog = (req, res) => {
  Blog.findById(req.params.id, (err, blog) => {
    if (err) res.send(err)
    User.findById(blog.creator.id, (err, user) => {
      console.log(user.blogs);
      res.send({blog, blogList: user.blogs})
    })
  })
}
