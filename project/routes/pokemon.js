var express=require('express');
var router=express.Router();
var Pokemon = require('../models/pokemon');
router.get('/',function(req,res,next){
   res.send('pokemon');
})
router.get('/get',function(req,res,next){
  
  Pokemon.find()
  .then(pokes=>{
    res.status(200).send(pokes);
      })
.catch(err=>{
   res.status(400).send('error');
      })
   })


router.get('/getType/:_id',function(req,res,next){
  
   Pokemon.findOne({_id:req.params._id}).populate('typePokemons')
   .then(pokes=>{
     
     res.status(200).json({type:pokes.typePokemons.nameType})
   })
   .catch(err=>{
      res.status(404).json({msg:err})
   })

});
module.exports=router;