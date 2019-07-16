const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const UserAuth = require('../models/user-auth');
const IntUsers = require('../models/intUser');
const ExtUsers = require('../models/extUser');



passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserAuth.findById(id).then((user) => {
        done(null, user);
    });
});

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


passport.use(new GoogleStrategy({

    callbackURL: '/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {

    UserAuth.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
            if (state == 'int') {
                if (EmailCheck(profile.email)) {
                    IntUsers.findOne({ email: profile.email }).then((presentUser) => {
                        if (presentUser) {
                            intTokenGenerate();
                        }else{
                            intTokenGenerate();
                            res.redirect('/form');
                        }
                    })
                }

            } else {
                ExtUsers.findOne({ email: profile.email }).then((presentUser) => {
                    if (presentUser) {
                        extTokenGenerate();
                    }
                });
            }
            onsole.log('user is:' + currentUser);
            done(null, currentUser);
        }
        else {
            if (state == 'int') {
                if (EmailCheck(profile.email)) {
                    new UserAuth({
                        username: profile.displayName,
                        googleID: profile.id
                    }).save().then((newUser) => {
                        console.log('created a newprofile:' + newUser);
                        done(null, newUser);
                    });
                    intTokenGenerate();
                    res.redirect('/form');
                }
            } else {
                new UserAuth({
                    username: profile.displayName,
                    googleID: profile.id
                }).save().then((newUser) => {
                    console.log('created a newprofile:' + newUser);
                    done(null, newUser);
                });
                extTokenGenerate();
                res.redirect('/form');
            }
        }

    })
})
);
