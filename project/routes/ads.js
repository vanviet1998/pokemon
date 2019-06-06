var express=require('express');
var router =express.Router();
var Adv = require("../models/adv.js")
router.get("/admin",(req,res,next)=>{
    res.render("ads-admin");
})
router.post("/login",(req,res,next)=>{
    req.session.loggedin = true;
    name= req.body.name;
    pass=req.body.pass;
    if(name=="admin" && pass=="admin")
    res.redirect("/admin/ads/");
    else
    res.render("ads-admin",{mess:"sai tai khoan"})
})
router.get("/",(req,res,next)=>{
 if(req.session.loggedin)
    res.render("ads");
    else
    res.render("ads-admin");
   
})
router.get("/all",(req,res,next)=>{
    Adv.find({},(err,advs)=>{
        if(err) throw(err)
        res.json(advs);
    })
})
router.get("/getAds/:id",(req,res,next)=>{
    var id= req.params.id;
    Adv.find({_id:id},(err,advs)=>{
        if(err) throw(err)
        console.log(advs);
        res.json(advs);
    })
})
router.get("/getAdsbyname/:email",(req,res,next)=>{
    var email= req.params.email;
    Adv.find({email:{'$regex': email}},(err,advs)=>{
        if(err) throw(err)
        console.log(email);
        res.status(200).json(advs);
    })
})
router.get("/delete/:id",(req,res,next)=>{
    var id= req.params.id;
Adv.deleteOne({_id:id},(err,data)=>{
    if(err) return err;
    res.status(200).json({ status: true });
})
});
router.post("/update/",(req,res,next)=>{
    
    Adv.findOneAndUpdate({_id:req.body._id},{$set:{email:req.body.email,
    phone:req.body.phone,link:req.body.link,status:req.body.check
    }},(err)=>{
        if(err) throw err;
        res.status(200).json({ status: true });
    })
 
})
module.exports=router;