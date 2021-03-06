const router = require('express').Router();
const rp = require('request-promise');
const dotenv = require('dotenv').config();

reqpost = function (req) {
    // console.log(111111111111,req.query.id)
    return new Promise((resolve, reject) => {

        var options = {
            method: 'POST',
            uri: `http://localhost:${process.env.PORT || 3000}/getinfo`,
            body: {
                'state': req.query.state,
                'id': req.query.id
            },
            json: true
        };

        rp(options)
            .then(function (data) {
                // console.log('--------', data)
                resolve(data)
            })
            .catch(function (err) {
                console.log('Error in form route!!!!', err);
                reject(err)
            });
    })

}


router.get('/intform', (req, res) => {
    reqpost(req).then((data) => {
        //console.log(1111111, data)
        if (data) {
            res.render('intform', { ...data, token: req.query.id });
        }

    });

});

router.get('/extform', (req, res) => {
    reqpost(req).then(data => {
        if (data) {
            res.render('extform', { ...data, token: req.query.id });
        }

    });
});



module.exports = router;