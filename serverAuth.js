const
    jwt = require('jsonwebtoken'),
    User = require('./models/User.js')

function signToken(user) {
    const userData = user.toObject()
    delete userData.password
    return jwt.sign(userData, process.env.JWT_SECRET)
}

function verifyToken(req, res, next) {
    const token = req.get('token') || req.body.token || req.query.token
    if(!token) return res.json({success: false, message: "No token provided."})
    jwt.verify(token, process.env.JWT_SECRET, (err, decodeData) => {
        if(err) return res.json ({success: false, message: "Invalid token."})
        User.findById(decodeData._id, (err, user) => {
            if(!user) return res.json({success: false, message: "Invalid token."})
            req.user = user
            next()
        })
    })
}

module.exports = {
    signToken,
    verifyToken
}