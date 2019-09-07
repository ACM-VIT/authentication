//const { clientSecret, clientID, callback } = require('./keys').google
const rp = require('request-promise');
// var callback = 'http://localhost:3000/callback';
var callback = `${process.env.PORT}/callback`;

getUrl = (state) => {
    console.log({ state })
    url = `https://accounts.google.com/o/oauth2/auth?`
    url += `response_type=code`
    url += `&scope=https://www.googleapis.com/auth/userinfo.profile+https://www.googleapis.com/auth/userinfo.email&`
    url += `&client_id=${process.env.GOOGLE_CLIENT_ID}`
    url += `&state=${state}`
    url += `&redirect_uri=${callback}`
    url += `&access_type=offline`
    url += `&prompt=consent`
    return url
}

exchangeCode = async (req, res, next) => {
    try {
        body = await rp.post({
            url: 'https://accounts.google.com/o/oauth2/token',
            json: true,
            form: {
                client_id: process.env.GOOGLE_CLIENT_ID,
                client_secret: process.env.GOOGLE_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: req.query.code,
                redirect_uri: callback
            }
        })

        // console.log('Body---->',body)

        data = await rp.get({
            url: 'https://www.googleapis.com/oauth2/v2/userinfo',
            json: true,
            'auth': {
                'bearer': body.access_token
            }
        })

        req.profile = data
        console.log('Profile is ---->', req.profile);
        req.refresh_token = body.refresh_token
        next()
    } catch (e) {
        res.json({ err: e.message })
    }
}

module.exports = {
    getUrl, exchangeCode
}