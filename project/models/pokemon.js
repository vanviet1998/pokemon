var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId,
    Schema = mongoose.Schema,
    json = require('../bin/models.json/pokemon.json')

var pokeSchema = new Schema({
    namePokemon: String,
    imagePokemon: String,
    CP: Number,
    typePokemons: { type: ObjectId, ref:'TypePokemon'}
})

const Pokemon = mongoose.model('Pokemon', pokeSchema);
module.exports = Pokemon;

// Pokemon.insertMany(json, function(err){
//     // if(err) console.log(err);
//     console.log('Insert pokemon done !!');
// })

