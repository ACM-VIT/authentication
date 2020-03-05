const mongoose = require('mongoose');
const validator = require('validator');


var ExtUserSchema = new mongoose.Schema({
    googleID: String,
    name: {
        type: String,
        required: true
    },
    CollegeName: {
        type: String,
    },
    phno: {
        type: String,
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
    refreshToken: {
        type: String
    },
    picture: {
        type: String
    }
});


const ExtUsers = mongoose.model('ExtUsers', ExtUserSchema);
module.exports = ExtUsers;
