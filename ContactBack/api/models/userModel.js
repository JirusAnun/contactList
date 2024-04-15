'use strict'
var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new Schema({
    Username: {
        type: String,
        required: 'Please enter'
    },
    Password: {
        type: String,
        required: 'Please enter'
    },
}, { collection: 'Users' });

module.exports = mongoose.model('Users', UserSchema)
