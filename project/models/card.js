var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var json = require('../bin/models.json/card.json')

var card = Schema({
    code: String,
    type: Number,
    status: Boolean
})
const Card = mongoose.model('Card', card);
module.exports = Card;

// Card.insertMany(json, function(err){
//     if(err) console.log(err);
//      console.log('Insert card done !!');
// })