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
    address: {type: String, lowercase: true, require: true}
  },
  image: String,
  pricePerNight: String,
  availableForRent: Boolean,
  datesAvailable: String,
});
const LISTING = mongoose.model('listing', listingSchema);
module.exports = LISTING;
