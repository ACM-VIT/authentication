const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');

router.get('/intform', (req, res) => {
    var state = req.query.state
    var id = req.query.id
    res.render('intform');
    
    
});
router.get('/extform', (req, res) => {
    var state = req.query.state
    var id = req.query.id
    res.render('extform');
    
    
});


module.exports = router;