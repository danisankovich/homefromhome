const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  creator: {
    username: String,
    id: String,
  },
  images: Array,
  dateCreated: { type: Date, default: Date.now },
  lastModified: {type: Date},
  tagline: String,
  title: String,
  body: String,
  comments: []
});
const BLOG = mongoose.model('blog', blogSchema);
module.exports = BLOG;
