var mongoose = require('mongoose'),
	Schema = mongoose.Schema
	json = require('../bin/models.json/user.json');

var UserSchema = new Schema({
	username: String,
	password: String,
	email: String,
	status : {type: Boolean, 'default': true},
	level: Number,
	money: Number,
	createdOn: { type: Date, 'default': Date.now },
	friends : [{ type: Schema.Types.ObjectId }],
	bag: { type: Schema.Types.ObjectId, ref: 'Bag'},
	sex: Boolean
})

const User = mongoose.model('User', UserSchema);
module.exports = User;

// User.insertMany(json, function(err){
// 	if(err) console.log(err);
// 	console.log("Insert user done !!");
// })

