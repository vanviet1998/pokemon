var express = require('express');
var router = express.Router();
var user = require("../models/user.js")
var bCrypt = require('bcrypt-nodejs');
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
   }
router.get('/all',(req,res,next)=>{
   user.find({},(err,user)=>{
    }).then(data =>{
       res.json(data)
    }).catch(err =>{
        return err
    })
})
router.get('/',(req,res,next)=>{
    res.render('account')
})
router.get('/getUserById/:id',(req,res,next)=>{
    var id=req.params.id
    user.find({_id:id},(err,user)=>{
    }).then(data =>{
        res.status(200).json(data);
    }).catch(err =>{
        return err
    })
})
router.post('/edit',(req,res,next)=>{
    let  pass = createHash( req.body.password);
    user.findByIdAndUpdate({_id:req.body._id},{$set:{username:req.body.username,
    password:pass,email:req.body.email,money:req.body.money,level:req.body.level,
    sex:req.body.sex,status:req.body.status}}).then(()=>{
        res.status(200).json({status:true})
    }).catch(err =>{
    return err
    })
})
router.get('/delete/:id',(req,res,next)=>{
    user.deleteOne({_id:req.params.id}).then(data =>{
        res.status(200).json({status:true})
    }).catch(err =>{
        return err
    })
})
router.get('/find/:name',(req,res,next)=>{
    let name =req.params.name
    user.find({username: {'$regex': name}}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err
    })

})
module.exports=router;