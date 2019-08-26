const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');

router.get('/getinfo', (req, res) => {
    var id = req.query.id
    var state = req.query.type
    var s1 = encodeURIComponent(id);
    var s2 = encodeURIComponent(state);
     if (state == 'int') {
        IntUsers.findOne({ "tokens.token": id }).then((user) => {
            if (!user.regno) {
                console.log({ "Error message": "User not found in database" });
            }
            else {
                console.log(req.body);
                res.send(JSON.stringify(req.body));
                res.writeHead(303, {
                    Location:'/update?id=' + s1 + '&state=' + s2,
                    'Content-Type': 'application/json'
                });
                res.end();
            }
        })
    }
    else {
        ExtUsers.findOne({ "tokens.token": id }).then((user) => {
            if (!user.CollegName) {
                console.log({ "Error message": "User not found in database" });
            }
            else {
                console.log(req.body);
                res.send(JSON.stringify(req.body));
                res.writeHead(303, {
                    Location:'/update?id=' + s1 + '&state=' + s2
                });
                res.end();
            }
            
        })
    }
});

module.exports = router;