const router = require('express').Router();
const { exchangeCode } = require('../config/google-oauth');
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');

router.get('/callback', exchangeCode, (req, res) => {
    console.log(req.refresh_token);
    var state = req.query.state;
    if (state == 'int') {
        if (!EmailCheck(req.profile.email)) {
            IntUsers.findOne({ googleID: req.profile.id }).then((currentUser) => {
                if (currentUser) {
                    if (currentUser.hostelRoom != 'undefined') {
                        return currentUser.generateAuthToken();
                    } else {
                        var tkon = currentUser.generateAuthToken();
                        res.redirect(`/intform?id=${tkon}&?state=${state}`);
                    }
                }
                else {
                    new IntUsers({
                        googleID: req.profile.id,
                        refreshToken: req.refresh_token,
                        email: req.profile.email,
                        name: req.profile.given_name,
                        regno: req.profile.family_name
                    }).save().then((newUser) => {
                        console.log('created a newprofile:' + newUser);
                        var tkon = newUser.generateAuthToken();
                        res.redirect(`/intform?id=${tkon}&?state=${state}`);

                    });
                }

            })
        }
    }
    else {
        ExtUsers.findOne({ googleID: req.profile.id }).then((currentUser) => {
            if (currentUser) {
                if (currentUser.CollegeName != 'undefined') {
                    return currentUser.generateAuthToken();
                } else {
                    var tkon = currentUser.generateAuthToken();
                    res.redirect(`/extform?id=${tkon}&?state=${state}`);
                }
            }
            else {
                new ExtUsers({
                    googleID: req.profile.id,
                    refreshToken: req.refresh_token,
                    email: req.profile.email,
                    name: req.profile.name
                }).save().then((newUser) => {
                    console.log('created a newprofile:' + newUser);
                    var tkon = newUser.generateAuthToken();
                    res.redirect(`/extform?id=${tkon}&?state=${state}`);

                });


            }
        })
    }
    function EmailCheck(str) {
        var exp = /^[a-zA-Z]+\.[a-zA-Z]*201[6789]\@vitstudent.ac.in$/;
        if (exp.test(str) == false) {
            res.send({ "Error message": "Use only VIT email ID! " });
            return true;
        } else {
            return false;
        }
    }
});

module.exports = router;

