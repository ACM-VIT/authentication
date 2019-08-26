const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');


router.get('/intform', (req, res) => {
    var state = req.query.state
    var id = req.query.id
    var s1 = encodeURIComponent(id);
    var s2 = encodeURIComponent(state);
    res.render('intform');
    res.redirect('/getinfo?id=' + s1 + '&state=' + s2);

});
router.get('/extform', (req, res) => {
    var state = req.query.state
    var id = req.query.id
    var s1 = encodeURIComponent(id);
    var s2 = encodeURIComponent(state);
    res.render('extform');
    res.redirect('/getinfo?id=' + s1 + '&state=' + s2);
});


module.exports = router;