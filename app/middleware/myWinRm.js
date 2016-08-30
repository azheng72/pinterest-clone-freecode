'use strict'
let path=process.cwd();
var Allwins = require(path+'/app/models/allwins');

module.exports=function(req,res,next){
    try{
        let mywin=req.body.mywin;
        let _id=mywin._id;
        Allwins.remove({_id:_id},function(err,deletewin){
            if (err) { 
                        console.error(err);
                        res.status('400');
                        return res.end();
                    }
            console.log('success: ','delete win');
            next();
                
        });
    }
    catch(err){
        console.error('/middleware/myWinRm:',err);
        res.status('400');
        return res.end();
    }
}
