const router = require('express').Router();
var { IntUsers } = require('../models/intUser');
var { ExtUsers } = require('../models/extUser');

router.get('/update', (req, res) => {
    var id = req.query.id
    var state = req.query.type
    
});

module.exports = router;