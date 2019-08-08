const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');

router.get('/intform', (req, res) => {
    var state = req.query.state
    var id = req.query.id
    res.statusCode = 302;
    res.setHeader("Location", `/getparinfo?id=${id}&?type=${state}`);
    res.end();
    res.render('intform');

});
router.get('/extform', (req, res) => {
    var type = req.query.state
    var id = req.query.id
    res.render('extform');
});


module.exports = { router }