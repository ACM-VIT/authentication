const router = require('express').Router();
const {getUrl}= require('../config/google-oauth')

router.get('/auth', (req, res) => {
    const type = req.query.type
    if (type == 'int' || type == 'ext') {
        var state = type;
        console.log(type);

    } else {
        var state = 'int';
        console.log('Default:int');

    }
    console.log(getUrl(state))
    res.writeHead(303, {
        Location: getUrl(state)
    });
    res.end();
});

module.exports = router;

