var express = require('express');
var router = express.Router();
var mongoose = require('mongoose'); 
var User = require('../models/user.js');
// Sign in
module.exports = function(passport){
    router.get('/login', function(req, res) {
			if(req.isAuthenticated()){
				 res.redirect('/');
			}
			res.render('sign-in',{ message: req.flash('message') });
		});
	router.post('/login',passport.authenticate('login',{ failureRedirect: '/login',successRedirect: '/',failureFlash : true }))

	router.get('/signup',function(req,res){
		res.render('sign-up',{message: req.flash('message')});
	})
	router.post('/signup', passport.authenticate('signup', {successRedirect: '/',failureRedirect: '/signup',failureFlash : true }));
	router.get('/',isLoggedIn, function(req, res ){	
			res.render('index');	
	})
	//logout
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	// Hàm được sử dụng để kiểm tra đã login hay chưa
	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated())
				return next();
		res.redirect('/login');
	}
	return router;
}