var express = require('express');
var router = express.Router();
var item = require("../models/item.js")
var multer  =   require('multer');
var img
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

router.get('/',(req,res,next)=>{
    if(req.session.loggedin)
    {
    item.find({}).then(data =>{
        res.render('item',{item:data})
    }).catch(err =>{
        return err;
    })
}
    else
    res.render("ads-admin");
})
router.get('/delete/:id',(req,res,next)=>{
    item.deleteOne({_id:req.params.id}).then(data =>{
        res.status(200).json({status:200})
    })
})
router.post('/save',(req,res,next)=>{
    upload(req, res, function(err) {
        if(err)return err;
    var Item = new item({
        nameItem:req.body.nameItem,
        imageItem:img,
        number:[20,50,100],
        priceItem:req.body.priceItem
    })
    Item.save(err =>{
        return err;
    })
    res.redirect('/admin/item')
})
})
router.get('/all',(req,res,next)=>{
    item.find({}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err;
    })
})
router.get('/getItemById/:id',(req,res,next)=>{
    item.find({_id:req.params.id}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err;
    })
})
router.post('/edit', function(req,res,next){
    upload(req, res, function(err) {
        if(err)return err;
        item.findOne({_id:req.body.id}).then(items =>{

            if (err) return err
            items.nameItem=req.body.nameItem
            if(req.file ==undefined)
            items.imageItem=items.imageItem
            else
            items.imageItem=img
            items.priceItem=req.body.priceItem
            items.save()
            res.redirect('/admin/item')
        })
   return err;
     
    })
   
})
module.exports=router;