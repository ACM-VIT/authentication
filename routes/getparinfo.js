const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');
const jwt = require('jsonwebtoken');

DecodeToken = function (token) {
    try {
        console.log(token)
        decoded = jwt.verify(token, 'abc123');
        return decoded;
    } catch (e) {
        console.log(e.message)
        console.log('Error decoding token');
    }
}
router.post('/getparinfo', (req, res) => {
    var id = req.body.id;
    var deco = DecodeToken(id);
    // console.log(deco);
    if (deco.state === 'int') {
       IntUsers.findOne({ "_id": deco._id }).then((user) => {
            if (user) {
                console.log(user)
                console.log(111111111111111111111111)
                console.log()
                res.json(user);
            }
            else {
                console.log({ "Error message": "User not found in database" });
            }
        }).catch((err)=>{
            console.log('Error in getinfo route',err);
        })
    }
    else {
        ExtUsers.findOne({ "_id": deco  }).then((user) => {
            if (user) {
                console.log(user)
                console.log(111111111111111111111111)
                console.log()
                res.json(user);
            }
            else {
                console.log({ "Error message": "User not found in database" });
            }
        }).catch((err)=>{
            console.log('Error in getinfo route',err);
        })
    }
});
module.exports = router;