'use strict'
let path=process.cwd();
var Allwins = require(path+'/app/models/allwins');

module.exports=function(req,res,next){
        
    try{
    
        let image=req.body.image;
        let snippet=req.body.snippet;
        let username=req.user.user.username;
        let name=req.user.user.name;

        let newAllwins=new Allwins;
        newAllwins.username=username;
        newAllwins.name=name;
        newAllwins.image=image;
        newAllwins.like=[];
        newAllwins.snippet=snippet;
        newAllwins.save(function(err){
                if(err) throw err;
                console.log('success: ','add win');
                res.send(newAllwins);
                next();
            });
    }
    catch(err){
        console.error('/middleware/myWinAdd:',err);
        res.status('400');
        return res.end();
    }

}
