var express = require('express');
var router = express.Router();
var Bag = require('../models/bag');
var User = require('../models/user');
var Card = require('../models/card');
var paypal = require('paypal-rest-sdk');

paypal.configure({
    'mode': 'sandbox', //sandbox or live
    'client_id': 'ASjmmdO9S1BcozSMgRN-iYpdedO2eaYn56zkhkR09JlKZUjNWhJdzpSjelVmkG7CAvn6JXwPy6L3LCfD',
    'client_secret': 'EOszIoKZQClj-2rYhl1NycxzukgUXEponHez50KrUYQGxRDwNSnpqwsr6wl3YAw0-czgQCYFA6GhpWmj'
});

router.get('/', function(req, res, next) {
    res.send('this is page pags');
})
router.post('/saveItemToBag', function(req, res, next) {
    var idUser = req.user._id;
    var idItem = req.body._idItem;
    var number = parseFloat(req.body.number);
    var item = { _id: idItem, amount: number };
    var price = parseFloat(req.body.price);
    User.findOne({ _id: idUser }, function(err, user) {
        if (err) throw err;

        var idBag = user.bag;
        // Bag.findByIdAndUpdate(idBag,{$addToSet:{items:item}},{new:true},function(err,doc){
        //     if(err) throw err;
        //     console.log(doc);
        // })
        if (user.money >= price) {


            Bag.findById(idBag, function(err, bag) {
                if (err) throw err
                else {
                    let tag = 0;
                    (bag.items).forEach(function(ele, index) {

                        if (ele._id == item._id) {
                            bag.items[index].amount = ele.amount + item.amount;
                            console.log(index);
                            console.log(bag.items[index].amount);
                            tag = 1;
                        }

                    })
                    if (tag == 0) {
                        bag.items.push(item);
                    }
                    bag.save(function(err, b) {
                        if (err) throw err;
                        console.log('bag is save ' + b);

                    })

                }
            })

            user.money = user.money - price;
            user.save(function(err, u) {
                if (err) throw err;
                console.log('user is save' + u);
                res.json({ done: true })
            })
        } //end if(money)
        else
            res.json({ done: false });
    })
})

router.post('/savePokemon', function(req, res, next) {
    var poke = { _id: req.body._idPoke, amount: 1 };
    var tag = 1;
    User.findOne({ _id: req.user._id }, function(err, usr) {
        Bag.findOne({ _id: usr.bag }, function(err, bg) {

            if (bg.items[0].amount === 0) {
                res.json({ error: "Hết bóng rồi. Vui lòng vào shop mua !!?" });
            } else {
                bg.items[0].amount -= 1;
                if (req.body.random % 2 == 0) {
                    bg.pokemons.forEach(function(element, index) {
                        if (element._id == req.body._idPoke) {
                            bg.pokemons[index].amount = element.amount + 1;
                            tag = 0;
                        }
                    })
                    if (tag == 1) {
                        bg.pokemons.push(poke);
                    }
                };

                console.log(bg.items[0].amount);
                bg.save(function(err) {
                    if (err) res.json({ error: err });
                    if (req.body.random % 2 == 0) {
                        res.json({ success: "Giam nó rồi !!" });
                    }
                })
                if (req.body.random % 2 == 1) {
                    res.json({ error: "Run away !!" });
                }
            }

        })
    })
})
router.post('/card', function(req, res) {
    console.log(req.body);
    Card.find({ code: req.body.coin })
        .exec(function(err, doc) {
            if (err) return res.json({ success: 'Mã không đúng !!' });
            if (doc.length > 0) {
                if (doc[0].status === false) {
                    return res.json({ success: 'Mã đã được sử dụng !!' });
                } else {
                    User.findOne({ _id: req.user._id })
                        .exec(function(err, usr) {
                            console.log(usr);
                            let coin = usr.money + doc[0].type;
                            usr.money = coin;

                            usr.save();
                        });

                    doc[0].status = 'false';
                    doc[0].save();
                    return res.json({ success: 'Bạn đã nạp thành công' });
                }
            }
            res.json({ success: 'Mã không đúng !!' });
        })
})

