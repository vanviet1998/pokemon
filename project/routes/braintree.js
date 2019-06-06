var express=require('express');
var router=express.Router();
const Braintree=require('../config/braintree');
var braintree = require("braintree");
var User=require('../models/user');
var gateway = braintree.connect({
  environment: braintree.Environment.Sandbox,
  merchantId: Braintree.merchantId,
  publicKey: Braintree.publicKey,
  privateKey: Braintree.privateKey
});
router.get("/client_token", function (req, res) {
    gateway.clientToken.generate({}, function (err, response) {
      res.json(response.clientToken);
    });
  });
  router.post("/checkout", function (req, res) {
    var amount = parseInt(req.body.amount);
    var nonceFromTheClient = req.body.paymentMethodNonce;
    console.log('amount :' +amount);
    // Use payment method nonce here
    gateway.transaction.sale({
        amount: amount,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, function (err, result) {
          if(err) {
            res.render('success', {code: '97'});
          }
          else
          {

          
          User.updateOne({_id:req.user._id},{$inc:{"money":amount*400}},{upsert:true},(err,doc)=>{
            if(err) throw err;
            
         
             })
            }   
        res.render('success', {code: '00'});
      });
  });
module.exports=router;