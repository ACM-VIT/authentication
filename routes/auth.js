const router = require('express').Router();
const passport = require('passport');

router.get('/auth', (req, res, next) => {
    const type = req.query.type
    if (type == 'int' || type == 'ext') {
        var state = type;
        console.log(type);

    } else {
        const state = 'int';
        console.log('Default:int');

    }
    const authenticator = passport.authenticate('google', { scope: ['profile'], state})
    authenticator(req, res, next)
})

module.exports = router;
