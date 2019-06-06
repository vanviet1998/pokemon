const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://suuu123:suuu@pokebizcluster-jmv9m.mongodb.net/PokeBiz?retryWrites=true',{useNewUrlParser:true},(err)=>{
    if(err)
        console.log('Error in DB connection : ' + err);
    
});

require('../models/user');
require('../models/typePokemon');
require('../models/pokemon');
require('../models/item');
require('../models/bag');
require('../models/card');
// var newPoke = new Pokemon('Alolan Exeggutor','image',150,);
// // var newType = new TypePokemon('Dragon');

// var type = TypePokemon.findById('5c9138f9aaf647297c9792ba');
// // add Typepokemon
// newPoke.TypePokemons = type;
// newPoke.save();

// type.pokemons.push(newPoke);
// type.save();




