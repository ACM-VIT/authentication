const router = require('express').Router();
var { IntUsers } = require('../models/intUser');
var { ExtUsers } = require('../models/extUser');
const jwt = require('jsonwebtoken');

DecodeToken = function (token) {
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        console.log('Error');
    }
}

router.post('/update', (req, res) => {
    var id = req.query.id
    var state = req.query.type
    var dtok;
    if (state == 'int') {
        if (req.body.regno) {
            dtok = DecodeToken(id);
            return dtok._id;
        }
    } else if (state == 'ext') {
        if (req.body.CollegeName) {
            dtok = DecodeToken(id);
            return dtok._id;
        }
    }

});

module.exports = router;