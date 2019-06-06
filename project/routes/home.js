var express = require('express');
var router = express.Router();
// var Blog = require('../models/blog');

var multer = require('multer');
var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    }
});
var upload = multer({ storage: storage });

router.get('/getBlogs', function(req, res) {
    Blog.find({})
        .exec(function(err, doc) {
            if (err) console.log(err);
            res.json(doc);
        })
})
router.get('/getBlog/:id', (req, res) => {
    Blog.findOne({ _id: req.params.id })
        .exec(function(err, doc) {
            if (err) console.log(err);
            res.json(doc);
        })
})
router.post('/saveBlog', upload.single('image'), (req, res) => {
    var pathImg = 'images/' + req.file.originalname;

    var blog = new Blog({
        title: req.body.title,
        content: req.body.content,
        description: req.body.description,
        author: req.body.author,
        category: req.body.category,
        image: pathImg
    });
    blog.save();
    res.redirect('/login');
})
router.get('/deleteBlog/:id', function(req, res) {
    Blog.deleteOne({ _id: req.params.id })
        .exec(function(err) {
            if (err) console.log(err);
            console.log('Delete');
        })
    res.redirect('/login');
});

module.exports = router;