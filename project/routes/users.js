var express = require('express');
var router = express.Router();
var async = require("async");
var user = require('../models/user');
var bag = require('../models/bag');
var Bag = require('../models/bag.js');
router.get('/',function(req, res){
    user.findOne({ _id: req.user._id })
        .populate({
            path: 'bag',
            populate: {path: 'pokemons._id'}
        })
        .populate({
            path: 'bag',
            populate: {path: 'items._id'}
        })
        .populate({
            path: 'friends',
        })
        .exec(function(err, data) {
             if(err) console.log(err);
            res.send(data);
        });

})
router.get('/getUser',function(req, res){
    user.findOne({ _id: req.user._id })
        .exec(function(err, data) {
            if(err) console.log(err);
            res.send(data);
    });
})
router.post('/addfriend', function(req, res){
    var check = true;
    console.log(req.user._id);
    user.findOne({username: req.body.namefriend})
        .exec(function(err,friend) {
            if(err)  res.json({mess:err});
            if(!friend) res.json({mess:'Không tìm thấy !!'});
            else{
                user.findOne({ _id : req.user._id})
                .exec(function( err, usr){
                    console.log(usr);
                    for(let value of usr.friends){
                        if(friend._id.equals(value)){
                            check= false;
                        }
                    }
                    if(check == true){
                        usr.updateOne({ "$push" : { "friends": friend._id }})
                            .exec(function(err){
                                if(err)  res.json({mess:"Lỗi rồi !!"});
                                res.json({mess:'Đã thêm vào bạn bè!!'});
                        })
                    }
                    else{
                        res.json({mess:'Đã tồn tại !!'});
                    }
                })
            }
        })

})
module.exports = router;
