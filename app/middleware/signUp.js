'use strict'
let path= process.cwd();
var User = require(path+'/app/models/user');

module.exports=function(req,res,next){
        if(!req.body.username || !req.body.password){
            res.status('400');
            return res.end();
        }
        User.findOne({'user.username':req.body.username},
            function(err,user){
                if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
                if (user) {
                    console.log("username already registered");
                    res.status('422');
                    return res.end();
                 }
                var newUser=new User;
                newUser.user.username=req.body.username;
                newUser.user.password=req.body.password;
                newUser.save(function (err) {  //save to db
            			if (err) {
            				throw err;
        			    }
                        next();
                });
        }
    )}