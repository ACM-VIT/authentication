const router = require('express').Router();
const { exchangeCode } = require('../config/google-oauth');
const { ExtUsers } = require('../models/extUser');
const { IntUsers } = require('../models/intUser');
const { UserAuth } = require('../models/user-auth');

intTokenGenerate = () => {
    var intuser = new IntUsers();
    intuser.save().then(() => {
        return intuser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(intuser);
    }).catch((e) => {
        res.status(400).send(e);
    });
};
extTokenGenerate = () => {
    var extuser = new ExtUsers();
    extuser.save().then(() => {
        return extuser.generateAuthToken();
    }).then((token) => {
        res.header('x-auth', token).send(extuser);
    }).catch((e) => {
        res.status(400).send(e);
    });
}

router.get('/callback', exchangeCode, (req, res) => {
    console.log(req.refresh_token);
    var state = req.query.state;
    if (state == 'int') {
        if (!EmailCheck(req.profile.email)) {
            UserAuth.findOne({ googleID: req.profile.id }).then((currentUser) => {
                if (currentUser) {
                    IntUsers.findOne({ googleID: req.profile.id }).then((presentUser) => {
                        if (presentUser) {
                            intTokenGenerate();
                        } else {
                            intTokenGenerate();
                            res.redirect('/form');
                        }
                    })
                }
                else {
                    new UserAuth({
                        username: req.profile.displayName,
                        googleID: req.profile.id,
                        refreshToken: req.refresh_token
                    }).save().then((newUser) => {
                        console.log('created a newprofile:' + newUser);
                    });
                    intTokenGenerate();
                    res.redirect('/form');
                }
            })
        }
    } else {
        UserAuth.findOne({ googleID: req.profile.id }).then((currentUser) => {
            if (currentUser) {
                ExtUsers.findOne({ googleID: req.profile.id }).then((presentUser) => {
                    if (presentUser) {
                        extTokenGenerate();
                    } else {
                        extTokenGenerate();
                        res.redirect('/form');
                    }
                })
            }
            else {
                new UserAuth({
                    username: req.profile.displayName,
                    googleID: req.profile.id,
                    refreshToken: req.refresh_token
                }).save().then((newUser) => {
                    console.log('created a newprofile:' + newUser);
                });
                extTokenGenerate();
                res.redirect('/form');
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

//res.send({ state: state, refreshToken: req.refresh_token, profile: req.profile });