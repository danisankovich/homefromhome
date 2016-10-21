const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');
const bcrypt = require('bcrypt-nodejs');

tokenForUser = (user) => {
  const timestamp = new Date().getTime();
  //iat = issued at time
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function(req, res, next) {
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  if (!email || !password) {
    return res.status(422).send({error: 'Email and Password Must Be Provided'});
  }
  User.findOne({email: email}, (err, user) => {
    if (err) {
      return next(err);
    }
    if (user) {
      return res.status(422).send({error: 'Email Already In Use'});
    }
    const newUser = new User({
      email: email,
      password: password,
      username: username
    });
    bcrypt.genSalt(10, function(err, salt) {
      if (err) { return next(err); }
      bcrypt.hash(newUser.password, salt, null, function(err, hash) {
        if (err) {return next(err); }
        newUser.password = hash;
        newUser.save((err) => {
          if (err) {
            return next(err);
          }
          res.json({token: tokenForUser(newUser)});
        });
      })
    })
  })
}

exports.signin = function(req, res, next) {
  res.send({token: tokenForUser(req.user)});
}
exports.getUser = (req, res) => {
  var token = req.headers.authorization;
  var user;
  if(token) {
    try {
      var decoded = jwt.decode(token, config.secret);
      User.findById(decoded.sub, (err, user) => {
        user = user
        res.send(user)
      })
     }
     catch (e) {
       return res.status(401).send('authorization required');
     }
  }
  else {
    res.send({user: "NO_USER"})
  }
}
exports.getUserProfile = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    console.log(user)
    if (err) res.send(err);
    res.send(user)
  })
}
exports.editInfo = function(req, res, next) {
  var newPhone = req.body.phoneNumber
  var newEmail = req.body.email
  var newLang = req.body['lang[]']
  User.findById(req.body.user, (err, user) => {
    user.phoneNumber = newPhone || user.phoneNumber;
    user.email = newEmail || user.email;
    user.languages = newLang || user.languages
    user.save()
    res.send(user);
  })
}
exports.uploadMyPhoto = (req, res) => {
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
}
exports.uploadAvatar = (req, res) => {
  User.findById(req.body.user, (err, user) => {
    let _id = user.myPhotos.length;
    user.avatar = req.body.image
    user.save();
    res.send(user);
  })
}

exports.addFollower = (req, res) => {
  console.log(req.body)
  var token = req.headers.authorization;
  if(token) {
    try {
      var decoded = jwt.decode(token, config.secret);
      User.findByIdAndUpdate(
        decoded.sub, {$addToSet: {"followers": req.body.user}}, {safe: true, upsert: true},
        function(err, user) {
          if (err) res.send(err);
          res.send(user);
        }
      )
     }
     catch (e) {
       return res.status(401).send('authorization required');
     }
  }
  else {
    res.send({user: "NO_USER"})
  }
}
