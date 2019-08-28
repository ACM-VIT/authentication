const router = require('express').Router();
const ExtUsers = require('../models/extUser');
const IntUsers = require('../models/intUser');

// $(function () {
    
//         var name = req.body.name,
//         var regno = req.body.regno,
//         var email = req.body.email,
//         var phone = req.body.phone
//         $.ajax({
//             type: 'POST',
//             url:'https://localhost:3000/update',
//             contentType: 'application/json',
//             data: JSON.stringify({ name: name }, { regno: regno }, { email: email }, { phone: phone })
//         }).done(function (data) {
//             return
//         })
//     })

router.get('/getinfo', (req, res) => {
    
    if (state == 'int') {
        IntUsers.findOne({ "tokens.token": id }).then((user) => {
            if (!user.regno) {
                console.log({ "Error message": "User not found in database" });
            }
            else {
                console.log(req.body);
                res.send(JSON.stringify(req.body));
                res.writeHead(303, {
                    Location: '/update?id=' + s1 + '&state=' + s2,
                    'Content-Type': 'application/json',
                    data: JSON.stringify(req.body)

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
                    Location: '/update?id=' + s1 + '&state=' + s2,
                    'Content-Type': 'application/json',
                    data: JSON.stringify(req.body)
                });
                res.end();
            }

        })
    }
});

module.exports = router;