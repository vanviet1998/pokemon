var mongoose = require('mongoose')
    Schema = mongoose.Schema
    json = require('../bin/models.json/bag.json');

var bagSchema = new Schema({
    pokemons: [{ 
        _id:{
            type: Schema.Types.ObjectId, 
            ref: 'Pokemon'
        },
		amount: Number,
		dateCatch: {type: Date, 'default': Date.now}
    }],
    items: [{
        _id :{
            type: Schema.Types.ObjectId,
            ref: 'Item'
        },
        amount: Number,
        dateBuy: {type: Date, 'default': Date.now}
    }]
})
var Bag = mongoose.model('Bag',bagSchema);
module.exports = Bag;

// Bag.insertMany(json, function(err){
//     if(err) console.log(err);
//      console.log("Inser bag done!!");
// })