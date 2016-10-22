var express = require('express');
var router = express.Router();
var config = require('../config');
var jwt = require('jwt-simple');
var User = require('../models/user');
var Blog = require('../models/blog');

exports.findAllBlogs = (req, res, next) => {
  var keywords = req.params.id.split('_');
  if (!keywords || keywords.length === 0 || req.params.id === 'undefined') {
    Blog.find({}, (err, blogs) => {
      if (err) res.send(err);
      res.send(blogs);
    })
  } else if (req.params.id !== 'undefined' && req.query.type === 'inclusive'){
    Blog.find({keywords: {
      $in : keywords
    }}, (err, blogs) => {
      if (err) res.send(err);
      res.send(blogs);
    })
  } else {
    Blog.find({keywords: {
      $all : keywords
    }}, (err, blogs) => {
      if (err) res.send(err);
      res.send(blogs);
    })
  }
}

exports.newBlog = (req, res, next) => {
  var newBlog = {
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
    else if (!err && blog && blog.creator) {
      User.findById(blog.creator.id, (err, user) => {
        res.send({blog, blogList: user.blogs})
      })
    } else {
      res.send("NOTHING FETCHED")
    }
  })
}

exports.newBlogComment = (req, res) => {
  Blog.findByIdAndUpdate(
    req.params.id,
    {$push: {"comments": req.body}},
    {safe: true, upsert: true},
    function(err, blog) {
        res.send(blog);
    }
  );
}
exports.searchBlogKeyword = (req, res) => {
  var keywords = req.params.id.split('_');
  Blog.find({keywords: {
    $in : keywords
  }}, (err, blogs) => {
    if (err) res.send(err);
    res.send(blogs);
  })
}
