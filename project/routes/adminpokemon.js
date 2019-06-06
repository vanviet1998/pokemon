var express = require('express');
var router = express.Router();
var Pokemon = require("../models/pokemon.js")
var multer  =   require('multer');
TypePokemon = require("../models/typePokemon.js")
const { OnePayDomestic } = require('vn-payments');
const onepayDom = new OnePayDomestic({
	paymentGateway: 'https://mtf.onepay.vn/onecomm-pay/vpc.op',
	merchant: 'ONEPAY',
	accessCode: 'D67342C2',
	secureSecret: 'A3EFDFABA8653DF2342E8DAC29B51AF0',
});
router.post('/pay', (req, res) => {
    const params = Object.assign({}, req.body);
  
    // construct checkout payload from form data and app's defaults
    const checkoutData = {
      amount: parseInt(params.price, 10),

    };
  
    // buildCheckoutUrl is async operation and will return a Promise
    onepayDom
      .buildCheckoutUrl(checkoutData)
      .then(checkoutUrl => {
        res.writeHead(301, { Location: `http://${req.headers.host}/payment/onepaydom/callback`});
        res.end();
      })
      .catch(err => {
        res.send(err);
      });
  });
  router.get('/payment/callback', (req, res) => {
    const query = req.query;
  
    onepayIntl.verifyReturnUrl(query).then(results => {
      if (results.isSucceed) {
        res.render('success', {
          title: 'Nau Store - Thank You',
          orderId: results.orderId,
          price: results.price,
          message: results.message,
        });
      } else {
        res.render('errors', {
          title: 'Nau Store - Payment Errors',
          message: results.message,
        });
      }
    });
  });























var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images/pokemon')
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() +"-" + file.originalname)
    }
})
var upload = multer({ storage : storage}).single('anh');
router.post('/edit',function(req,res,next){
    upload(req, res, function(err) {
        if(err)return err;
       var img ='images/Pokemon/' +Date.now() + "-" + req.file.originalname;
       console.log(img,req.body.namePokemon)
       Pokemon.findByIdAndUpdate({_id:req.body.id},{$set:{namePokemon:req.body.namePokemon,
        imagePokemon:img,CP:req.body.CP,typePokemons:req.body.typePokemons}}).then(d =>{
            res.redirect('/admin/pokemon');
        }).catch(err =>{
            return err
        })
           
    })
   
})
router.get('/',async (req,res,next)=>{
    if(req.session.loggedin)
    {    var data= await Pokemon.countDocuments({})
   var data1= await TypePokemon.find({})
        res.render('pokemon',{Pokemon:data,typePoke:data1});
}
else
    res.render("ads-admin");
  
})
router.get('/phantrang/:n',(req,res,nex )=>{
    var n=(undefined)?0:req.params.n
    
    Pokemon.find({}).limit(10).skip(10*n).populate('typePokemons')
    .then((data) =>{   res.status(200).json(data) })
      .catch((err) =>{
        return err;
    })
})
router.get('/all',(req,res,next)=>{
    Pokemon.find({}).populate('typePokemons')
    .then((data) =>{   res.status(200).json(data) })
      .catch((err) =>{
        return err;
    })
})
router.get('/getPokeById/:id',(req,res,next)=>{
    Pokemon.find({_id:req.params.id}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err
    })
})
router.get('/getType',(req,res,next)=>{
    TypePokemon.find({}).then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err
    })
})
router.get('/getTypeById/:id',(req,res,next)=>{
    Pokemon.find({_id:req.params.id}).populate('typePokemons')
    .then((data) =>{   res.status(200).json(data) })
      .catch((err) =>{
        return err;
    })
})
router.get('/delete/:id',(req,res,next)=>{
    Pokemon.deleteOne({_id:req.params.id}).then(data =>{
        res.status(200).json({status:true})
    }).catch(err =>{
        return err
    })
})
router.get('/find/:name',(req,res,next)=>{
    let name =req.params.name
    Pokemon.find({namePokemon: {'$regex': name}}).populate('typePokemons').then(data =>{
        res.status(200).json(data)
    }).catch(err =>{
        return err
    })
})
router.post('/save',(req,res,next)=>{
    upload(req, res, function(err) {
        if(err)return err;
    var img ='images/Pokemon/' +Date.now() + "-" + req.file.originalname;
    var pokemon = new Pokemon({
        namePokemon:req.body.namePokemon,
        imagePokemon:img,
        CP:req.body.CP,
        typePokemons:req.body.typePokemons
    })
    pokemon.save(err =>{
        return err;
    })
})
res.redirect('/admin/pokemon');
})
module.exports=router;