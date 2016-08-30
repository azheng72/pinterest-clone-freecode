'use strict';
var path = process.cwd();
var saveUserInfo=require(path+'/app/middleware/saveUserInfo');
var signUp=require(path+'/app/middleware/signUp');

var myWinGet=require(path+'/app/middleware/myWinGet');
var myWinAdd=require(path+'/app/middleware/myWinAdd');
var myWinRm=require(path+'/app/middleware/myWinRm');
var myWinUpdate=require(path+'/app/middleware/myWinUpdate');
var allWinsGet=require(path+'/app/middleware/allWinsGet');
var allWinsUpdate=require(path+'/app/middleware/allWinsUpdate');

module.exports=function(app,passport){

    
        
    function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
		    
		        res.status('401');
		        res.end();
			
		}
	}
	
	app.get('/auth/twitter',
      passport.authenticate('twitter'));
    
    app.get('/auth/twitter/callback', 
      passport.authenticate('twitter', { failureRedirect: '/' }),
      function(req, res) {
        // Successful authentication, redirect home.
        console.log('user login success, via twitter');
        res.redirect('/');
      });
  
    app.route('/mywins/:user?')
        .get(isLoggedIn,myWinGet,
            function(req,res){
                res.end();
            }
        )
        .post(isLoggedIn,
            function(req,res,next){
                switch (req.query.directive) {
                    case 'add':
                        myWinAdd(req,res,next);
                        break;
                    case 'delete':
                        myWinRm(req,res,next)
                        break;
                    default:
                        // code
                }
            },
            function(req,res){
                res.end();
            }
        )
        .put(isLoggedIn,myWinUpdate,
            function(req,res){
                res.end();
            }
        );
	
	
	app.route('/allwins/:user?')
        .get(allWinsGet,
            function(req,res){
                res.end();
            }
        )
        .put(isLoggedIn,allWinsUpdate,
            function(req,res){
                res.end();
            }
        );
        
    app.route('/saveUserInfo')
        .post(isLoggedIn,saveUserInfo,
            function(req,res){
                res.end();
            }
        )
        
    app.route('/login')
        .post(
            passport.authenticate('local'), //access to next middleware when passport authenticate success, otherwise stop here
            function(req,res){              //login success
                console.log('user login success');
                res.status('200');
                res.end();
            }
        )
        
    app.route('/personalinfo')
        .post(isLoggedIn,
            function(req,res){              //already login success
                res.send({username:req.user.user.username,
                            name:req.user.user.name,
                            city:req.user.user.city,
                            state:req.user.user.state
                });
                res.end();
            }
        );
        
    app.route('/signup')
        .post(signUp,
                passport.authenticate('local'), //access to next middleware when passport authenticate success, otherwise stop here
                function(req,res){              //signed up and login success
                    res.status('200');
                    res.end();
                }
        );
        
    app.route('/logout')
        .post(
                function(req,res){ 
                    req.logout();
                    console.log('user logout success');
                    res.end();
                }
        );
      
    app.route('/*')
        .get(//isLoggedIn,
            function(req,res){             
                res.sendFile(path+'/client/index.html')
            }
        );     
};