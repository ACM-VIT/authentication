const express = require('express');
const bodyParser = require('body-parser');
const keys = require('.//config/keys');
const auth = require('./routes/auth');
const callback = require('./routes/callback');
var { mongoose } = require('./db/mongoose');



const port = process.env.PORT || 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('', auth);
app.use('', callback);

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});

