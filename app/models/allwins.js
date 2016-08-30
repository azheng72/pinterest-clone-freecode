'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Allwins = new Schema({

	username: String,
	name:String,
	image: String,
    like:Array,
    snippet:String
});

module.exports = mongoose.model('Allwins', Allwins);
