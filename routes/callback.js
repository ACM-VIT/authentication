const router = require('express').Router();
const passport = require('passport');


router.get('/callback', passport.authenticate('google'), (req, res) => {
    function EmailCheck(str) {
        var exp = /^[a-zA-Z]+\.[a-zA-Z]*201[6789]\@vitstudent.ac.in$/;
        if (exp.test(str) == false) {
            res.send();
            //res.send("Use only vit email Id");
        }
    }

});

module.exports = router;