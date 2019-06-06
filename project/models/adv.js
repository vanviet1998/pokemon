var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var adv = new Schema({
    email: String,
    phone: String,
    link: String,
    image: String,
    status:Boolean
})
var Adv = mongoose.model('Adv', adv);
module.exports = Adv;