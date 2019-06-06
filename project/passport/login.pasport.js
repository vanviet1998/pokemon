var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/user');
var Bag = require('../models/bag.js');
//var bcrypt = require('bcryptjs');
var bCrypt = require('bcrypt-nodejs');
var createHash = function(password){
  return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
 }
 var isValidPassword = function(user, password){
  return bCrypt.compareSync(password, user.password);
}
module.exports = function(passport){
    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    passport.use('login', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) { 
      // check in mongo if a user with username exists or not
      User.findOne({ 'username' :  username }, 
        function(err, user) {
          // In case of any error, return using the done method
          if (err)
            return done(err);
          // Username does not exist, log error & redirect back
          if (!user){
            console.log('User Not Found with username '+username);
            return done(null, false, 
                  req.flash('message', 'User Not found.'));                 
          }
          // User exists but wrong password, log the error 
          if (!isValidPassword(user, password)){
            console.log('Invalid Password');
            return done(null, false, 
                req.flash('message', 'Invalid Password'));
          }
          // User and password both match, return user from 
          // done method which will be treated like success
          return done(null, user);
        }
      );
  }));
    passport.use('signup', new LocalStrategy({
      passReqToCallback : true
    },
    function(req, username, password, done) {
      findOrCreateUser = function(){
        // find a user in Mongo with provided username
        User.findOne({'username':username},function(err, user) {
          // In case of any error return
          if (err){
            console.log('Error in SignUp: '+err);
            return done(err);
          }
          // already exists a` sua err thu
          if (user) {
            console.log('User already exists');
            return done(null, false,  req.flash('message','User already exists') );
               //bien flash day nay
          } else { 
            var Bags = new Bag();
            Bags.items= {
              "_id":"5c966feddf6b630b8cf2f814",
              "amount":50
          }
            Bags.save(function(err) {
              if (err){
                console.log('Error in Saving Bag: '+err);  
                throw err;  
              }
            })
            // if there is no user with that email
            // create the user
            var newUser = new User();
            // set the user's local credentials
            newUser.username = username;
            newUser.password = createHash(password);
            newUser.email = req.param('email');
            newUser.money=5000;
            newUser.bag=Bags._id
            newUser.level=1
            if(req.body.sex == 1 )
            //nam
            newUser.sex = true
            else
            newUser.sex = false
            // save the user
            newUser.save(function(err) {
              if (err){
                console.log('Error in Saving user: '+err);  
                throw err;  
              }
              console.log('User Registration succesful');    
              return done(null, newUser);
            });
          }
        });
      };
       
      // Delay the execution of findOrCreateUser and execute 
      // the method in the next tick of the event loop
      process.nextTick(findOrCreateUser);
    }));
   
  }

// Generates hash using bCrypt


