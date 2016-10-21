const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  creator: {
    username: String,
    id: String,
    phoneNumber: String,
    email: String,
  },
  location: {
    city: {type: String, lowercase: true, require: true},
    country: {type: String, lowercase: true, require: true},
    address: {type: String, lowercase: true, require: true},
    usCity: {type: String, lowercase: true}
  },
  image: String,
  photos: [],
  applications: [],
  pricePerNight: Number,
  availableForRent: Boolean,
  datesAvailable: String,
  description: String,
  type: String,
  title: String,
  description: String,
  review: {
    rating: String,
    review: String
  }
});
const LISTING = mongoose.model('listing', listingSchema);
module.exports = LISTING;
