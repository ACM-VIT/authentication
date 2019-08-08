const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');

router.get('/getparinfo', (req, res) => {
    var id = req.query.id
    var state = req.query.type
    if (state == 'int'){
        IntUsers.findOne({ tokens: id }).then((user) => {
            if (user.hostelRoom = 'undefined') {
                    res.send({ "Error message": "User not found in database" });
                }
            else{
                res.send("User Details \n",user);
                }
            })
        }
    else{
        ExtUsers.findOne({ tokens: id }).then((user) => { 
            if (user.CollegName = 'undefined') {
                res.send({ "Error message": "User not found in database" });
            }
        else{
            res.send("User Details \n",user);
            }
        })
    }
});