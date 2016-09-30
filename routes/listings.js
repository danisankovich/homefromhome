var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');


const Listing = require('../models/listing');
const User = require('../models/user');

router.get('/:id', (req, res) => {
  Listing.findById(req.params.id, (err, listing) => {
    if (err) res.send(err);
    res.send(listing);
  })
})

router.post('/mylistings', (req, res) => {
  Listing.find({'_id': { $in: req.body['data[]']}}, (err, listings) => {
    if (err) res.send(err);
    res.send(listings);
  });
})

router.get('/location/:location', (req, res) => {
  let city = req.params.location.split('_')[1].toLowerCase();
  let country = req.params.location.split('_')[0].toLowerCase();
  if (city.length > 0 && country.length > 0) {
    Listing.find({'location.city': city, 'location.country': country}, (err, listings) => {
      if (err) res.send(err);
      res.send(listings)
    })
  }
  else if (city.length > 0 && country.length === 0) {
    Listing.find({'location.city': city}, (err, listings) => {
      if (err) res.send(err);
      res.send(listings)
    })
  }
  else if (country.length > 0) {
    Listing.find({'location.country': country}, (err, listings) => {
      if (err) res.send(err);
      res.send(listings)
    })
  }
})

router.post('/new', (req, res) => {
  var data = {};
  data.title = req.body.title;
  data.description = req.body.description;
  data.image = req.body.image;
  data.pricePerNight = req.body.pricePerNight;
  data.availableForRent = req.body.availableForRent;
  data.datesAvailable = req.body.datesAvailable;
  data.location = {
    city: req.body.city.toLowerCase(),
    address: req.body.address.toLowerCase(),
    country: req.body.country.toLowerCase()
  }
  data.creator = {
    username: req.body.username,
    id: req.body.id,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  }
  Listing.create(data, (err, listing) => {
    if(err) res.send(err);
    User.findById(data.creator.id, (err, user) => {
      if (err) res.send(err);
      user.myListings.push(listing._id)
      user.save();
      res.json(listing)
    });
  });
});

module.exports = router;
