var express = require('express');
var router = express.Router();
var multer = require('multer')
var mongoose = require('mongoose');
var pokestop = require('../models/pokestop');
var Item = require('../models/item.js');
var Bag = require('../models/bag.js');
var User = require('../models/user.js');
var Item = require('../models/item.js');
//google API
var NodeGeocoder = require('node-geocoder');

var options = {
    provider: 'google',

    // Optional depending on the providers
    httpAdapter: 'https', // Default
    apiKey: 'AIzaSyBUd8Fk6RmR7qHsbsuYGD4kBUbpYp6Q7CA', // for Mapquest, OpenCage, Google Premier
    formatter: null // 'gpx', 'string', ...
};
var geocoder = NodeGeocoder(options);
var img;
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        img = Date.now() + "-" + file.originalname;
        cb(null, 'public/images/Pokemstop')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname)
    }
})
const imageFilter = function(req, file, cb) {
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
var upload = multer({ storage: storage, fileFilter: imageFilter }).single('anh')
    /* GET home page. */
router.get('/signinpokestop', function(req, res, next) {

    res.render('pokestop-sign-in', { title: 'Express' });
});
router.post('/signinpokestop', function(req, res, next) {
    let mess = "sign-in accept!!";
    // console.log(req.body.adress);
    upload(req, res, function(err) {
        var adre = req.body.adress
        if (!adre || !img) {
            mess = "pless fill full!!!";
            res.render('pokestop-sign-in', { message: mess });
        } else {
            if (err) {
                mess = "Only image files are allowed!";
                res.render('pokestop-sign-in', { message: mess });
            } else {

                geocoder.geocode(req.body.adress, function(err, res) {
                    if (!err) {
                        var poke = new pokestop();
                        poke.lat = res[0].latitude;
                        poke.long = res[0].longitude;
                        poke.address = req.body.adress;
                        poke.img = 'images/Pokemstop/' + img;
                        poke.save();
                    } else {
                        console.log(err);
                        mess = "sai";
                    }
                });
                res.render('pokestop-sign-in', { message: mess });
            }
        }
    })
});
router.get('/getPokestop', function(req, res, next) {
    var locationPokeStop = [
        [, ]
    ]
    pokestop.find({}, function(err, pokes) {
        pokes.forEach(function(poke) {
            locationPokeStop.push([poke._id, poke.address, poke.img, poke.lat, poke.long])
        });
        console.log(locationPokeStop);
        res.json(locationPokeStop);
    });
});

//ramdom item
router.get('/lol', function(req, res, next) {
    //id of Bag
    var id_Bag
        //find id Bag by User 
    User.findOne({ _id: req.user._id }, function(err, user) {
        //id Bag
        id_Bag = user.bag;
        console.log(id_Bag);
        //arry Item
        var item_spin = []
        var rand = []
        Item.find({}, function(err, Items) {
            var cac = 0;
            Items.forEach(function(item) {
                cac = Math.floor(Math.random() * 10) + 1;
                rand.push({ _id: item._id, amount: cac })
                item_spin.push({ _id: item._id, amount: cac, image: item.imageItem, name: item.nameItem })
            });

            Bag.findOne({ _id: id_Bag }, function(err, bag) {
                var arritem = bag.items
                var item = []

                for (var j = 0; j < rand.length; j++) {
                    let flag = 0;
                    for (var i = 0; i < arritem.length; i++) {

                        if (rand[j]._id.equals(arritem[i]._id)) {
                            bag.items[i].amount = bag.items[i].amount + rand[j].amount;
                            bag.save();
                            flag = 1;
                            break;
                        }
                    }
                    if (flag == 0) {
                        item.push(rand[j]);
                    }
                }
                item.forEach(function(itemss) {
                    bag.items.push(itemss);
                    bag.save();
                })

                res.json(item_spin);

            })
        });
    })
})
router.get("/tangtien",(req,res,next)=>{
    User.findOne({ _id: req.user._id})
        .exec(function(err, usr){
            usr.money += 1000;
            usr.status = false;
            usr.save(function(err){
                if(err) throw err;
                res.status(200).json({ status: true });
            })
        })
})
router.get("/kt",(req,res,next)=>{
    User.find({_id:req.user._id},(err,users)=>{
      if(err) throw err;
      res.json(users);
    })
})
module.exports = router;