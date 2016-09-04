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
  const newListing = new Listing(req.body);
  newListing.save((err) => {
    if (err) res.send(err);
    res.json(newListing);
  });
});

module.exports = router;
