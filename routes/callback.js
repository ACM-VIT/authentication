const router = require('express').Router();
const { exchangeCode } = require('../config/google-oauth');
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');
const jwt = require('jsonwebtoken');

generate = function (user, state) {
    var data = {
        _id: user._id.toHexString(),
        email: user.email,
        regno: user.regno,
        state
    }
    var token = jwt.sign(data, 'abc123').toString();
    return token;
}

router.get('/callback', exchangeCode, (req, res) => {
    //console.log(req.refresh_token);
    var state = req.query.state;
    if (state == 'int') {
        if (!EmailCheck(req.profile.email)) return res.json({ "Error message": "Use only VIT email ID! " });
        IntUsers.findOne({ googleID: req.profile.id }).then((currentUser) => {
            if (currentUser) {
                console.log()
                console.log(currentUser)
                console.log()
                if (currentUser.hostelRoom) {
                    var tkon = generate(currentUser, state);
                    res.json({ token: generate(currentUser, state) })
                    
                } else {
                    var tkon = generate(currentUser, state);
                    res.redirect('/intform?id=' + tkon + '&state=' + state);
                }
            }
            else {
                new IntUsers({
                    googleID: req.profile.id,
                    refreshToken: req.refresh_token,
                    email: req.profile.email,
                    name: req.profile.given_name,
                    regno: req.profile.family_name,
                    picture: req.profile.picture
                }).save().then((newUser) => {
                    //console.log('created a newprofile:' + newUser);
                    var tkon = generate(newUser, state);
                    //console.log("jwt TOKEN is :", tkon);
                    res.redirect('/intform?id=' + tkon + '&state=' + state);

                });
            }

        })
    }
    else {
        ExtUsers.findOne({ googleID: req.profile.id }).then((currentUser) => {
            if (currentUser) {
                if (currentUser.CollegeName) {
                    var tkon = generate(currentUser, state);
                    res.json({ token: generate(currentUser, state) })
                    //console.log("jwt TOKEN is :", tkon);
                } else {
                    var tkon = generate(currentUser, state);
                    res.redirect('/extform?id=' + tkon + '&state=' + state);

                }
            }
            else {
                // console.log(6666666666666, req.profile)
                new ExtUsers({
                    googleID: req.profile.id,
                    refreshToken: req.refresh_token,
                    email: req.profile.email,
                    name: req.profile.name,
                    picture: req.profile.picture
                }).save().then((newUser) => {
                    //console.log('created a newprofile:' + newUser);
                    var tkon = generate(newUser, state);
                    //console.log("jwt TOKEN is :", tkon);
                    res.redirect('/extform?id=' + tkon + '&state=' + state);

                });


            }
        })
    }

});

function EmailCheck(str) {
    var exp = /^[a-zA-Z]+\.[a-zA-Z]*201[6789]\@vitstudent.ac.in$/;
    return exp.test(str)
}

module.exports = router;

