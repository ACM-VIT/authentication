const mongoose = require('mongoose');
const validator = require('validator');


var IntUserSchema = new mongoose.Schema({
    googleID: String,
    name: {
        type: String,
        required: true
    },
    regno: {
        type: String,
        required: true,
        unique: true
    },
    phno: {
        type: String,
        required: true,
        unique: true,
        default: 'undefined'
    },
    hostelRoom: {
        type: String,
        required: true,
        default: 'undefined'
    },
    refreshToken: {
        type: String
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        unique: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is invalid email'
        }
    },
    picture:{
        type:String
    }

});


const IntUsers = mongoose.model('IntUsers', IntUserSchema);

module.exports = IntUsers;