router.post('/pay', function(req, res) {
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:3000/bags/success",
            "cancel_url": "http://localhost:3000/bags/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": [{
                    "name": "Coin pokebiz",
                    "sku": "001",
                    "price": req.body.price,
                    "currency": "USD",
                    "quantity": 1
                }]
            },
            "amount": {
                "currency": "USD",
                "total": req.body.price
            },
            "description": "Pay coin pokebiz"
        }]
    };
    paypal.payment.create(create_payment_json, function(error, payment) {
        if (error) {
            throw error;
        } else {
            for (let i = 0; i < payment.links.length; i++) {
                if (payment.links[i].rel === 'approval_url') {
                    res.redirect(payment.links[i].href);
                }
            }
        }
    });
})
router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    // console.log(req.params.price);
    const execute_payment_json = {
        "payer_id": payerId
    };
    paypal.payment.execute(paymentId, execute_payment_json, function(error, payment) {
        if (error) {
            console.log(error.response);
            throw error;
        } else {
            console.log(payment.transactions[0].amount.total);
            User.findOne({ _id: req.user._id })
                .exec(function(err, usr) {
                    console.log(usr);
                    let coin = usr.money + (payment.transactions[0].amount.total * 2);
                    usr.money = coin;

                    usr.save();
                    res.redirect('/');
                });

        }
    });

})
router.get('/cancel', (req, res) => res.send('Cancelled'));
router.post('/upgradePoke', async(req, res) => {
    console.log(req.body._idPoke);
    var mess = "Khong du pokemon ";
    var usr = await User.findOne({ _id: "5ca61028410e572b24487e75" })
        .populate({
            path: 'bag',
            populate: { path: 'pokemons._id' }
        })
    usr.bag.pokemons.forEach(function(element, index) {
        console.log(element._id._id + "- " + element.amount);
        if (element._id._id == req.body._idPoke && element.amount > 1) {
            mess = "Success";
            console.log(element);
            var poke = { _id: element._id.upgrade, amount: 1 };
            var tag = 0;
            console.log(usr.bag._id);
            Bag.findOne({ _id: usr.bag._id }).then(bg => {
                bg.pokemons[index].amount -= 2;
                console.log(bg.pokemons[index].amount);
                if (bg.pokemons[index].amount == 0) {
                    bg.pokemons.splice(index, 1);
                }
                bg.pokemons.forEach(function(poke2, index2) {
                    console.log(poke2._id._id);
                    console.log(element._id.upgrade);
                    if (poke2._id._id.equals(element._id.upgrade)) {
                        bg.pokemons[index2].amount += 1;
                        tag = 1;
                        console.log(bg.pokemons[index2].amount);
                    }
                })
                if (tag == 0) {
                    bg.pokemons.push(poke);
                }
                bg.save();
            }).catch(err => {
                return err
            })
        }
    })
    res.status(200).json({ messenger: mess })
        // res.status(200).json({ mess: 'fail' })
        // datbg.pokemons.forEach(function(element,index){
        //     let pokeUpgrade = '';
        //     if(element._id == "5c967522df6b630b8cf2f828"){

    //         if( bg.pokemons[index].amount > 1){
    //             pokeUpgrade = element._id.upgrade;
    //             console.log(pokeUpgrade);
    //             bg.pokemons[index].amount -= 2;
    //         }
    //     }

    // })
})
router.delete('/deletePokemon', (req, res) => {
        console.log(req.body._idPoke);
        User.findOne({ _id: req.user._id }, function(err, usr) {
            Bag.findOne({ _id: usr.bag }, function(err, bg) {
                bg.pokemons.forEach(function(element, index) {
                    if (element._id == req.body._idPoke) {
                        bg.pokemons.splice(index, 1);
                    }
                })

                bg.save();
                res.json('Delete Success !!');
            })
        })
    })
    // router.post('/searchPokemon', (req, res) =>{
    //     console.log(req.body.namePoke);
    //     User.findOne({ _id : "5ca61028410e572b24487e75"}, function(err, usr){
    //         Bag.findOne({ _id : usr.bag})
    //             .populate({
    //                 path: 'pokemons._id'
    //             })
    //             .exec(function(err, bg){
    //                 console.log(bg.pokemons);
    //                 bg.pokemons.find({ namePokemon : new RegExp(namePoke, 'i')},function(err, docs){
    //                 })

//             })
//     })
// })
module.exports = router;
