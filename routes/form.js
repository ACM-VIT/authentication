const router = require('express').Router();

router.get('/intform', (req, res) => {
    res.render('intform');
    
});

router.get('/extform', (req, res) => {
    res.render('extform');
    
});

module.exports = router;