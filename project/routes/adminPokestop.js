var express = require('express');
var router = express.Router();
var multer  =   require('multer');
var pokestop = require("../models/pokestop.js")
router.get('/',(req,res,next)=>{
    pokestop.find({}).then(data =>{
        res.render('adminpokestop',{pokestop:data})
    }).catch(err =>{
        return err;
    })
    
})
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/pokemon')
    },
    filename: function(req, file, cb) {
        img ='images/Pokemon/' +Date.now() + "-" + file.originalname;

        cb(null, Date.now() +"-" + file.originalname)
    }
})
var upload = multer({ storage : storage}).single('anh');
router.get('/all',(req,res,next)=>{
    pokestop.find({}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err;
    })
})
router.get('/delete/:id',(req,res,next)=>{
    pokestop.deleteOne({_id:req.params.id}).then(data =>{
        res.status(200).json({status:200})
    })
})
router.get('/getItemById/:id',(req,res,next)=>{
    pokestop.find({_id:req.params.id}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err;
    })
})
router.post('/edit', function(req,res,next){
    upload(req, res, function(err) {
        if(err)return err;
            pokestop.findOne({_id:req.body.id}).then(Poke =>{
                Poke.address=req.body.address
                if(req.file ==undefined)
                Poke.img=Poke.img
                else
                Poke.img=img
                Poke.long=req.body.long
                Poke.lat=req.body.lat
                Poke.save()
                res.redirect('/admin/pokestop')
            }).catch(err =>{
                return err;
            })
    })
   
})
module.exports=router;