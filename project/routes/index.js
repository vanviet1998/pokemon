var express = require('express');
var mongoose = require('mongoose');
var Adv = require('../models/adv');
var router = express.Router();
var multer = require('multer');
var Blog = require('../models/blog');
var user = require('../models/user');
var bag = require('../models/bag');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

router.get('/', (req, res) => {
    Blog.find({})
        .exec(function(err, blog) {
            if (err) throw err;
            Adv.find({status:true}).exec(function(err, ad) {
                if (err) throw err;
                res.render('home', { adv: ad, blog: blog });
            })
        })
})
router.get('/advertisement', (req, res) => {
    res.render('advertisement');
})
router.post('/adv/', upload.single('image'), (req, res) => {
    var ad = new Adv({
        email: req.body.email,
        phone: req.body.phone,
        link: req.body.link,
        status:false,
        image: "../images/" + req.file.originalname
    })
    ad.save();
    res.render('error', { message: 'Ddangw ki thang cong' });
})



module.exports = router;