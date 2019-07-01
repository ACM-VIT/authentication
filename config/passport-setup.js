const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const UserAuth = require('../models/user-auth');


passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    UserAuth.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    
    callbackURL: '/callback',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    
    UserAuth.findOne({ googleID: profile.id }).then((currentUser) => {
        if (currentUser) {
            
            console.log('user is:' + currentUser);
            done(null, currentUser);
        }
        else {
            
            new UserAuth({
                username: profile.displayName,
                googleID: profile.id
            }).save().then((newUser) => {
                console.log('created a newprofile:' + newUser);
                done(null, newUser);
            });
        }
    });

}));
