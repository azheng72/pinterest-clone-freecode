'use strict'
let path= process.cwd();
var Allwins = require(path+'/app/models/allwins');

module.exports=function(req,res,next){
    try{
        let m=req.body.allwin;
        let _id=m._id;
        let iLikeIt=req.body.iLikeIt;
        let username=req.user.user.username;
        Allwins.findOne({_id:_id},function(err,win){
            if (err) { 
                        console.error(err);
                        res.status('400');
                        return res.end();
                    }
            let x=win.like.indexOf(username);        
            if(iLikeIt){
                if(x===-1){
                    win.like.push(username);
                }
            }
            else{
                if(x!==-1){
                    win.like.splice(x,1);
                }
            }
            win.save(function(err){
                if(err) throw err;
                console.log('success: ','like or dislike win');
                next();
            });
        });
    }
    catch(err){
        console.error('/middleware/allWinsUpdate:',err);
        res.status('400');
        return res.end();
    }
}