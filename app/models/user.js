//Design Schema for Mongoose model


'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	user: {
		username: String,
		password: String,
		name:String,
		city:String,
		state:String
	}
});

module.exports = mongoose.model('User', User);
