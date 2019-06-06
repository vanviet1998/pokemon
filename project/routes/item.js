var express=require('express');
var router=express.Router();
var Item=require('../models/item');
router.get('/',function(req,res,next){
    res.send('this is page item');
})
router.get('/getItems',function(req,res,next){
        Item.find()
            .then(items=>{
                res.status(200).json({items:items});
            })
            .catch(err=>{
                res.status(404).json({err:err});
            })
})
router.get('/getBall',function(req,res,next){
    Item.find({ nameItem : 'PokeBall'})
        .then(items=>{
            res.status(200).json({items:items});
        })
        .catch(err=>{
            res.status(404).json({err:err});
        })
})
router.get('/get',function(req,res,next){
    Item.find({ nameItem : 'Lucky Egg'})
        .then(items=>{
            res.status(200).json({items:items});
        })
        .catch(err=>{
            res.status(404).json({err:err});
        })
})
module.exports =router;