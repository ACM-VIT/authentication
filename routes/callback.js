const router = require('express').Router();
const {exchangeCode}= require('../config/google-oauth')


router.get('/callback', (req, res) => {
});

module.exports = router;