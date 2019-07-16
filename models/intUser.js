const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

var IntUserSchema = new mongoose.Schema({
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
        unique: true
    },
    hostelRoom: {
        type: String,
        required: true
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
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]

});

IntUserSchema.methods.generateAuthToken = function () {
    var user = this;
    var access = 'auth';
    var data = {
        _id:user._id.toHexString()
    }
    var token = jwt.sign(data, 'abc123').toString();
    this.tokens.push({ access, token });
    return user.save().then(() => {
        return token;
    })

};
const IntUsers = mongoose.model('IntUsers', IntUserSchema);

module.exports = { IntUsers };
