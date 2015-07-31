var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var User = require('../models/user');

var config = require('../config');
var util = require('../util/lib.js');

router.get('/list', function(req, res){
    User.find(function(err, users){
        res.send(users);
    });
});

//Profile routes
router.get('/profile', util.ensureAuthenticated, function(req, res){ 
      //console.log('Request Object: ' + req.user);
      User.findById(req.user, function(err, user) {
          res.send(user);
      });
});

router.put('/profile', util.ensureAuthenticated, function(req, res){
      User.findById(req.user, function(err, user) {
        if (!user) {
          return res.status(400).send({ message: 'User not found' });
        }
        user.displayName = req.body.displayName || user.displayName;
        user.email = req.body.email || user.email;
        user.picture = req.body.picture || user.picture;
          
        user.save(function(err) {  
          res.status(200).end();
        });
      });
});


//Show all Users
router.get('/', util.ensureAuthenticated, function(req, res){
	User.find(function(err, user){
		res.send(user);
	});
});

// Find User by id.
router.get('/:id', util.ensureAuthenticated, function(req, res) {
  User.findById(req.params.id, function(err, user) {
    res.send({ user: user });
  });
});

//Create a User
router.post('/', util.ensureAuthenticated, function(req, res) {
  var user = new User(req.body);
  var address = {};
    if(req.body.postalCode){
        address = {
            street: req.body.street,
            city: req.body.city,
            state: req.body.state,
            postalCode: req.body.postalCode
        }    
    }else{
        address = {
            street: 'not provided',
            city: '',
            state: 'HI',
            postalCode: ''     
        }
    }
  
  user.address = address;
  
  user.save(function(err) {
    res.send({ user: user });
  });

});

// Update User by id.
router.put('/:id', util.ensureAuthenticated, function(req, res) {
  User.findByIdAndUpdate(req.params.id, req.body, function(err, user) {
    res.send({ user: req.body });
  });
});

// Delete User by id.
router.delete('/:id', util.ensureAuthenticated, function(req, res) {
  User.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});

router.get('/list', util.ensureAuthenticated, function(req, res){
    User.find({}, function(err, users){
        res.send(users);
    });
});

module.exports = router;