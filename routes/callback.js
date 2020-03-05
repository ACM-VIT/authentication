const router = require('express').Router();
const { exchangeCode } = require('../config/google-oauth');
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

generate = function (user, state) {
    var data = {
        _id: user._id.toHexString(),
        name: user.name,
        email: user.email,
        state: state,
        picture: user.picture
    }
    var token = jwt.sign(data, process.env.JWT_SECRET).toString();
    return token;
}

router.get('/callback', exchangeCode, (req, res) => {
    //console.log(req.refresh_token);
    var state = req.query.state;
    if (state == 'int') {
        if (!EmailCheck(req.profile.email)) return res.json({ "Error message": "Use only VIT email ID! " });
        IntUsers.findOne({ googleID: req.profile.id }).then((currentUser) => {
            if (currentUser) {
                // if (currentUser.hostelroom) {
                    var tkon = generate(currentUser, state);
                    res.send(`
                    <script>
                    window.opener.postMessage({type:'token',token:'${tkon}'},"*");
                    window.close();
                    </script>
                    `);

                // } else {
                //     var tkon = generate(currentUser, state);
                //     res.redirect('/intform?id=' + tkon + '&state=' + state);
                // }
            }
            else {
                new IntUsers({
                    googleID: req.profile.id || '',
                    refreshToken: req.refresh_token || '',
                    email: req.profile.email || '',
                    name: req.profile.given_name || '',
                    regno: req.profile.family_name || '',
                    picture: req.profile.picture || ''
                }).save().then((newUser) => {
                    var tkon = generate(newUser, state);
                    // res.redirect('/intform?id=' + tkon + '&state=' + state);

                    // Del once octave done
                    res.send(`
                    <script>
                    window.opener.postMessage({type:'token',token:'${tkon}'},"*");
                    window.close();
                    </script>
                    `);

                });
            }

        })
    }
    else {
        ExtUsers.findOne({ googleID: req.profile.id }).then((currentUser) => {
            if (currentUser) {
                // if (currentUser.CollegeName) {
                    var tkon = generate(currentUser, state);
                    res.send(`
                    <script>
                    window.opener.postMessage({type:'token',token:'${generate(currentUser, state)}'},"*");
                    window.close();
                    </script>
                    `);
                // } else {
                //     var tkon = generate(currentUser, state);
                //     res.redirect('/extform?id=' + tkon + '&state=' + state);

                // }
            }
            else {
                // console.log(6666666666666, req.profile)
                new ExtUsers({
                    googleID: req.profile.id || '',
                    refreshToken: req.refresh_token || '',
                    email: req.profile.email || '',
                    name: req.profile.name || '',
                    picture: req.profile.picture || ''
                }).save().then((newUser) => {
                    var tkon = generate(newUser, state);
                    // res.redirect('/extform?id=' + tkon + '&state=' + state);

                    // Del once octave done
                    res.send(`
                    <script>
                    window.opener.postMessage({type:'token',token:'${tkon}'},"*");
                    window.close();
                    </script>
                    `);
                    //--

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

