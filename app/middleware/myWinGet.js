'use strict'
let path= process.cwd();
var Allwins = require(path+'/app/models/allwins');

module.exports=function(req,res,next){
    let username=req.user.user.username;
    Allwins.find({username:username},function(err,mywins){
        if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
        res.send({mywins});
        next();
    });
 
}