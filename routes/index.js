var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var config = require('../config');
var jwt = require('jwt-simple');

const Authentication = require('../controllers/authentication');
const passportService = require('../services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', {session: false}); //token based, not session
const requireSignin = passport.authenticate('local', {session: false});
const authenticate = expressJwt({secret : config.secret});

const User = require('../models/user');

router.get('/api', requireAuth, Authentication.getUser);
router.post('/api/signup', Authentication.signup);
router.post('/api/signin', requireSignin, Authentication.signin);
router.post('/api/editInfo', (req, res) => {
  var newPhone = req.body.phoneNumber
  var newEmail = req.body.email
  var newLang = req.body['lang[]']
  console.log(newLang)
  User.findById(req.body.user, (err, user) => {
    user.phoneNumber = newPhone || user.phoneNumber;
    user.email = newEmail || user.email;
    user.languages = newLang || user.languages
    user.save()
    res.send(user);

  })
});
router.post('/api/uploadmyphoto', (req, res) => {
  User.findById(req.body.user, (err, user) => {
    let _id = user.myPhotos.length;
    user.myPhotos.push({
      image: req.body.image,
      tagline: req.body.tagline,
      location: req.body.location,
      showcased: false,
      _id
    })
    user.save();
    res.send(user);
  })
});
router.post('/api/uploadavatar', (req, res) => {
  User.findById(req.body.user, (err, user) => {
    let _id = user.myPhotos.length;
    user.avatar = req.body.image
    user.save();
    res.send(user);
  })
});
module.exports = router;
