
'use strict'
let path= process.cwd();
var User = require(path+'/app/models/user');

module.exports= function(req,res,next){
        try{
        User.findOne({'user.username':req.user.user.username},
            function(err,user){
                if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
                if (!user) {
                    console.log("username not found");
                    res.status('400');
                    return res.end();
                 }
                user.user.name=req.body.name;
                user.user.city=req.body.city;
                user.user.state=req.body.state;
                user.save(function (err) {  //save to db
            			if (err) {
            				throw err;
        			    }
                        next();
                });
            }
        )
        }
        catch(err){
            console.error('/middleware/saveUserInfo:',err);
            res.status('400');
            return res.end();
    }
}