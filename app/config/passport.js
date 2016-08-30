//Configuration module for Passport 
'use strict'

var path = process.cwd();

var LocalStrategy = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

var User = require(path+'/app/models/user');

module.exports=function(passport){
        //session use
        passport.serializeUser(function(user, done) {
          done(null, user.id);
        });
        //session use
        passport.deserializeUser(function(id, done) {
          User.findById(id, function(err, user) {
            done(err, user);
          });
        });
        //local strategy
        passport.use(new LocalStrategy(
          function(username, password, done) {
            User.findOne({ 'user.username': username }, function(err, user) {
              if (err) { return done(err); }
              if (!user) {
                console.log("message: 'Incorrect username.'");
                return done(null, false);
              }
              if (user['user']['password']!==password) {
                console.log("message: 'Incorrect password.'");
                return done(null, false);
              }
              return done(null, user);
            });
          }
        ));
        
        
        if(process.env.HEROKU_URL){
      	    var hostname = process.env.HEROKU_URL
      	}
      	else{
      	    var hostname ='https://' + process.env.C9_HOSTNAME + '/';
      	}
      	
      	
        passport.use(new TwitterStrategy({
          consumerKey: process.env.TWITTER_CONSUMER_KEY,
          consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
          callbackURL:  hostname + "auth/twitter/callback"
        },
        function(token, tokenSecret, profile, cb) {
          let username=profile['_json'].id;
          let name=profile['_json'].name;
          User.findOne({'user.username':username}, function(err, user) {
              if (err) { return cb(err); }
              if (user) {
          			return cb(err, user);
          		} 
          		else {
          			var newUser = new User();
          
          			newUser.user.username = username
          			newUser.user.name = name;
          			newUser.save(function (err) {
          				if (err) {
          					throw err;
          				}
          
          				return cb(err, newUser);
          			});  
          		}
                
          });  
          
          
          
          
        }
      ));
        
};