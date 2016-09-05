var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');


const Listing = require('../models/listing');

router.get('/', (req, res) => {
  Listing.find({}, (err, listings) => {
    if (err) res.send(err);
    res.send(listings)
  })
})

router.get('/:id', (req, res) => {
  console.log('adsf', req.params)
  Listing.findById(req.params.id, (err, listing) => {
    if (err) res.send(err);
    else {
      console.log(listing)
      res.send(listing);
    }
  })
})

router.post('/new', (req, res) => {
  var data = {};
  data.image = req.body.image;
  data.pricePerNight = req.body.pricePerNight;
  data.availableForRent = req.body.availableForRent;
  data.datesAvailable = req.body.datesAvailable;
  data.location = {
    city: req.body.city,
    address: req.body.address,
    country: req.body.country
  }
  data.creator = {
    username: req.body.username,
    id: req.body.id,
    phoneNumber: req.body.phoneNumber,
    email: req.body.email
  }
  console.log(data);
  console.log('________________');
  Listing.create(data, (err, listing) => {
    console.log(listing)
    res.json(listing)
  })
  // newListing.save((err) => {
  //   if (err) res.send(err);
  //   console.log(newListing)
  //   res.json(newListing);
  // });
});

module.exports = router;
