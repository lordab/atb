//model/comments.js
'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//create new instance of the mongoose.schema. the schema takes an
//object that shows the shape of your database entries.
var AccountsSchema = new Schema({
 userId: String,
 accountType: String,
 currentBalance: Number,
 availableBalance: Number
});
//export our module to use in server.js
module.exports = mongoose.model('Accounts', AccountsSchema);
