const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

DecodeToken = function (token) {
    try {
        console.log(token)
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
    }
}
router.get('/getinfo', (req, res) => {
    var id = req.body.id;
    var deco = DecodeToken(id);
    //console.log(deco);
    if (deco.state == 'int') {
        IntUsers.findOne({ "_id": deco._id }).then((user) => {
            if (!user.hostelroom) {
                console.log({ "Error message": "User not found in database", });
            }
            else {
                console.log(user);
                res.json(user);
            }
        }).catch((err) => {
            console.log('Error in getinfo route', err);
        })
    }
    else {
        ExtUsers.findOne({ "_id": deco._id }).then((user) => {
            if (!user.CollegeName) {
                console.log({ "Error message": "User not found in database" });
            }
            else {
                console.log(user);
                res.json(user);
            }
        }).catch((err) => {
            console.log('Error in getinfo route', err);
        })
    }
});
module.exports = router;