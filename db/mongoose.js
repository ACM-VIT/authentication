var mongoose = require('mongoose');
//const keys = require('../config/keys');

mongoose.Promise = global.Promise;


mongoose.connect(process.env.MONGO_URI, {useNewUrlParser : true});



var db = mongoose.connection;
db.once('open' , ()=>{
    console.log('Connected to MongoServer');
});
db.on('error' , (err)=>{
    console.log(err);
});

module.exports ={mongoose};