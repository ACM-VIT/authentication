const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');
const passport = require('passport');
const passportSetup = require('./config/passport-setup');
const keys = require('.//config/keys');
const authRoutes = require('./routes/auth');
var { mongoose } = require('./db/mongoose');
var { ObjectID } = require('mongodb');


const port = process.env.PORT || 3000;
var app = express();

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [keys.session.cookieKey]
}));

app.use(passport.initialize());
app.use(passport.session());
app.use('', authRoutes);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});

