var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Coupon = require('../models/coupon');
var User = require('../models/user');



//Show all Coupons
router.get('/', function(req, res){
    Coupon.find({})
    .populate('owner')
    .exec(function(err, coupons) { 
        var coupon = [];
        coupons.forEach(function(c){
            if(c.owner.isAdmin){
                c.owner.isAdmin = undefined;
            }
            coupon.push(c);
        });
        res.send(coupons)
    });
});

//Show Near Coupons
router.post('/near', function(req, res){
    var distance = 1000/6371;
    var query = Coupon.find({'loc':{
                    $near: [
                            req.body.long, 
                            req.body.lat
                    ],
                    $maxDistance: distance
                    }
                });
    

    query.exec(function(err, coupon){
        if(err){
            console.log(err);
            res.send({error: err});
        }else{
            res.send({coupon: coupon});
        }
    });
                
                                
});

//Show Near Coupons w/ query parameters and distance
router.get('/near/:long/:lat/:distance', function(req, res){
    var distance = 0;
    if(!req.params.distance){
        //distance = 1000/6371; //Km
        distance = 25/3963.2; //Miles
    }else{
        distance = req.params.distance/3963.2; 
    }

    Coupon.find({'loc':
               {
                $near: [req.params.long,req.params.lat],
                $maxDistance: distance
               }
              })
            .populate('owner')
            .exec(function(err, coupon){
                if(err){
                    console.log(err);
                    res.send({error: err});
                }else{
                    res.send({coupon: coupon});
                }
    });               
                                
});

//Show Near Coupons w/ query parameters no distance
router.get('/near/:long/:lat', function(req, res){
    var distance = 25/3963.2; //Default to 25 miles
    var query = Coupon
                .find({'loc':{
                    $near: [
                            req.params.long, 
                            req.params.lat
                    ],
                    $maxDistance: distance
                    }
                }).populate('owner');
    

    query.exec(function(err, coupon){
        if(err){
            console.log(err);
            res.send({error: err});
        }else{
            res.send({coupon: coupon});
        }
    });
                
                                
});

// Find Coupon by id.
router.get('/:id', function(req, res) {
    Coupon.find({_id: req.params.id})
        .populate('owner')
        .exec(function(err, coupon) {
            res.send(coupon)
        });    
});

//Create a Coupon
router.post('/', function(req, res) {
  var coupon = new Coupon(req.body);
    
      coupon.created_on = Date.now();

      if(req.body.loc){
        var coord = req.body.loc.split(',');
        coupon.loc = coord;
      }
  
  coupon.save(function(err) {
    res.send({ coupon: coupon });
  });

});

// Update Coupon by id.
router.put('/:id', function(req, res) {
    
  Coupon.findById(req.params.id, function(err, coupon){

        if(req.body.vendor){
            coupon.vendor = req.body.vendor;
        }
      
        if(req.body.loc){
            var coord = req.body.loc.split(',');
            coupon.loc = coord;
        }
      
        if(req.body.isActive){
            coupon.isActive = req.body.isActive;
        }
      
        if(req.body.desc){
            coupon.desc = req.body.desc;
        }
      
        if(req.body.resource_url){
            coupon.resource_url = req.body.resource_url;
        }
      
        coupon.save();
        res.send({coupon: coupon});
  });
                
});

// Delete Coupon by id.
router.delete('/:id', function(req, res) {
  Coupon.findById(req.params.id).remove(function(err) {
    res.sendStatus(200);
  });
});



module.exports = router;