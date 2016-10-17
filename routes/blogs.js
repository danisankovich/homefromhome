var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

const User = require('../models/user');
const Blog = require('../models/blog');

const BlogController = require('../controllers/blog');

router.get('/', BlogController.findAllBlogs);
router.post('/new', BlogController.newBlog);
router.get('/:id', BlogController.findOneBlog);
router.post('/newComment/:id', BlogController.newBlogComment);

module.exports = router;
