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

router.get('/location/:location', (req, res) => {
  let city = req.params.location.split('_')[1]
  let country = req.params.location.split('_')[0]
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
  // Listing.find(req.params.id, (err, listing) => {
  //   if (err) res.send(err);
  //   else {
  //     console.log(listing)
  //     res.send(listing);
  //   }
  // })
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
    console.log(err)
    res.json(listing)
  })
  // newListing.save((err) => {
  //   if (err) res.send(err);
  //   console.log(newListing)
  //   res.json(newListing);
  // });
});

module.exports = router;
