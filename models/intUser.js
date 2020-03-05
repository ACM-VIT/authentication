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
    },
    phno: {
        type: String,
    },
    hostelroom: {
        type: String,
    },
    refreshToken: {
        type: String
    },
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: '{value} is invalid email'
        }
    },
    picture: {
        type: String
    }

});


const IntUsers = mongoose.model('IntUsers', IntUserSchema);

module.exports = IntUsers;

