var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var json = require('../bin/models.json/pokestop.json')

var pokestopSchema = Schema({
    address: String,
    img: String,
    lat: Number,
    long: Number
})
var Pokestop = mongoose.model('Pokestop', pokestopSchema);
module.exports = Pokestop;

// Pokestop.insertMany(json, function(err){
//     if(err) console.log(err);
//      console.log('Insert item done !!');
// })