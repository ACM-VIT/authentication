const router = require('express').Router();
const {exchangeCode}= require('../config/google-oauth')


router.get('/callback',  exchangeCode, (req, res) => {
    console.log(req.refresh_token)
    res.send({state:req.query.state, refreshToken:req.refresh_token, profile:req.profile})
    function EmailCheck(str) {
        var exp = /^[a-zA-Z]+\.[a-zA-Z]*201[6789]\@vitstudent.ac.in$/;
        if (exp.test(str) == false) {
            res.send();
            //res.send("Use only vit email Id");
        }
    }
});

module.exports = router;