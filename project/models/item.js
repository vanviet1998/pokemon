var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var json = require('../bin/models.json/item.json')

var itemSchema = Schema({
    nameItem: String,
    imageItem: String,
    number:Array,
    priceItem: Number
})
var Item = mongoose.model('Item', itemSchema);
module.exports = Item;

// Item.insertMany(json, function(err){
//     if(err) console.log(err);
//      console.log('Insert item done !!');
// })