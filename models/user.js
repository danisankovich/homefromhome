const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
  email: {type: String, unique: true, lowercase: true, required: true},
  username: {type: String, lowercase: true, require: true},
  password: String,
  phoneNumber: String,
  blogs: Array,
  aboutMe: String,
  languages: Array,
  myListings: Array,
  myPhotos: Array,
  avatar: String,
  savedListings: Array,
  favoriteBlogs: Array,
  reviewsOfMe: Array,
  myReviews: Array,
  followers: Array,
  following: {type: Array, unique: true},
  applications: []
});

userSchema.methods.comparePassword = function(candidatePassword, cb) {
  let pwd = this.password
  bcrypt.compare(candidatePassword, pwd, function(err, isMatch) {
    console.log(candidatePassword == pwd, isMatch)
    if (err) {return cb(err); }
    cb(null, isMatch);
  });
}
const USER = mongoose.model('user', userSchema);
module.exports = USER;
