'use strict'
let path= process.cwd();
var Allwins = require(path+'/app/models/allwins');

module.exports=function(req,res,next){
    Allwins.find({},function(err,allwins){
        if (err) { 
                    console.error(err);
                    res.status('400');
                    return res.end();
                }
        res.send({allwins});
        next();
    });
 
}