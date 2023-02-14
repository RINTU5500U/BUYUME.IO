const jwt = require('jsonwebtoken')

const authentication = (req, res, next) => {
    try {
        let token = req.header['token']
        if (!token) {
            return res.status(400).send({msg: 'token is missing'})
        }
        jwt.verify(token, 'SecretKey', function (err, decode) {
            if (err) {
                return res.status(401).send({msg: 'authentication failed'})
            } else {
                req.decodeToken = decode
            }
            next()
        })
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {authentication}