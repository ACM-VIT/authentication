const router = require('express').Router();

router.get('/intform', (req, res) => {
    res.send('intform.html');
});

router.get('/extform', (req, res) => {
    res.send('extform.html');
});

module.exports = router;