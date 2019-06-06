var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
// json = require('../data/blog');

var blog = new Schema({
    title: String,
    content: String,
    date: { type: Date, default: Date.now },
    image: String,
    description: String,
    author: String,
    category: String
})
var Blogs = mongoose.model('Blog', blog);
module.exports = Blogs;

// ne.insertMany(json, function(err){
//     if(err) console.log(err);
// })