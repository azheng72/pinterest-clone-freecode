
var http = require('http');
var path = require('path');
var passport = require('passport');
var mongoose=require("mongoose");
var async = require('async');
var socketio = require('socket.io');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
require('dotenv').load();
var router=require("./app/routes/router");
// var io = socketio.listen(server);


var app = express();
var server = http.createServer(app);
require("./app/config/passport")(passport); //passport configuration
mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_LOCAL_URI);//connect mongodb


app.use('/client', express.static(process.cwd() + '/client'));
app.use('/node_modules', express.static(process.cwd() + '/node_modules'));
// app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(session({
  secret: 'secretApp',
	resave: false,
	saveUninitialized: true 
}));
app.use(passport.initialize());//must exec after express-session middleware
app.use(passport.session());

router(app,passport);

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
  var addr = server.address();
  console.log("server listening at", addr.address + ":" + addr.port);
});
