const router = require('express').Router();

router.get('/auth', (req, res) => {
    const type = req.query.type
    if (type == 'int' || type == 'ext') {
        var state = type;
        console.log(type);

    } else {
        var state = 'int';
        console.log('Default:int');

    }
});

module.exports = router;

