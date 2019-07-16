const router = require('express').Router();
const passport = require('passport');
var { ObjectID } = require('mongodb');
var { IntUsers } = require('../models/intUser');
var { ExtUsers } = require('../models/extUser');

router.get('/getinfo/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid()) {
        return res.status(400).send();
    } else {
        IntUsers.findById(id)
    }
});

module.exports = router;