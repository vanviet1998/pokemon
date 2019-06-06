var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    json = require('../bin/models.json/typePokemon.json');

var typePokeSchema = new Schema({
    nameType: { type: String},
    pokemons: [{ type: Schema.Types.ObjectId, ref: 'Pokemon'}]
})
var TypePokemon = mongoose.model('TypePokemon', typePokeSchema);
module.exports = TypePokemon

// TypePokemon.insertMany(json, function(err){
//     //if(err) console.log(err);
//     console.log('Insert type pokemon done !!');
// })